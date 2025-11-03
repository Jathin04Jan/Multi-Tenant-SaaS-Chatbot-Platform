import { AssistantFunctionHandler, OpenAI, OpenAIAssistant } from '../../../types/openAI';
import { MessageContentI } from '../../../types/messagesInternal';
import { KeyVerificationDetails } from '../../../types/keyVerificationDetails';
import { Messages } from '../../../views/chat/messages/messages';
import { Response as ResponseI } from '../../../types/response';
import { DirectServiceIO } from '../../utils/directServiceIO';
import { BuildHeadersFunc } from '../../../types/headers';
import { APIKey } from '../../../types/APIKey';
import { DeepChat } from '../../../deepChat';
import { PollResult } from '../../serviceIO';
import { OpenAIAssistantInitReqResult, OpenAIRunResult } from '../../../types/openAIResult';
export type URLSegments = {
    threadsPrefix: string;
    threadsPosfix: string;
    newAssistantUrl: string;
    createMessagePostfix: string;
    listMessagesPostfix: string;
    storeFiles: string;
    getFilesPrefix: string;
    getFilesPostfix: string;
};
export declare class OpenAIAssistantIOI extends DirectServiceIO {
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    url: string;
    private static readonly POLLING_TIMEOUT_MS;
    permittedErrorPrefixes: string[];
    _functionHandlerI?: AssistantFunctionHandler;
    filesToolType: OpenAIAssistant['files_tool_type'];
    readonly shouldFetchHistory: boolean;
    private run_id?;
    private _searchedForThreadId;
    private readonly _config;
    private readonly _newAssistantDetails;
    private _waitingForStreamResponse;
    private readonly _isSSEStream;
    private readonly urlSegments;
    private _messageStream;
    constructor(deepChat: DeepChat, config: OpenAI['assistant'], urlSegments: URLSegments, keyVerificationDetails: KeyVerificationDetails, buildHeadersFunc: BuildHeadersFunc, apiKey?: APIKey);
    fetchHistoryFunc(): Promise<{
        text?: string;
        files?: import('../../../types/messageFile').MessageFile[];
    }[] | {
        error: string;
    }[]>;
    private static processImageMessage;
    private static processAttachmentsMessage;
    private processMessage;
    private createNewThreadMessages;
    private callService;
    callServiceAPI(messages: Messages, pMessages: MessageContentI[], files?: File[]): Promise<void>;
    private createNewAssistant;
    private searchPreviousMessagesForThreadId;
    extractResultData(result: OpenAIAssistantInitReqResult): Promise<ResponseI>;
    private assignThreadAndRun;
    private getThreadMessages;
    extractPollResultData(result: OpenAIRunResult): PollResult;
    private handleTools;
    private handleStream;
    private parseStreamResult;
    private createStreamRun;
}
//# sourceMappingURL=openAIAssistantIOI.d.ts.map