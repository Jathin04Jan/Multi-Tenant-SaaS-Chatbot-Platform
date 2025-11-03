import { OpenAIAssistantIOI } from '../openAI/assistant/openAIAssistantIOI';
import { DeepChat } from '../../deepChat';
export declare class AzureOpenAIAssistantIO extends OpenAIAssistantIOI {
    private static readonly THREAD_RESOURCE;
    private static readonly NEW_ASSISTANT_RESOURCE;
    permittedErrorPrefixes: string[];
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    isTextInputDisabled: boolean;
    constructor(deepChat: DeepChat);
}
//# sourceMappingURL=azureOpenAIAssistantIO.d.ts.map