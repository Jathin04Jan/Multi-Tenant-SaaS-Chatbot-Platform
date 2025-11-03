import { KeyVerificationDetails } from '../../../types/keyVerificationDetails';
import { ServiceIO } from '../../serviceIO';
export declare const OPEN_AI_FUNCTION_TOOL_RESP_ERROR: string;
export declare const OPEN_AI_FUNCTION_TOOL_RESP_ARR_ERROR = "Arrays are not accepted in handler responses";
export declare const OPEN_AI_BUILD_HEADERS: (key: string) => {
    Authorization: string;
    "Content-Type": string;
};
export declare const OPEN_AI_HANDLE_VERIFICATION_RESULT: (result: object, key: string, onSuccess: (key: string) => void, onFail: (message: string) => void) => void;
export declare const OPEN_AI_BUILD_KEY_VERIFICATION_DETAILS: () => KeyVerificationDetails;
export declare const OPEN_AI_DIRECT_FETCH: (serviceIO: ServiceIO, body: any, method: "POST" | "GET", stringify?: boolean) => Promise<any>;
//# sourceMappingURL=openAIUtils.d.ts.map