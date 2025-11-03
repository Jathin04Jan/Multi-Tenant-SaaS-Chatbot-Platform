import { SubmitAfterSilence } from '../../../../../../types/microphone';
import { TextInputEl } from '../../../textInput/textInput';
export declare class SilenceSubmit {
    private _silenceTimeout?;
    private readonly _silenceMS;
    private readonly _stop;
    constructor(submitAfterSilence: SubmitAfterSilence, stopAfterSubmit?: boolean);
    private setSilenceTimeout;
    clearSilenceTimeout(): void;
    resetSilenceTimeout(textInput: TextInputEl, buttonClick: () => void): void;
    onPause(isStart: boolean, textInput: TextInputEl, buttonClick: () => void): void;
}
//# sourceMappingURL=silenceSubmit.d.ts.map