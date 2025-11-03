import { MessageElements, Messages } from '../messages';
import { MessagesBase } from '../messagesBase';
export declare class LoadingHistory {
    static readonly CLASS = "loading-history-message";
    private static readonly FULL_VIEW_CLASS;
    private static readonly SMALL_CLASS;
    private static generateLoadingRingElement;
    private static apply;
    private static addLoadHistoryMessage;
    static createDefaultElements(messages: Messages): MessageElements;
    static addMessage(messages: Messages, isInitial?: boolean): MessageElements;
    private static tryChangeViewToSmall;
    static changeFullViewToSmall(messages: MessagesBase): void;
}
//# sourceMappingURL=loadingHistory.d.ts.map