import { GroqResult, GroqToolCall } from '../../types/groqResult';
import { GroqRequestBody } from '../../types/groqInternal';
import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseI } from '../../types/response';
import { DirectServiceIO } from '../utils/directServiceIO';
import { DeepChat } from '../../deepChat';
export declare class GroqChatIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    url: string;
    permittedErrorPrefixes: string[];
    _streamToolCalls?: GroqToolCall[];
    constructor(deepChat: DeepChat);
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: GroqResult, prevBody?: GroqRequestBody): Promise<ResponseI>;
    private extractStreamResult;
}
//# sourceMappingURL=groqChatIO.d.ts.map