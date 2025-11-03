import { ChatFunctionHandler } from './openAI';
import { GenericObject } from './object';
export interface GeminiGeneration {
    maxOutputTokens?: number;
    temperature?: number;
    topP?: number;
    topK?: number;
    stopSequences?: string[];
    responseMimeType?: string;
    responseSchema?: GenericObject;
}
export interface Gemini extends GeminiGeneration {
    model?: string;
    system_prompt?: string;
    function_handler?: ChatFunctionHandler;
    tools?: {
        functionDeclarations: {
            name: string;
            description: string;
            parameters: {
                type: string;
                properties: object;
                required?: string[];
            };
        }[];
    }[];
}
//# sourceMappingURL=gemini.d.ts.map