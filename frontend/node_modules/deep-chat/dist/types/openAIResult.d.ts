import { InterfacesUnion } from './utilityTypes';
export type OpenAIAssistantInitReqResult = OpenAIRunResult & {
    id: string;
    error?: {
        code: string;
        message: string;
    };
    delta?: {
        content?: OpenAIAssistantContent[];
        step_details?: {
            tool_calls?: ToolCalls;
        };
    };
    file_ids?: string[];
    content?: OpenAIAssistantContent[];
};
export interface OpenAINewAssistantResult {
    id: string;
}
export interface OpenAIAssistantContent {
    image_file?: {
        file_id: string;
    };
    text?: {
        value: string;
        annotations?: {
            text?: string;
            file_path?: {
                file_id?: string;
            };
        }[];
    };
}
export interface OpenAIAssistantData {
    content: OpenAIAssistantContent[];
    role: string;
}
export interface OpenAIAssistantMessagesResult {
    data: OpenAIAssistantData[];
}
export type ToolCalls = {
    function: {
        name: string;
        arguments: string;
    };
    id: string;
}[];
export interface OpenAIRunResult {
    status: string;
    thread_id: string;
    required_action?: {
        submit_tool_outputs?: {
            tool_calls?: ToolCalls;
        };
    };
}
export interface ToolAPI {
    tool_calls?: ToolCalls;
    tool_call_id?: string;
    name?: string;
}
export type OpenAIMessage = {
    role: 'user' | 'system' | 'ai' | 'tool';
    content: string;
    audio?: {
        data: string;
        transcript: string;
    };
} & ToolAPI;
export type OpenAITextToSpeechResult = Blob | {
    error?: {
        code: string;
        message: string;
    };
};
export type ResultChoice = InterfacesUnion<{
    text: string;
} | {
    message: OpenAIMessage;
} | {
    delta: OpenAIMessage;
    finish_reason?: string;
}>;
export interface OpenAIConverseResult {
    choices: ResultChoice[];
    usage: {
        total_tokens: number;
    };
    error?: {
        code: string;
        message: string;
    };
}
export interface OpenAIImageResult {
    data: InterfacesUnion<{
        url: string;
    } | {
        b64_json: string;
    }>[];
    error?: {
        code: string;
        message: string;
    };
}
export interface OpenAIAudioResult {
    text: string;
    error?: {
        code: string;
        message: string;
    };
}
//# sourceMappingURL=openAIResult.d.ts.map