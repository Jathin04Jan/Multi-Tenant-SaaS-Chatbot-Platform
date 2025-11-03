import { BigModelResult } from '../../types/bigModelResult';
import { Messages } from '../../views/chat/messages/messages';
import { MessageContentI } from '../../types/messagesInternal';
import { Response as ResponseI } from '../../types/response';
import { DirectServiceIO } from '../utils/directServiceIO';
import { BigModelChat } from '../../types/bigModel';
import { DeepChat } from '../../deepChat';
export declare class BigModelChatIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    url: string;
    permittedErrorPrefixes: string[];
    constructor(deepChat: DeepChat);
    private static getFileContent;
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: BigModelResult, prevBody?: BigModelChat): Promise<ResponseI>;
    private extractStreamResult;
}
//# sourceMappingURL=bigModelChatIO.d.ts.map