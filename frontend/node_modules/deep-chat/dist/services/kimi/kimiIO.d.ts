import { KimiToolCall } from '../../types/kimiInternal';
import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseI } from '../../types/response';
import { DirectServiceIO } from '../utils/directServiceIO';
import { KimiResult } from '../../types/kimiResult';
import { DeepChat } from '../../deepChat';
import { Kimi } from '../../types/kimi';
export declare class KimiIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    url: string;
    permittedErrorPrefixes: string[];
    readonly _streamToolCalls?: KimiToolCall[];
    constructor(deepChat: DeepChat);
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: KimiResult, prevBody?: Kimi): Promise<ResponseI>;
    private extractStreamResult;
}
//# sourceMappingURL=kimiIO.d.ts.map