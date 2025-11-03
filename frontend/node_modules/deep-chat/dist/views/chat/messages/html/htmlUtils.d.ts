import { StatefulStyles } from '../../../../types/styles';
import { HTMLWrappers } from '../../../../types/stream';
import { MessagesBase } from '../messagesBase';
export declare class HTMLUtils {
    static readonly TARGET_WRAPPER_CLASS = "html-wrapper";
    static applyStylesToElement(element: HTMLElement, styles: StatefulStyles): void;
    private static applyEventsToElement;
    private static applyClassUtilitiesToElement;
    private static applyCustomClassUtilities;
    static apply(messages: MessagesBase, outmostElement: HTMLElement): void;
    private static traverseNodes;
    static splitHTML(htmlString: string): string[];
    static isTemporaryBasedOnHTML(html: string): boolean;
    static replaceElementWithNewClone(oldElement: HTMLElement, elementToBeCloned?: HTMLElement): HTMLElement;
    static tryAddWrapper(bubbleElement: HTMLElement, content: string, wrappers?: HTMLWrappers, role?: string): {
        contentEl: HTMLElement;
        wrapper: boolean;
    };
    static getTargetWrapper(bubbleElement: HTMLElement): HTMLElement;
}
//# sourceMappingURL=htmlUtils.d.ts.map