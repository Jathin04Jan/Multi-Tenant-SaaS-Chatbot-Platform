export interface RemarkableOptions {
    xhtmlOut?: boolean;
    html?: boolean;
    breaks?: boolean;
    langPrefix?: `language-${string}`;
    linkTarget?: string;
    typographer?: boolean;
    quotes?: string;
    highlight?: (str: string, lang: string) => void;
    math?: true | {
        delimiter?: string;
        options?: KatexOptions;
    };
    applyHTML?: boolean;
}
export type KatexOptions = {
    leqno?: boolean;
    fleqn?: boolean;
    throwOnError?: boolean;
    errorColor?: string;
    macros?: Record<string, string>;
    minRuleThickness?: number;
    colorIsTextColor?: boolean;
    maxSize?: number;
    maxExpand?: number;
    globalGroup?: boolean;
};
//# sourceMappingURL=remarkable.d.ts.map