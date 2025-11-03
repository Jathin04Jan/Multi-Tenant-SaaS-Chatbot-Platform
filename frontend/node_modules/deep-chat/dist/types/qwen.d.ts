import { ChatFunctionHandler } from './openAI';
export interface QwenTool {
    type: 'function';
    function: {
        name: string;
        description: string;
        parameters: object;
    };
}
export interface Qwen {
    model?: string;
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    stop?: string | string[];
    system_prompt?: string;
    function_handler?: ChatFunctionHandler;
    tools?: QwenTool[];
    tool_choice?: 'auto' | 'none' | {
        type: 'function';
        function: {
            name: string;
        };
    };
}
//# sourceMappingURL=qwen.d.ts.map