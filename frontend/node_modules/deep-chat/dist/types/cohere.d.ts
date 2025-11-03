export interface Cohere {
    model?: string;
    temperature?: number;
    prompt_truncation?: 'AUTO' | 'OFF';
    connectors?: {
        id: string;
    }[];
    documents?: {
        title: string;
        snippet: string;
    }[];
}
//# sourceMappingURL=cohere.d.ts.map