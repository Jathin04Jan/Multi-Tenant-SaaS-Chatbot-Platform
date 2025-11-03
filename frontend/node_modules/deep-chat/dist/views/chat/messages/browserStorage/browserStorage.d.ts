import { BrowserStorage as BrowserStorageT } from '../../../../types/browserStorage';
import { MessageContentI } from '../../../../types/messagesInternal';
export declare class BrowserStorage {
    private readonly storageKey;
    private readonly maxMessages;
    constructor(config: BrowserStorageT);
    get(): any;
    addMessages(messages: MessageContentI[]): void;
    clear(): void;
}
//# sourceMappingURL=browserStorage.d.ts.map