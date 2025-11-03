import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseI } from '../../types/response';
import { DirectServiceIO } from '../utils/directServiceIO';
import { DeepChat } from '../../deepChat';
export declare class BigModelTextToSpeechIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    url: string;
    permittedErrorPrefixes: string[];
    constructor(deepChat: DeepChat);
    private cleanConfig;
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: ArrayBuffer): Promise<ResponseI>;
}
//# sourceMappingURL=bigModelTextToSpeechIO.d.ts.map