import { CustomStyle } from '../../../../types/styles';
import { DropupMenuStyles } from '../../../../types/dropupStyles';
import { InputButton } from '../buttons/inputButton';
import { DropupMenu } from './dropupMenu';
export declare class DropupItem {
    static MENU_ITEM_CLASS: string;
    static TEXT_CLASS: string;
    static ICON_CLASS: string;
    private static addItemEvents;
    static createItemText(dropupText?: string, textStyle?: CustomStyle): HTMLElement;
    static createItemIcon(inputButtonElement: Element, iconContainerStyle?: CustomStyle): HTMLElement;
    private static populateItem;
    static createItem(menu: DropupMenu, inputButton: InputButton, styles?: DropupMenuStyles): HTMLElement;
}
//# sourceMappingURL=dropupItem.d.ts.map