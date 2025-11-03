import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseI } from '../../types/response';
import { DirectServiceIO } from '../utils/directServiceIO';
import { MiniMaxResult } from '../../types/miniMaxResult';
import { DeepChat } from '../../deepChat';
export declare class MiniMaxIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    url: string;
    permittedErrorPrefixes: string[];
    constructor(deepChat: DeepChat);
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: MiniMaxResult): Promise<ResponseI>;
}
//# sourceMappingURL=miniMaxIO.d.ts.map