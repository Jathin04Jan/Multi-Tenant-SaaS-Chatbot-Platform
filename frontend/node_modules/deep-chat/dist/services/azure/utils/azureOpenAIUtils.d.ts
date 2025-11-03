import { KeyVerificationDetails } from '../../../types/keyVerificationDetails';
import { AzureOpenAI } from '../../../types/azure';
export declare const AZURE_OPEN_AI_URL_DETAILS_ERROR = "Please define the Azure URL Details. [More Information](https://deepchat.dev/docs/directConnection/Azure)";
export declare const AZURE_OPEN_AI_BUILD_HEADERS: (apiKey: string) => {
    'api-key': string;
    "Content-Type": string;
};
export declare const AZURE_OPEN_AI_BUILD_KEY_VERIFICATION_DETAILS: (urlDetails: AzureOpenAI["urlDetails"]) => KeyVerificationDetails;
export declare const AZURE_OPEN_AI_VALIDATE_URL_DETAILS: (urlDetails: AzureOpenAI["urlDetails"]) => string;
//# sourceMappingURL=azureOpenAIUtils.d.ts.map