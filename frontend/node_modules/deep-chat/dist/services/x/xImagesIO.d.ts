import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { DirectServiceIO } from '../utils/directServiceIO';
import { XImageResult } from '../../types/xResult';
import { Response } from '../../types/response';
import { DeepChat } from '../../deepChat';
export declare class XImagesIO extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    private static readonly IMAGE_GENERATION_URL;
    url: string;
    permittedErrorPrefixes: string[];
    constructor(deepChat: DeepChat);
    private preprocessBody;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[]): Promise<void>;
    extractResultData(result: XImageResult): Promise<Response>;
}
//# sourceMappingURL=xImagesIO.d.ts.map