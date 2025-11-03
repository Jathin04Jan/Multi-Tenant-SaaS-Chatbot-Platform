import { ChatFunctionHandler } from './openAI';
export type GroqTextToSpeech = {
    model?: string;
    voice?: string;
    speed?: number;
    response_format?: 'mp3' | 'opus' | 'aac' | 'flac';
};
export type GroqChat = {
    system_prompt?: string;
    model?: string;
    max_completion_tokens?: number;
    temperature?: number;
    top_p?: number;
    stop?: string[];
    seed?: number;
    tools?: object[];
    tool_choice?: 'none' | 'auto' | 'required' | {
        type: 'function';
        function: {
            name: string;
        };
    };
    function_handler?: ChatFunctionHandler;
    parallel_tool_calls?: boolean;
};
export interface Groq {
    chat?: true | GroqChat;
    textToSpeech?: true | GroqTextToSpeech;
}
//# sourceMappingURL=groq.d.ts.map