import { ButtonInnerElement, ButtonStateStyles } from '../../../../types/buttonInternal';
export declare class ButtonInnerElements {
    private static readonly INPUT_BUTTON_SVG_TEXT_CLASS;
    static readonly INPUT_BUTTON_INNER_TEXT_CLASS = "text-button";
    static readonly INPUT_BUTTON_SVG_CLASS = "input-button-svg";
    private static createTextElement;
    private static tryAddSVGElement;
    static createCustomElements<T>(state: keyof T, base: SVGGraphicsElement, customStyles?: ButtonStateStyles<T>): ButtonInnerElement[] | undefined;
    static reassignClassBasedOnChildren(parentEl: HTMLElement, elements: ButtonInnerElement[]): void;
}
//# sourceMappingURL=buttonInnerElements.d.ts.map