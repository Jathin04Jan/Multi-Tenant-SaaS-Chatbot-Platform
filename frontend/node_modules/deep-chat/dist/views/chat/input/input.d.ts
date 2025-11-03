import { FileAttachmentsType } from './fileAttachments/fileAttachmentTypes/fileAttachmentsType';
import { ServiceIO } from '../../../services/serviceIO';
import { BUTTON_TYPE } from '../../../types/buttonTypes';
import { InputButton } from './buttons/inputButton';
import { Messages } from '../messages/messages';
import { DeepChat } from '../../../deepChat';
export type Buttons = {
    [key in BUTTON_TYPE]?: {
        button: InputButton;
        fileType?: FileAttachmentsType;
    };
};
export declare class Input {
    readonly elementRef: HTMLElement;
    constructor(deepChat: DeepChat, messages: Messages, serviceIO: ServiceIO, containerElement: HTMLElement);
    private static createPanelElement;
    private createFileUploadComponents;
    private static createUploadButtons;
    private static addElements;
    private static assignOnInput;
}
//# sourceMappingURL=input.d.ts.map