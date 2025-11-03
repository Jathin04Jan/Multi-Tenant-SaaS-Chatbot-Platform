import { ButtonInnerElement, ButtonStateStyles } from '../../../../types/buttonInternal';
import { ButtonPosition as ButtonPositionT, ButtonStyles } from '../../../../types/button';
import { Tooltip } from '../../../../types/tooltip';
import { StatefulStyles } from '../../../../types/styles';
interface MouseState {
    state: keyof StatefulStyles;
}
type Styles = {
    [key: string]: ButtonStyles;
};
export declare class InputButton<T extends Styles = Styles> {
    elementRef: HTMLElement;
    protected readonly _mouseState: MouseState;
    private readonly _tooltipSettings?;
    private _activeTooltip?;
    readonly svg: SVGGraphicsElement;
    readonly customStyles?: T;
    readonly position?: ButtonPositionT;
    readonly dropupText?: string;
    readonly isCustom: boolean;
    constructor(buttonElement: HTMLElement, svg: string, position?: ButtonPositionT, tooltip?: Tooltip, customStyles?: T, dropupText?: string);
    private buttonMouseLeave;
    private buttonMouseEnter;
    private buttonMouseUp;
    private buttonMouseDown;
    private setEvents;
    unsetCustomStateStyles(unsetTypes: (keyof T)[]): void;
    reapplyStateStyle(setType: keyof T, unsetTypes?: (keyof T)[]): void;
    protected changeElementsByState(newChildElements: ButtonInnerElement[]): void;
    protected buildDefaultIconElement(iconId: string): SVGGraphicsElement[];
    protected createInnerElements(iconId: string, state: keyof T, customStyles?: ButtonStateStyles<T>): ButtonInnerElement[];
}
export {};
//# sourceMappingURL=inputButton.d.ts.map