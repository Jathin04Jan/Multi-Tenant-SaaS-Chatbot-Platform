import { MessageContentI } from '../../../types/messagesInternal';
import { HiddenFileAttachments } from '../input/fileAttachments/fileAttachments';
import { MessageFile, MessageFileType } from '../../../types/messageFile';
import { ServiceIO } from '../../../services/serviceIO';
import { ErrorMessageOverrides } from '../../../types/error';
import { ResponseI } from '../../../types/responseInternal';
import { ErrorResp } from '../../../types/errorInternal';
import { DemoResponse } from '../../../types/demo';
import { MessagesBase } from './messagesBase';
import { DeepChat } from '../../../deepChat';
export interface MessageElements {
    outerContainer: HTMLElement;
    innerContainer: HTMLElement;
    bubbleElement: HTMLElement;
}
export declare class Messages extends MessagesBase {
    private readonly _errorMessageOverrides?;
    private readonly _onClearMessages?;
    private readonly _onError?;
    private readonly _isLoadingMessageAllowed?;
    private readonly _permittedErrorPrefixes?;
    private readonly _displayServiceErrorMessages?;
    private _introMessage?;
    private _hiddenAttachments?;
    private _activeLoadingConfig?;
    customDemoResponse?: DemoResponse;
    constructor(deepChat: DeepChat, serviceIO: ServiceIO, panel?: HTMLElement);
    private static getDefaultDisplayLoadingMessage;
    private setLoadingToggle;
    private prepareDemo;
    private addSetupMessageIfNeeded;
    private addIntroductoryMessages;
    private addIntroductoryMessage;
    removeIntroductoryMessage(): void;
    addAnyMessage(message: ResponseI, isHistory?: boolean, isTop?: boolean): void | MessageContentI;
    private tryAddTextMessage;
    private tryAddFileMessages;
    private tryAddHTMLMessage;
    addNewMessage(data: ResponseI, isHistory?: boolean, isTop?: boolean): MessageContentI;
    private isValidMessageContent;
    private updateStateOnMessage;
    private removeMessageOnError;
    addNewErrorMessage(type: keyof Omit<ErrorMessageOverrides, 'default'>, message?: ErrorResp, isTop?: boolean): void;
    private static checkPermittedErrorPrefixes;
    private static extractErrorMessages;
    private getPermittedMessage;
    removeError(): void;
    private addDefaultLoadingMessage;
    addLoadingMessage(override?: boolean): void;
    private populateIntroPanel;
    addMultipleFiles(filesData: {
        file: File;
        type: MessageFileType;
    }[], hiddenAtts: HiddenFileAttachments): Promise<MessageFile[]>;
    static isActiveElement(bubbleClasslist?: DOMTokenList): boolean;
    private clearMessages;
}
//# sourceMappingURL=messages.d.ts.map