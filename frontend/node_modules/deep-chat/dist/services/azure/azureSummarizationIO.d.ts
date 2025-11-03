import { AzureSummarizationResult, AzureAuthenticationError } from '../../types/azureResult';
import { AzureSummarizationConfig } from '../../types/azure';
import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseI } from '../../types/response';
import { AzureLanguageIO } from './azureLanguageIO';
import { PollResult } from '../serviceIO';
import { DeepChat } from '../../deepChat';
type RawBody = Required<Pick<AzureSummarizationConfig, 'language'>>;
export declare class AzureSummarizationIO extends AzureLanguageIO {
    private static readonly ENDPOINT_ERROR_MESSAGE;
    permittedErrorPrefixes: string[];
    url: string;
    textInputPlaceholderText: string;
    isTextInputDisabled: boolean;
    constructor(deepChat: DeepChat);
    preprocessBody(body: RawBody, messages: MessageContentI[]): {
        analysisInput: {
            documents: {
                id: string;
                language: string;
                text: string;
            }[];
        };
        tasks: {
            kind: string;
        }[];
    } | undefined;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: Response & AzureAuthenticationError): Promise<ResponseI>;
    extractPollResultData(result: AzureSummarizationResult): PollResult;
}
export {};
//# sourceMappingURL=azureSummarizationIO.d.ts.map