import { GeminiGenerateContentResult } from '../../types/geminiResult';
import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { DirectServiceIO } from '../utils/directServiceIO';
import { Response } from '../../types/response';
import { Gemini } from '../../types/gemini';
import { DeepChat } from '../../deepChat';
export declare class GeminiIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    urlPrefix: string;
    url: string;
    permittedErrorPrefixes: string[];
    constructor(deepChat: DeepChat);
    private cleanConfig;
    private static getContent;
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: GeminiGenerateContentResult, prevBody?: Gemini): Promise<Response>;
    private handleTools;
}
//# sourceMappingURL=geminiIO.d.ts.map