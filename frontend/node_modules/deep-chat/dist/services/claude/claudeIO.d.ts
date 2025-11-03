import { ClaudeRequestBody } from '../../types/claudeInternal';
import { ClaudeResult } from '../../types/claudeResult';
import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseI } from '../../types/response';
import { DirectServiceIO } from '../utils/directServiceIO';
import { DeepChat } from '../../deepChat';
export declare class ClaudeIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    url: string;
    permittedErrorPrefixes: string[];
    private _streamToolCalls;
    constructor(deepChat: DeepChat);
    private static getFileContent;
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: ClaudeResult, prevBody?: ClaudeRequestBody): Promise<ResponseI>;
    private handleTools;
}
//# sourceMappingURL=claudeIO.d.ts.map