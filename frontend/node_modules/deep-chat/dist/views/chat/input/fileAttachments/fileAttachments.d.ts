import { FileAttachments as FileAttachmentsT } from '../../../../types/fileAttachments';
import { FileAttachmentsType } from './fileAttachmentTypes/fileAttachmentsType';
import { ServiceFileTypes, ServiceIO } from '../../../../services/serviceIO';
import { CustomStyle } from '../../../../types/styles';
import { DeepChat } from '../../../../deepChat';
import { Demo } from '../../../../types/demo';
export interface HiddenFileAttachments {
    removeHiddenFiles(): void;
    readdHiddenFiles(): void;
}
export declare class FileAttachments implements HiddenFileAttachments {
    private readonly _fileAttachmentsTypes;
    readonly elementRef: HTMLElement;
    constructor(inputElementRef: HTMLElement, attachmentContainerStyle?: CustomStyle, demo?: Demo);
    addType(deepChat: DeepChat, serviceIO: ServiceIO, files: FileAttachmentsT, type: keyof ServiceFileTypes): FileAttachmentsType;
    private createAttachmentContainer;
    private toggleContainerDisplay;
    getAllFileData(): {
        file: File;
        type: import('../../../../types/messageFile').MessageFileType;
    }[] | undefined;
    completePlaceholders(): Promise<void>;
    static addFilesToType(files: File[], fileAttachmentTypes: FileAttachmentsType[]): void;
    addFilesToAnyType(files: File[]): void;
    hideFiles(): void;
    removeHiddenFiles(): void;
    readdHiddenFiles(): void;
    getNumberOfTypes(): number;
}
//# sourceMappingURL=fileAttachments.d.ts.map