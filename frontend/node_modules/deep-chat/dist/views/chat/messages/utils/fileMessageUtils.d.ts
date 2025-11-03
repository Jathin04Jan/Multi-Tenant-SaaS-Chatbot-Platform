import { MessageFile, MessageFileType } from '../../../../types/messageFile';
import { MessageContent, MessageStyles } from '../../../../types/messages';
import { MessagesBase } from '../messagesBase';
import { MessageElements } from '../messages';
export declare class FileMessageUtils {
    static setElementProps(messages: MessagesBase, elements: MessageElements, styles: keyof MessageStyles, role: string): void;
    static addMessage(messages: MessagesBase, elements: MessageElements, styles: keyof MessageStyles, role: string, isTop: boolean, scroll: boolean): void;
    private static wrapInLink;
    private static isNonLinkableDataUrl;
    static processContent(type: MessageFileType, contentEl: HTMLElement, url?: string, name?: string): HTMLElement;
    private static waitToLoadThenScroll;
    static scrollDownOnImageLoad(url: string, messagesContainerEl: HTMLElement, targetElement: HTMLElement): void;
    static reAddFileRefToObject(message: {
        files?: MessageFile[];
    }, targetMessage: MessageContent): void;
    static removeFileRef(messageFile: MessageFile): Omit<MessageFile, 'file'>;
    static isAudioFile(fileData: MessageFile): boolean | "" | undefined;
    static isImageFile(fileData: MessageFile): boolean | "" | undefined;
    static isImageFileExtension(fileName: string): boolean;
}
//# sourceMappingURL=fileMessageUtils.d.ts.map