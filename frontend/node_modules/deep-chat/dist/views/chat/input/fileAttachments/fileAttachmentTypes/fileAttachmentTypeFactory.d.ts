import { ServiceFileTypes, ServiceIO } from '../../../../../services/serviceIO';
import { FileAttachments } from '../../../../../types/fileAttachments';
import { FileAttachmentsType } from './fileAttachmentsType';
import { DeepChat } from '../../../../../deepChat';
export declare class FileAttachmentTypeFactory {
    static create(deepChat: DeepChat, serviceIO: ServiceIO, files: FileAttachments, toggleContainer: (display: boolean) => void, container: HTMLElement, type: keyof ServiceFileTypes): FileAttachmentsType;
}
//# sourceMappingURL=fileAttachmentTypeFactory.d.ts.map