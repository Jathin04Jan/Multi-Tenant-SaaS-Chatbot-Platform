import { Messages } from '../../views/chat/messages/messages';
import { Response as ResponseI } from '../../types/response';
import { RequestDetails } from '../../types/interceptors';
import { ErrorResp } from '../../types/errorInternal';
import { ServiceIO } from '../../services/serviceIO';
import { GenericObject } from '../../types/object';
import { Connect } from '../../types/connect';
import { DeepChat } from '../../deepChat';
export type InterceptorResult = RequestDetails & {
    error?: string;
};
type InterceptorResultP = Promise<InterceptorResult>;
interface RespProcessingOptions {
    io?: ServiceIO;
    useRI?: boolean;
    displayError?: boolean;
}
export declare class RequestUtils {
    static tempRemoveContentHeader(connectSettings: Connect | undefined, request: (stringifyBody?: boolean) => Promise<unknown>, stringifyBody: boolean): Promise<unknown>;
    static displayError(messages: Messages, err: ErrorResp, defMessage?: string): void;
    static fetch(io: ServiceIO, headers: GenericObject<string> | undefined, stringifyBody: boolean, body: any): Promise<Response>;
    static processResponseByType(response: Response): Response | Promise<any>;
    static processRequestInterceptor(deepChat: DeepChat, requestDetails: RequestDetails): InterceptorResultP;
    static validateResponseFormat(response: ResponseI | ResponseI[], isStreaming: boolean): boolean;
    static onInterceptorError(messages: Messages, error: string, onFinish?: () => void): void;
    static basicResponseProcessing(messages: Messages, resp: ResponseI | ResponseI[], options?: RespProcessingOptions): Promise<ResponseI | ResponseI[] | undefined>;
}
export {};
//# sourceMappingURL=requestUtils.d.ts.map