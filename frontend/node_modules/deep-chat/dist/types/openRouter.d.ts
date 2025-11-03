import { ChatFunctionHandler } from './openAI';
export interface OpenRouterTool {
    type: 'function';
    function: {
        name: string;
        description: string;
        parameters: object;
    };
}
export interface OpenRouter {
    model?: string;
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    system_prompt?: string;
    tools?: OpenRouterTool[];
    function_handler?: ChatFunctionHandler;
}
//# sourceMappingURL=openRouter.d.ts.map