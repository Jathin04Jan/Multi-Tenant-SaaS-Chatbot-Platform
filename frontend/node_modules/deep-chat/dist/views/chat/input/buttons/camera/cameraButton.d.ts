import { FileAttachmentsType } from '../../fileAttachments/fileAttachmentTypes/fileAttachmentsType';
import { GenericInputButtonStyles } from '../../../../../types/genericInputButton';
import { DefinedButtonStateStyles } from '../../../../../types/buttonInternal';
import { ServiceIO } from '../../../../../services/serviceIO';
import { InputButton } from '../inputButton';
type Styles = DefinedButtonStateStyles<GenericInputButtonStyles>;
export declare class CameraButton extends InputButton<Styles> {
    constructor(containerElement: HTMLElement, fileAttachmentsType: FileAttachmentsType, fileService: ServiceIO['camera']);
    private createInnerElementsForStates;
    private static createButtonElement;
    private addClickEvent;
}
export {};
//# sourceMappingURL=cameraButton.d.ts.map