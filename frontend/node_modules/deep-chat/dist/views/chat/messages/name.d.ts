import { Names } from '../../../types/names';
import { Role } from './role';
export declare class Name extends Role {
    private readonly _names;
    constructor(names: Names);
    addBesideBubble(messageText: HTMLElement, role: string): void;
    private createName;
    private static getPosition;
    private static applyStyle;
    private static getNameText;
}
//# sourceMappingURL=name.d.ts.map