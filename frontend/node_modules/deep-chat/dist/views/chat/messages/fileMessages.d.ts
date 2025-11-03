import { MessageFiles } from '../../../types/messageFile';
import { MessagesBase } from './messagesBase';
export declare class FileMessages {
    private static readonly IMAGE_BUBBLE_CLASS;
    private static readonly AUDIO_BUBBLE_CLASS;
    private static readonly ANY_FILE_BUBBLE_CLASS;
    private static createImage;
    private static createImageMessage;
    private static createAudioElement;
    private static autoPlayAudio;
    private static createNewAudioMessage;
    private static createAnyFile;
    private static createNewAnyFileMessage;
    static createMessages(msg: MessagesBase, files: MessageFiles, role: string, scroll: boolean, isTop?: boolean): {
        type: string;
        elements: import('./messages').MessageElements;
    }[];
    static addMessages(messages: MessagesBase, files: MessageFiles, role: string, hasText: boolean, isTop: boolean): void;
}
//# sourceMappingURL=fileMessages.d.ts.map