import { Response as ResponseI } from '../../../types/response';
import { OpenAIAssistantIOI } from './openAIAssistantIOI';
import { DeepChat } from '../../../deepChat';
export declare class OpenAIAssistantIO extends OpenAIAssistantIOI {
    fetchHistory?: () => Promise<ResponseI[]>;
    constructor(deepChat: DeepChat);
    private static buildUrlSegments;
}
//# sourceMappingURL=openAIAssistantIO.d.ts.map