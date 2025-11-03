import { OpenAIAssistantData, OpenAIAssistantContent, OpenAIAssistantMessagesResult } from '../../../../types/openAIResult';
import { MessageFile } from '../../../../types/messageFile';
import { Messages } from '../../../../views/chat/messages/messages';
import { DirectServiceIO } from '../../../utils/directServiceIO';
import { URLSegments } from '../openAIAssistantIOI';
import { ServiceIO } from '../../../serviceIO';
export type UploadedFile = {
    id: string;
    name: string;
};
export declare class OpenAIAssistantUtils {
    static readonly FILES_WITH_TEXT_ERROR = "content with type `text` must have `text` values";
    static readonly FUNCTION_TOOL_RESP_ERROR: string;
    static storeFiles(serviceIO: ServiceIO, messages: Messages, files: File[], storeFilesUrl: string): Promise<UploadedFile[] | undefined>;
    private static getType;
    private static getFiles;
    private static getFileName;
    private static getFilesAndNewText;
    private static getFileDetails;
    static getFilesAndText(io: ServiceIO, message: OpenAIAssistantData, urls: URLSegments, content?: OpenAIAssistantContent): Promise<{
        text: string;
        role: string | undefined;
        files?: undefined;
    } | {
        files: MessageFile[] | undefined;
        role: string | undefined;
        text?: undefined;
    }>;
    private static parseResult;
    private static parseMessages;
    static processStreamMessages(io: DirectServiceIO, content: OpenAIAssistantContent[], urls: URLSegments): Promise<{
        text?: string;
        files?: MessageFile[];
    }[]>;
    static processAPIMessages(io: DirectServiceIO, result: OpenAIAssistantMessagesResult, isHistory: boolean, urls: URLSegments): Promise<{
        text?: string;
        files?: MessageFile[];
    }[]>;
}
//# sourceMappingURL=openAIAssistantUtils.d.ts.map