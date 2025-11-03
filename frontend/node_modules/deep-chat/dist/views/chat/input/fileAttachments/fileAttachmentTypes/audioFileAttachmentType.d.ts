import { FileAttachmentsType } from './fileAttachmentsType';
import { FileAttachments } from '../../../../../types/fileAttachments';
import { ServiceIO } from '../../../../../services/serviceIO';
import { DeepChat } from '../../../../../deepChat';
export declare class AudioFileAttachmentType extends FileAttachmentsType {
    stopPlaceholderCallback?: () => Promise<void>;
    private _activePlaceholderTimer?;
    private _activePlaceholderAttachment?;
    private static readonly TIMER_LIMIT_S;
    constructor(deepChat: DeepChat, serviceIO: ServiceIO, fileAttachments: FileAttachments, toggleContainer: (display: boolean) => void, container: HTMLElement);
    private static createAudioContainer;
    private static addAudioElements;
    static createAudioAttachment(fileReaderResult: string): HTMLElement;
    private createTimer;
    private createPlaceholderAudioAttachment;
    private addPlaceholderAudioAttachmentEvents;
    addPlaceholderAttachment(stopCallback: () => Promise<void>, customTimeLimit?: number): void;
    completePlaceholderAttachment(file: File, fileReaderResult: string): void;
    removePlaceholderAttachment(): void;
    private clearTimer;
    static stopAttachmentPlayback(attachmentContainerEl: HTMLElement): void;
}
//# sourceMappingURL=audioFileAttachmentType.d.ts.map