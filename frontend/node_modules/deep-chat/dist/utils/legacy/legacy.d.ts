import { MessageContent, MessageStyles } from '../../types/messages';
import { FilesServiceConfig } from '../../types/fileServiceConfigs';
import { ValidateInput } from '../../types/validateInput';
import { HTMLWrappers, Stream } from '../../types/stream';
import { FocusMode } from '../../types/focusMode';
import { Cohere } from '../../types/cohere';
import { DeepChat } from '../../deepChat';
import { Demo } from '../../types/demo';
export declare class Legacy {
    static checkForContainerStyles(deepChat: DeepChat, containerRef: HTMLElement): void;
    static handleResponseProperty(result: any | Response): any;
    static processHistory(deepChat: DeepChat): MessageContent[] | undefined;
    static processHistoryFile(message: MessageContent): void;
    static processValidateInput(deepChat: DeepChat): ValidateInput | undefined;
    static processSubmitUserMessage(content: string): {
        text: string;
    };
    static flagHTMLUpdateClass(bubbleElement: HTMLElement): void;
    static processConnect(deepChat: DeepChat): void;
    static checkForStream(deepChat: DeepChat): true | import('../../types/stream').StreamConfig | undefined;
    static fireOnNewMessage(deepChat: DeepChat, updateBody: {
        message: MessageContent;
        isHistory: boolean;
    }): void;
    static processFileConfigConnect(config: FilesServiceConfig): void;
    static processMessageStyles(messageStyles?: MessageStyles): any;
    static processDemo(demo: Demo): true | {
        response?: import('../../types/demo').DemoResponse;
        displayErrors?: import('../../types/demo').DemoErrors;
        displayLoading?: import('../../types/demo').DemoLoading;
        displayFileAttachmentContainer?: boolean;
    };
    static processCohere(cohere: Cohere): boolean;
    static processStreamHTMLWrappers(stream?: Stream): HTMLWrappers | undefined;
    static processFocusMode(focusMode?: FocusMode): boolean | {
        smoothScroll?: boolean;
        streamAutoScroll?: boolean;
        fade?: import('../../types/focusMode').FocusModeFade;
    } | undefined;
}
//# sourceMappingURL=legacy.d.ts.map