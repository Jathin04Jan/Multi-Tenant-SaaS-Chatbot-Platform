import { ValidationHandler } from '../../../../types/validationHandler';
import { FileAttachments } from '../fileAttachments/fileAttachments';
export declare class TextInputEvents {
    private static readonly PERMITTED_KEYS;
    static add(inputElement: HTMLElement, fileAts: FileAttachments, characterLimit?: number, validationHandler?: ValidationHandler): void;
    private static onKeyDown;
    private static isKeyCombinationPermitted;
    private static onInput;
}
//# sourceMappingURL=textInputEvents.d.ts.map