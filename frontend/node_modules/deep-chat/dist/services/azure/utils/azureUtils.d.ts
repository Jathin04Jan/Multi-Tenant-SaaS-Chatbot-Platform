import { KeyVerificationDetails } from '../../../types/keyVerificationDetails';
import { GenericObject } from '../../../types/object';
export declare const AZURE_SUBSCRIPTION_KEY_HELP_URL = "https://learn.microsoft.com/en-us/azure/api-management/api-management-subscriptions#create-and-manage-subscriptions-in-azure-portal";
export declare const AZURE_BUILD_TEXT_TO_SPEECH_HEADERS: (outputFormat: string, key: string) => {
    "Ocp-Apim-Subscription-Key": string;
    "Content-Type": string;
    'X-Microsoft-OutputFormat': string;
};
export declare const AZURE_BUILD_SPEECH_TO_TEXT_HEADERS: (key: string) => {
    "Ocp-Apim-Subscription-Key": string;
    Accept: string;
};
export declare const AZURE_BUILD_SPEECH_KEY_VERIFICATION_DETAILS: (region: string) => KeyVerificationDetails;
export declare const AZURE_BUILD_SUMMARIZATION_HEADER: (key: string) => {
    "Ocp-Apim-Subscription-Key": string;
    "Content-Type": string;
};
export declare const AZURE_BUILD_LANGUAGE_KEY_VERIFICATION_DETAILS: (endpoint: string) => KeyVerificationDetails;
export declare const AZURE_BUILD_TRANSLATION_KEY_VERIFICATION_DETAILS: (region?: string) => KeyVerificationDetails;
export declare const AZURE_BUILD_TRANSLATION_HEADERS: (region: string | undefined, key: string) => GenericObject<string>;
//# sourceMappingURL=azureUtils.d.ts.map