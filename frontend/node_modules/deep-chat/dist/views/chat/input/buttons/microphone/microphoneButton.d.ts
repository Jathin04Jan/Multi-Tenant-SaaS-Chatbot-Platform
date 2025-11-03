import { DefinedButtonStateStyles } from '../../../../../types/buttonInternal';
import { MicrophoneStyles } from '../../../../../types/microphone';
import { ButtonStyles } from '../../../../../types/button';
import { InputButton } from '../inputButton';
type AllMicrophoneStyles = MicrophoneStyles & {
    commandMode?: ButtonStyles;
};
type Styles = Omit<DefinedButtonStateStyles<AllMicrophoneStyles>, 'tooltip'>;
export declare class MicrophoneButton extends InputButton<Styles> {
    private readonly _innerElements;
    isActive: boolean;
    constructor(styles?: AllMicrophoneStyles);
    private createInnerElementsForStates;
    private static createMicrophoneElement;
    changeToActive(): void;
    changeToDefault(): void;
    changeToCommandMode(): void;
    changeToUnsupported(): void;
    private toggleIconFilter;
}
export {};
//# sourceMappingURL=microphoneButton.d.ts.map