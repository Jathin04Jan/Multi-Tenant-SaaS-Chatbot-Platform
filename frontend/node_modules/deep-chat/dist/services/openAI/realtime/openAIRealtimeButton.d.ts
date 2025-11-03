import { DefinedButtonStateStyles, ButtonInnerElement } from '../../../types/buttonInternal';
import { OpenAIRealtimeButton as OpenAIRealtimeButtonT } from '../../../types/openAIRealtime';
import { InputButton } from '../../../views/chat/input/buttons/inputButton';
type Styles = DefinedButtonStateStyles<OpenAIRealtimeButtonT>;
export declare class OpenAIRealtimeButton extends InputButton<Styles> {
    private static readonly EMPTY_SVG;
    private readonly _innerElements;
    isActive: boolean;
    constructor(styles?: OpenAIRealtimeButtonT);
    private createInnerElementsForStates;
    private createInnerButtonElements;
    protected changeState(innerElements: ButtonInnerElement[]): void;
    changeToActive(): void;
    changeToDefault(): void;
    changeToUnavailable(): void;
}
export {};
//# sourceMappingURL=openAIRealtimeButton.d.ts.map