import { ChatFunctionHandler } from './openAI';
export interface ClaudeTool {
    name: string;
    description: string;
    input_schema: {
        type: 'object';
        properties: object;
        required?: string[];
    };
}
export interface ClaudeMCPServer {
    type: 'url';
    url: string;
    name: string;
    authorization_token?: string;
}
export interface Claude {
    model?: string;
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    top_k?: number;
    stop_sequences?: string[];
    system_prompt?: string;
    tools?: ClaudeTool[];
    tool_choice?: 'auto' | 'any' | {
        type: 'tool';
        name: string;
    } | {
        type: 'function';
        name: string;
    };
    function_handler?: ChatFunctionHandler;
    mcp_servers?: ClaudeMCPServer[];
}
//# sourceMappingURL=claude.d.ts.map