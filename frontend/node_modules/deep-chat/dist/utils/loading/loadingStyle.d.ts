import { LoadingStyles } from '../../types/messages';
import { CustomStyle } from '../../types/styles';
export declare class LoadingStyle {
    static readonly BUBBLE_CLASS = "deep-chat-loading-message-bubble";
    static readonly DOTS_CONTAINER_CLASS = "deep-chat-loading-message-dots-container";
    private static colorToHex;
    static setDots(bubbleElement: HTMLElement, styles?: LoadingStyles): void;
    static setRing(bubbleElement: HTMLElement, style?: CustomStyle): void;
}
//# sourceMappingURL=loadingStyle.d.ts.map