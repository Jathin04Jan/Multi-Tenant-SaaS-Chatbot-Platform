import { OpenRouterAPIResult } from '../../types/openRouterResult';
import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseI } from '../../types/response';
import { DirectServiceIO } from '../utils/directServiceIO';
import { OpenRouter } from '../../types/openRouter';
import { DeepChat } from '../../deepChat';
import { OpenRouterToolCall } from '../../types/openRouterInternal';
export declare class OpenRouterIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    url: string;
    permittedErrorPrefixes: string[];
    readonly _streamToolCalls?: OpenRouterToolCall[];
    constructor(deepChat: DeepChat);
    private static getAudioContent;
    private static getContent;
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: OpenRouterAPIResult, prevBody?: OpenRouter): Promise<ResponseI>;
    private extractStreamResult;
}
//# sourceMappingURL=openRouterIO.d.ts.map