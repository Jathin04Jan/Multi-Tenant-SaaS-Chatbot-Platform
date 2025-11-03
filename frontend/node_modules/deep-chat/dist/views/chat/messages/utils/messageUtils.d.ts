import { MessageBodyElements, MessageContentI, MessageToElements } from '../../../../types/messagesInternal';
import { MessageContent } from '../../../../types/messages';
import { MessageElements } from '../messages';
import { Avatar } from '../avatar';
import { Name } from '../name';
export declare class MessageUtils {
    static getLastElementsByClass(messageElementRefs: MessageElements[], classes: string[], avoidClasses?: string[]): MessageElements | undefined;
    static getLastMessage(msgToEls: MessageToElements, role: string, content?: keyof Omit<MessageContent, 'role'>): MessageContentI | undefined;
    static getLastTextToElement(elemsToText: [MessageElements, string][], elems: MessageElements): [MessageElements, string] | undefined;
    static overwriteMessage(messageToElements: MessageToElements, messageElementRefs: MessageElements[], content: string, role: string, contentType: 'text' | 'html', className: string): MessageElements | undefined;
    static getRoleClass(role: string): string;
    static fillEmptyMessageElement(bubbleElement: HTMLElement, content: string): void;
    static unfillEmptyMessageElement(bubbleElement: HTMLElement, newContent: string): void;
    static getLastMessageBubbleElement(messagesEl: HTMLElement): Element | undefined;
    static getLastMessageElement(messagesEl: HTMLElement): Element;
    static addRoleElements(bubbleElement: HTMLElement, role: string, avatar?: Avatar, name?: Name): void;
    static hideRoleElements(innerContainer: HTMLElement, avatar?: Avatar, name?: Name): void;
    static revealRoleElements(innerContainer: HTMLElement, avatar?: Avatar, name?: Name): void;
    static softRemRoleElements(innerContainer: HTMLElement, avatar?: Avatar, name?: Name): void;
    static updateRefArr<T>(arr: Array<T>, item: T, isTop: boolean): void;
    static buildRoleOuterContainerClass(role: string): string;
    private static addNewPositionClasses;
    private static getNumberOfElements;
    private static filterdMessageElements;
    private static findMessageElements;
    private static generateMessageBodyElements;
    static generateMessageBody(messageContent: MessageContentI, messageElementRefs: MessageElements[], top?: boolean): MessageBodyElements;
    static classifyRoleMessages(messageElementRefs: MessageElements[], role?: string): void;
    static areOuterContainerClassRolesSame(comparedRole: string, message?: MessageElements): boolean;
    static resetAllRoleElements(messageElementRefs: MessageElements[], avatar?: Avatar, name?: Name): void;
    static deepCloneMessagesWithReferences(messages: MessageContentI[]): MessageContentI[];
    private static processMessageContent;
}
//# sourceMappingURL=messageUtils.d.ts.map