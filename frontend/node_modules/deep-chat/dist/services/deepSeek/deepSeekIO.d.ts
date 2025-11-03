import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseI } from '../../types/response';
import { DeepSeekResult } from '../../types/deepSeekResult';
import { DirectServiceIO } from '../utils/directServiceIO';
import { DeepChat } from '../../deepChat';
export declare class DeepSeekIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    url: string;
    permittedErrorPrefixes: string[];
    constructor(deepChat: DeepChat);
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: DeepSeekResult): Promise<ResponseI>;
}
//# sourceMappingURL=deepSeekIO.d.ts.map