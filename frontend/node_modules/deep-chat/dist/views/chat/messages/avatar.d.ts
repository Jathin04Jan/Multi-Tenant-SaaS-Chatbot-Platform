import { Avatars } from '../../../types/avatars';
import { Role } from './role';
export declare class Avatar extends Role {
    private readonly _avatars;
    constructor(avatars: Avatars);
    addBesideBubble(messageText: HTMLElement, role: string): void;
    private createAvatar;
    private getPosition;
    private static errorFallback;
    private static applyCustomStylesToElements;
    private static applyCustomStyles;
}
//# sourceMappingURL=avatar.d.ts.map