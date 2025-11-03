import { CohereChatResult } from '../../types/cohereResult';
import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { DirectServiceIO } from '../utils/directServiceIO';
import { Response } from '../../types/response';
import { DeepChat } from '../../deepChat';
export declare class CohereIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    permittedErrorPrefixes: string[];
    url: string;
    constructor(deepChat: DeepChat);
    private cleanConfig;
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: CohereChatResult): Promise<Response>;
    private static parseBundledEvents;
    private static aggregateBundledEventsText;
}
//# sourceMappingURL=cohereIO.d.ts.map