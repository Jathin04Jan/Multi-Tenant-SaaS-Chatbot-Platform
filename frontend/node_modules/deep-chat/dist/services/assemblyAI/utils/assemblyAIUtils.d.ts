import { KeyVerificationDetails } from '../../../types/keyVerificationDetails';
export declare const ASSEMBLY_AI_POLL: (api_token: string, audio_url: string) => Promise<{
    text: string;
}>;
export declare const ASSEMBLY_AI_BUILD_HEADERS: (key: string) => {
    Authorization: string;
    "Content-Type": string;
};
export declare const ASSEMBLY_AI_BUILD_KEY_VERIFICATION_DETAILS: () => KeyVerificationDetails;
//# sourceMappingURL=assemblyAIUtils.d.ts.map