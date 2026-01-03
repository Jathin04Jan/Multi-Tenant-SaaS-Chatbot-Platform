"""Document parser service for extracting text from various file formats."""

from io import BytesIO
from typing import Any, Dict, Optional, Tuple
import hashlib

try:
    import PyPDF2
except ImportError:
    PyPDF2 = None

try:
    from docx import Document as DocxDocument  # type: ignore
except ImportError:
    DocxDocument = None  # type: ignore


class DocumentParser:
    """Service for parsing documents and extracting text content."""
    
    @staticmethod
    def extract_text(
        file_data: bytes,
        content_type: Optional[str] = None,
        filename: Optional[str] = None,
    ) -> Tuple[str, Dict[str, Any]]:
        """
        Extract text from a document file.
        
        Args:
            file_data: Raw file bytes
            content_type: MIME type of the file
            filename: Original filename (for extension detection)
        
        Returns:
            Tuple of (extracted_text, metadata_dict)
            metadata_dict contains:
            - parser: Name of parser used
            - page_count: Number of pages (for PDFs)
            - char_count: Character count of extracted text
            - checksum: SHA256 hash of file data
        
        Raises:
            ValueError: If file type is not supported or parsing fails
        """
        # Determine file type
        file_type = DocumentParser._detect_file_type(content_type, filename)
        
        # Calculate checksum
        checksum = hashlib.sha256(file_data).hexdigest()
        
        # Parse based on file type
        if file_type == "pdf":
            text, page_count = DocumentParser._parse_pdf(file_data)
            parser = "PyPDF2"
            metadata = {
                "parser": parser,
                "page_count": page_count,
                "char_count": len(text),
                "checksum": checksum,
            }
        elif file_type == "docx":
            text = DocumentParser._parse_docx(file_data)
            parser = "python-docx"
            metadata = {
                "parser": parser,
                "char_count": len(text),
                "checksum": checksum,
            }
        elif file_type == "txt":
            text = DocumentParser._parse_txt(file_data)
            parser = "plain_text"
            metadata = {
                "parser": parser,
                "char_count": len(text),
                "checksum": checksum,
            }
        else:
            raise ValueError(f"Unsupported file type: {file_type}")
        
        return text, metadata
    
    @staticmethod
    def _detect_file_type(
        content_type: Optional[str] = None,
        filename: Optional[str] = None,
    ) -> str:
        """Detect file type from content type or filename extension."""
        # Check content type first
        if content_type:
            if content_type == "application/pdf":
                return "pdf"
            elif content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return "docx"
            elif content_type == "application/msword":
                # Old .doc format - we'll try to handle it as docx if possible
                # Otherwise, we'd need additional libraries
                return "doc"
            elif content_type == "text/plain":
                return "txt"
        
        # Fall back to filename extension
        if filename:
            ext = filename.lower().split(".")[-1] if "." in filename else ""
            if ext == "pdf":
                return "pdf"
            elif ext == "docx":
                return "docx"
            elif ext == "doc":
                return "doc"  # Old format - may not be fully supported
            elif ext == "txt":
                return "txt"
        
        raise ValueError("Could not determine file type")
    
    @staticmethod
    def _parse_pdf(file_data: bytes) -> Tuple[str, int]:
        """Extract text from PDF file."""
        if PyPDF2 is None:
            raise ValueError("PyPDF2 library is not installed")
        
        try:
            pdf_file = BytesIO(file_data)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            
            text_parts = []
            page_count = len(pdf_reader.pages)
            
            for page_num, page in enumerate(pdf_reader.pages):
                try:
                    text = page.extract_text()
                    if text:
                        text_parts.append(text)
                except Exception as e:
                    # Log but continue with other pages
                    print(f"Warning: Failed to extract text from PDF page {page_num + 1}: {e}")
            
            full_text = "\n\n".join(text_parts)
            return full_text, page_count
        except Exception as e:
            raise ValueError(f"Failed to parse PDF: {e}") from e
    
    @staticmethod
    def _parse_docx(file_data: bytes) -> str:
        """Extract text from DOCX file."""
        if DocxDocument is None:
            raise ValueError("python-docx library is not installed")
        
        try:
            docx_file = BytesIO(file_data)
            doc = DocxDocument(docx_file)
            
            # Extract text from all paragraphs
            text_parts = []
            for paragraph in doc.paragraphs:
                if paragraph.text:
                    text_parts.append(paragraph.text)
            
            # Extract text from tables
            for table in doc.tables:
                for row in table.rows:
                    row_text = []
                    for cell in row.cells:
                        if cell.text:
                            row_text.append(cell.text)
                    if row_text:
                        text_parts.append(" | ".join(row_text))
            
            full_text = "\n\n".join(text_parts)
            return full_text
        except Exception as e:
            raise ValueError(f"Failed to parse DOCX: {e}") from e
    
    @staticmethod
    def _parse_txt(file_data: bytes) -> str:
        """Extract text from plain text file."""
        try:
            # Try UTF-8 first
            try:
                text = file_data.decode("utf-8")
            except UnicodeDecodeError:
                # Fall back to latin-1 (covers most cases)
                text = file_data.decode("latin-1", errors="replace")
            return text
        except Exception as e:
            raise ValueError(f"Failed to parse text file: {e}") from e

