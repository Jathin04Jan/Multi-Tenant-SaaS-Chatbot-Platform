import { CameraFilesServiceConfig, FilesServiceConfig, MicrophoneFilesServiceConfig } from '../types/fileServiceConfigs';
import { IWebsocketHandler } from '../utils/HTTP/customHandler';
import { Messages } from '../views/chat/messages/messages';
import { InterfacesUnion } from '../types/utilityTypes';
import { FILE_TYPE } from '../types/fileTypes';
import { Response } from '../types/response';
import { Connect } from '../types/connect';
import { Signals } from '../types/handler';
import { Stream } from '../types/stream';
import { DeepChat } from '../deepChat';
import { Demo } from '../types/demo';
export interface RequestContents {
    text?: string;
    files?: File[];
}
export type PollResult = Promise<InterfacesUnion<Response | {
    timeoutMS: number;
}>>;
export interface CompletionsHandlers {
    onFinish: () => void;
}
export interface StreamHandlers {
    onOpen: () => void;
    onClose: () => void;
    onAbort?: () => void;
    stopClicked: Signals['stopClicked'];
    simulationInterim?: number;
}
export interface KeyVerificationHandlers {
    onSuccess: () => void;
    onFail: (message: string) => void;
    onLoad: () => void;
}
export type FileServiceIO = FilesServiceConfig & {
    infoModalTextMarkUp?: string;
};
export type CustomErrors = string[];
export type ServiceFileTypes = {
    [key in FILE_TYPE]?: FileServiceIO;
};
export interface ServiceIO {
    key?: string;
    validateKeyProperty: boolean;
    insertKeyPlaceholderText?: string;
    keyHelpUrl?: string;
    url?: string;
    websocket?: WebSocket | 'pending' | IWebsocketHandler;
    completionsHandlers: CompletionsHandlers;
    streamHandlers: StreamHandlers;
    isTextInputDisabled?: boolean;
    textInputPlaceholderText?: string;
    fileTypes: ServiceFileTypes;
    camera?: CameraFilesServiceConfig;
    recordAudio?: MicrophoneFilesServiceConfig;
    messages?: Messages;
    connectSettings: Connect;
    permittedErrorPrefixes?: CustomErrors;
    canSendMessage: (text?: string, files?: File[], isProgrammatic?: boolean) => boolean;
    verifyKey(key: string, keyVerificationHandlers: KeyVerificationHandlers): void;
    callAPI(requestContents: RequestContents, messages: Messages): Promise<void>;
    extractResultData?(result: object, previousBody?: object): Promise<Response>;
    extractPollResultData?(result: object): PollResult;
    demo?: Demo;
    stream?: Stream;
    deepChat: DeepChat;
    isDirectConnection(): boolean;
    isWebModel(): boolean;
    isCustomView(): boolean;
    isSubmitProgrammaticallyDisabled?: boolean;
    sessionId?: string;
    fetchHistory?: () => Promise<Response[]> | Response[];
    asyncCallInProgress?: boolean;
    onInput?: (isUser: boolean) => void;
}
//# sourceMappingURL=serviceIO.d.ts.map