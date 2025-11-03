import { FileAttachmentsType } from '../../fileAttachments/fileAttachmentTypes/fileAttachmentsType';
import { ButtonContainersT } from '../../buttonContainers/buttonContainers';
import { DropupStyles } from '../../../../../types/dropupStyles';
import { BUTTON_TYPE } from '../../../../../types/buttonTypes';
import { ButtonPosition } from '../../../../../types/button';
import { InputButton } from '../inputButton';
export type PositionToButtons = {
    [key in ButtonPosition]: ButtonProps[];
};
type ButtonProps = {
    button: InputButton;
    buttonType?: BUTTON_TYPE;
    fileType?: FileAttachmentsType;
};
type Buttons = {
    [key in BUTTON_TYPE]?: ButtonProps;
};
export declare class InputButtonPositions {
    private static addToDropup;
    private static addToSideContainer;
    private static setPosition;
    private static createPositionsToButtonsObj;
    private static generatePositionToButtons;
    static addButtons(buttonContainers: ButtonContainersT, buttons: Buttons, container: HTMLElement, dropupStyles?: DropupStyles): PositionToButtons;
}
export {};
//# sourceMappingURL=inputButtonPositions.d.ts.map