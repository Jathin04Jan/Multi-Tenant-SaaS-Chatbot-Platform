import { RemarkableOptions } from '../../../../types/remarkable';
import { Remarkable } from 'remarkable';
import { default as hljs } from 'highlight.js';
declare global {
    interface Window {
        hljs: typeof hljs;
        remarkable_plugins: {
            plugin: unknown;
            options?: unknown;
        }[];
        katex: {
            renderToString: (source: string, options?: {
                displayMode: boolean;
                throwOnError: boolean;
                output: string;
            }) => string;
        };
    }
}
export declare class RemarkableConfig {
    private static readonly DEFAULT_PROPERTIES;
    private static addPlugins;
    private static instantiate;
    static createNew(customConfig?: RemarkableOptions): Remarkable;
}
//# sourceMappingURL=remarkableConfig.d.ts.map