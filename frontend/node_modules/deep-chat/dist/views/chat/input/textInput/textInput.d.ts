import { FileAttachments } from '../fileAttachments/fileAttachments';
import { ServiceIO } from '../../../../services/serviceIO';
import { DeepChat } from '../../../../deepChat';
export declare class TextInputEl {
    static TEXT_INPUT_ID: string;
    readonly elementRef: HTMLElement;
    readonly inputElementRef: HTMLElement;
    private readonly _config;
    private _isComposing;
    private _onInput;
    submit?: () => void;
    constructor(deepChat: DeepChat, serviceIO: ServiceIO, fileAttachments: FileAttachments);
    private static processConfig;
    private static createContainerElement;
    private static preventAutomaticScrollUpOnNewLine;
    clear(): void;
    private createInputElement;
    removePlaceholderStyle(): void;
    private addEventListeners;
    private onBlur;
    private onKeydown;
    private onInput;
    private setPlaceholderText;
    isTextInputEmpty(): boolean;
}
//# sourceMappingURL=textInput.d.ts.map