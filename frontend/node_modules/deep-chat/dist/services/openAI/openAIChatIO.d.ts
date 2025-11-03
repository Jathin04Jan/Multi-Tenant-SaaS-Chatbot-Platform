import { OpenAIConverseResult, ToolCalls } from '../../types/openAIResult';
import { KeyVerificationDetails } from '../../types/keyVerificationDetails';
import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseI } from '../../types/response';
import { DirectServiceIO } from '../utils/directServiceIO';
import { BuildHeadersFunc } from '../../types/headers';
import { OpenAIChat } from '../../types/openAI';
import { APIKey } from '../../types/APIKey';
import { DeepChat } from '../../deepChat';
export declare class OpenAIChatIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    url: string;
    permittedErrorPrefixes: string[];
    _streamToolCalls?: ToolCalls;
    constructor(deepChat: DeepChat, keyVerificationDetailsArg?: KeyVerificationDetails, buildHeadersFuncArg?: BuildHeadersFunc, apiKeyArg?: APIKey, configArg?: true | OpenAIChat);
    private static getFileContent;
    private static getContent;
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: OpenAIConverseResult, prevBody?: OpenAIChat): Promise<ResponseI>;
    private extractStreamResult;
}
//# sourceMappingURL=openAIChatIO.d.ts.map