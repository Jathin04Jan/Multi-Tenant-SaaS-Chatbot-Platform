import { FILE_TYPE } from '../../types/fileTypes';
type ServiceFileTypes = {
    [key in FILE_TYPE]: {
        id: string;
        svgString: string;
        dropupText: string;
    };
};
export declare const FILE_TYPE_BUTTON_ICONS: ServiceFileTypes;
export {};
//# sourceMappingURL=fileTypeButtonIcons.d.ts.map