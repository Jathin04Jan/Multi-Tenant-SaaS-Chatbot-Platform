import { OllamaConverseResult } from '../../types/ollamaResult';
import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseI } from '../../types/response';
import { DirectServiceIO } from '../utils/directServiceIO';
import { OllamaChat } from '../../types/ollama';
import { DeepChat } from '../../deepChat';
export declare class OllamaIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    validateKeyProperty: boolean;
    url: string;
    permittedErrorPrefixes: string[];
    constructor(deepChat: DeepChat);
    private static getImageData;
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: OllamaConverseResult, prevBody?: OllamaChat): Promise<ResponseI>;
    private handleTools;
}
//# sourceMappingURL=ollamaIO.d.ts.map