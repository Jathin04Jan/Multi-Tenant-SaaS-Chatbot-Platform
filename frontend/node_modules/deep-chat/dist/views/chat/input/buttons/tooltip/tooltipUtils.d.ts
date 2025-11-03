import { ActiveTooltip, Tooltip } from '../../../../../types/tooltip';
export declare class TooltipUtils {
    private static readonly OVERFLOW_NEW_POSITION_PX;
    static buildElement(): HTMLElement;
    static tryCreateConfig(defaultText: string, tooltip?: true | Tooltip): Tooltip | undefined;
    private static traverseParentUntilContainer;
    private static setPosition;
    static display(buttonElement: HTMLElement, config: Tooltip, tooltipElement?: HTMLElement): {
        timeout: number;
        element: HTMLElement;
    };
    static hide(activeTooltip: ActiveTooltip, config: Tooltip): void;
}
//# sourceMappingURL=tooltipUtils.d.ts.map