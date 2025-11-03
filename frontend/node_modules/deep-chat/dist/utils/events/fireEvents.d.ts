import { MessageContentI } from '../../types/messagesInternal';
import { DeepChat } from '../../deepChat';
export declare class FireEvents {
    static onMessage(deepChat: DeepChat, message: MessageContentI, isHistory: boolean): void;
    static onClearMessages(deepChat: DeepChat): void;
    static onRender(deepChat: DeepChat): void;
    static onInput(deepChat: DeepChat, content: {
        text?: string;
        files?: File[];
    }, isUser: boolean): void;
    static onError(deepChat: DeepChat, error: string): void;
}
//# sourceMappingURL=fireEvents.d.ts.map