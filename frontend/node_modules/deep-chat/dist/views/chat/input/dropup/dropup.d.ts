import { PositionToButtons } from '../buttons/styleAdjustments/inputButtonPositions';
import { GenericInputButtonStyles } from '../../../../types/genericInputButton';
import { DefinedButtonStateStyles } from '../../../../types/buttonInternal';
import { DropupStyles } from '../../../../types/dropupStyles';
import { InputButton } from '../buttons/inputButton';
type Styles = DefinedButtonStateStyles<GenericInputButtonStyles>;
export declare class Dropup extends InputButton<Styles> {
    private readonly _menu;
    static BUTTON_ICON_CLASS: string;
    readonly buttonContainer: HTMLElement;
    constructor(containerElement: HTMLElement, styles?: DropupStyles);
    private static createButtonElement;
    private createInnerElementsForStates;
    private addClickEvent;
    private static createButtonContainer;
    addItem(buttonProps: InputButton): void;
    private addContainerEvents;
    static getPosition(pToBs: PositionToButtons, dropupStyles?: DropupStyles): import('../../../../types/button').ButtonPosition;
}
export {};
//# sourceMappingURL=dropup.d.ts.map