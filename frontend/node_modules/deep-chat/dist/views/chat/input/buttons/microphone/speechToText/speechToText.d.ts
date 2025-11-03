import { SpeechToTextConfig } from '../../../../../../types/microphone';
import { OnPreResult } from 'speech-to-element/dist/types/options';
import { TextInputEl } from '../../../textInput/textInput';
import { Messages } from '../../../../messages/messages';
import { MicrophoneButton } from '../microphoneButton';
import { DeepChat } from '../../../../../../deepChat';
export type ProcessedConfig = SpeechToTextConfig & {
    onPreResult?: OnPreResult;
};
export type AddErrorMessage = Messages['addNewErrorMessage'];
export declare class SpeechToText extends MicrophoneButton {
    private readonly _addErrorMessage;
    private _silenceSubmit?;
    private _validationHandler?;
    static readonly MICROPHONE_RESET_TIMEOUT_MS = 300;
    constructor(deepChat: DeepChat, textInput: TextInputEl, addErrorMessage: AddErrorMessage);
    private processConfiguration;
    private static getServiceName;
    private buttonClick;
    private onCommandModeTrigger;
    private onError;
    static toggleSpeechAfterSubmit(microphoneButton: HTMLElement, stopAfterSubmit?: boolean): void;
}
//# sourceMappingURL=speechToText.d.ts.map