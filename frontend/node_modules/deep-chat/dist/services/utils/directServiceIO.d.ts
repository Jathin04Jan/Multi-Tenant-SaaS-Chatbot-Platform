import { KeyVerificationDetails } from '../../types/keyVerificationDetails';
import { ChatFunctionHandler, FunctionsDetails } from '../../types/openAI';
import { KeyVerificationHandlers, ServiceFileTypes } from '../serviceIO';
import { MessageContentI } from '../../types/messagesInternal';
import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseI } from '../../types/response';
import { BuildHeadersFunc } from '../../types/headers';
import { MessageFile } from '../../types/messageFile';
import { MessageContent } from '../../types/messages';
import { StreamConfig } from '../../types/stream';
import { BaseServiceIO } from './baseServiceIO';
import { APIKey } from '../../types/APIKey';
import { DeepChat } from '../../deepChat';
export declare class DirectServiceIO extends BaseServiceIO {
    key?: string;
    insertKeyPlaceholderText: string;
    keyHelpUrl: string;
    sessionId?: string;
    asyncCallInProgress: boolean;
    messages?: Messages;
    protected systemMessage: string;
    protected functionHandler?: ChatFunctionHandler;
    private readonly _keyVerificationDetails;
    private readonly _buildHeadersFunc;
    constructor(deepChat: DeepChat, keyVerificationDetails: KeyVerificationDetails, buildHeadersFunc: BuildHeadersFunc, apiKey?: APIKey, existingFileTypes?: ServiceFileTypes);
    private setApiKeyProperties;
    private buildConnectSettings;
    protected completeConfig(config: {
        system_prompt?: string;
        key?: string;
        function_handler?: ChatFunctionHandler;
    }, function_handler?: ChatFunctionHandler): void;
    private keyAuthenticated;
    verifyKey(key: string, keyVerificationHandlers: KeyVerificationHandlers): void;
    isDirectConnection(): boolean;
    protected static getRoleViaUser(role: string): "user" | "assistant";
    protected static getRoleViaAI(role: string): "user" | "assistant";
    protected processMessages(pMessages: MessageContentI[]): MessageContentI[];
    protected addSystemMessage(processedMessages: (MessageContent & {
        content: unknown;
    })[]): void;
    callDirectServiceServiceAPI(messages: Messages, pMessages: MessageContentI[], preprocessBody: (body: any, messages: MessageContentI[]) => any, streamConfig?: StreamConfig, stringifyBody?: boolean): Promise<void>;
    protected callToolFunction(functionHandler: ChatFunctionHandler, functions: FunctionsDetails): Promise<{
        processedResponse: ResponseI | {
            text: string;
        };
        responses?: undefined;
    } | {
        responses: {
            response: string;
        }[] | {
            response: string;
        }[];
        processedResponse?: undefined;
    }>;
    protected makeAnotherRequest(body: object, messages?: Messages): {
        text: string;
    };
    protected genereteAPIKeyName(serviceName: string): string;
    protected static getImageContent(files: MessageFile[]): {
        type: 'text' | 'image_url';
        text?: string;
        image_url?: {
            url: string;
        };
    }[];
    protected static getTextWImagesContent(message: MessageContentI): string | {
        type: "text" | "image_url";
        text?: string;
        image_url?: {
            url: string;
        };
    }[];
    protected static getTextWFilesContent<T>(message: MessageContentI, getFileContent: (files: MessageFile[]) => T[]): string | T[];
    protected extractStreamResultWToolsGeneric(service: {
        _streamToolCalls?: {
            id: string;
            function: {
                name: string;
                arguments: string;
            };
        }[];
        messages?: Messages;
    }, choice: {
        delta?: {
            content?: string | null;
            tool_calls?: {
                id: string;
                function: {
                    name: string;
                    arguments: string;
                };
            }[];
        };
        finish_reason?: 'stop' | 'length' | 'tool_calls' | string | null;
    }, functionHandler?: ChatFunctionHandler, prevBody?: unknown, system?: {
        message?: string;
    }): Promise<ResponseI>;
    protected handleToolsGeneric(tools: {
        tool_calls?: {
            id: string;
            function: {
                name: string;
                arguments: string;
            };
        }[];
    }, functionHandler?: ChatFunctionHandler, messages?: Messages, prevBody?: unknown, system?: {
        message?: string;
    }): Promise<ResponseI>;
}
//# sourceMappingURL=directServiceIO.d.ts.map