import { OpenAIMessage } from './openAIResult';
import { OpenAIChat } from './openAI';
export type OpenAIConverseBodyInternal = OpenAIChat & {
    model: string;
    messages?: OpenAIMessage[];
};
//# sourceMappingURL=openAIInternal.d.ts.map