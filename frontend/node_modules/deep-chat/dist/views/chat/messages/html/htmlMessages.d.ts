import { Overwrite } from '../../../../types/messagesInternal';
import { MessagesBase } from '../messagesBase';
import { MessageElements } from '../messages';
export declare class HTMLMessages {
    static readonly HTML_BUBBLE_CLASS = "html-message";
    private static addElement;
    static createElements(messages: MessagesBase, html: string, role: string, isTop: boolean, loading?: boolean): MessageElements;
    static overwriteElements(messages: MessagesBase, html: string, overwrittenElements: MessageElements): void;
    private static overwrite;
    static create(messages: MessagesBase, html: string, role: string, isTop?: boolean): MessageElements;
    static add(messages: MessagesBase, html: string, role: string, scroll: boolean, overwrite?: Overwrite, isTop?: boolean): MessageElements | undefined;
}
//# sourceMappingURL=htmlMessages.d.ts.map