import { OpenAIAssistant, OpenAIChat } from './openAI';
export interface AzureTranslationConfig {
    language?: string;
}
export interface AzureSummarizationConfig {
    language?: string;
}
export interface AzureEndpoint {
    endpoint: string;
}
export interface AzureSpeechToTextConfig {
    lang?: string;
}
export interface AzureTextToSpeechConfig {
    lang?: string;
    name?: string;
    gender?: string;
    outputFormat?: string;
}
export interface AzureRegion {
    region: string;
}
type AzureOpenAIDataSources = {
    type: string;
    parameters?: object;
}[];
export type AzureOpenAIChat = OpenAIChat & {
    data_sources?: AzureOpenAIDataSources;
};
type URLDetails = {
    endpoint: string;
    version: string;
    deploymentId: string;
};
export interface AzureOpenAI {
    urlDetails: URLDetails;
    chat?: true | AzureOpenAIChat;
    assistant?: true | OpenAIAssistant;
}
export interface Azure {
    textToSpeech?: AzureRegion & AzureTextToSpeechConfig;
    speechToText?: AzureRegion & AzureSpeechToTextConfig;
    summarization?: AzureEndpoint & AzureSummarizationConfig;
    translation?: Partial<AzureRegion> & AzureTranslationConfig;
    openAI?: AzureOpenAI;
}
export {};
//# sourceMappingURL=azure.d.ts.map