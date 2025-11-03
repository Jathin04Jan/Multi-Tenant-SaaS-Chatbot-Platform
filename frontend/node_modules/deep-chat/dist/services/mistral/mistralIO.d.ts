import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { DirectServiceIO } from '../utils/directServiceIO';
import { MistralResult } from '../../types/mistralResult';
import { Response } from '../../types/response';
import { Mistral } from '../../types/mistral';
import { DeepChat } from '../../deepChat';
export declare class MistralIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    url: string;
    permittedErrorPrefixes: string[];
    constructor(deepChat: DeepChat);
    private static getFileContent;
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: MistralResult, prevBody?: Mistral): Promise<Response>;
    private extractStreamResult;
}
//# sourceMappingURL=mistralIO.d.ts.map