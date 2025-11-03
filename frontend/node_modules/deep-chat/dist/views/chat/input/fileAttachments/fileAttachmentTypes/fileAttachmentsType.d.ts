import { FileAttachments } from '../../../../../types/fileAttachments';
import { MessageFileType } from '../../../../../types/messageFile';
import { ServiceIO } from '../../../../../services/serviceIO';
import { DeepChat } from '../../../../../deepChat';
export interface AttachmentObject {
    file: File;
    fileType: MessageFileType;
    attachmentContainerElement: HTMLElement;
    removeButton?: HTMLElement;
}
export declare class FileAttachmentsType {
    private readonly _attachments;
    private readonly _fileCountLimit;
    private readonly _toggleContainerDisplay;
    private readonly _fileAttachmentsContainerRef;
    private readonly _acceptedFormat;
    private readonly _hiddenAttachments;
    private _validationHandler?;
    private _onInput;
    constructor(deepChat: DeepChat, serviceIO: ServiceIO, fileAttachments: FileAttachments, toggleContainer: (display: boolean) => void, container: HTMLElement);
    attemptAddFile(file: File, fileReaderResult: string): boolean;
    private static isFileTypeValid;
    static getTypeFromBlob(file: File): MessageFileType;
    private addAttachmentBasedOnType;
    private static createImageAttachment;
    private static createAnyFileAttachment;
    addFileAttachment(file: File, fileType: MessageFileType, attachmentElement: HTMLElement, removable: boolean): AttachmentObject;
    private static createContainer;
    createRemoveAttachmentButton(attachmentObject: AttachmentObject): HTMLElement;
    removeAttachment(attachmentObject: AttachmentObject, event?: MouseEvent): void;
    getFiles(): {
        file: File;
        type: MessageFileType;
    }[];
    hideAttachments(): void;
    removeAttachments(): void;
    readdAttachments(): void;
}
//# sourceMappingURL=fileAttachmentsType.d.ts.map