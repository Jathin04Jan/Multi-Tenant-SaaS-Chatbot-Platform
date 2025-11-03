import { OpenAIChatIO } from '../openAI/openAIChatIO';
import { DeepChat } from '../../deepChat';
export declare class AzureOpenAIChatIO extends OpenAIChatIO {
    permittedErrorPrefixes: string[];
    isTextInputDisabled: boolean;
    constructor(deepChat: DeepChat);
    private static buildURL;
}
//# sourceMappingURL=azureOpenAIChatIO.d.ts.map