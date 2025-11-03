import { QwenToolCall } from '../../types/qwenInternal';
import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseI } from '../../types/response';
import { DirectServiceIO } from '../utils/directServiceIO';
import { QwenResult } from '../../types/qwenResult';
import { DeepChat } from '../../deepChat';
import { Qwen } from '../../types/qwen';
export declare class QwenIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    url: string;
    permittedErrorPrefixes: string[];
    readonly _streamToolCalls?: QwenToolCall[];
    constructor(deepChat: DeepChat);
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: QwenResult, prevBody?: Qwen): Promise<ResponseI>;
    private extractStreamResult;
}
//# sourceMappingURL=qwenIO.d.ts.map