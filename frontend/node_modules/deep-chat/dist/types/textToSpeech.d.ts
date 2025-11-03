export interface ServiceAudioResponse {
    autoPlay?: boolean;
    displayAudio?: boolean;
    displayText?: boolean;
}
export interface TextToSpeechConfig {
    lang?: string;
    pitch?: number;
    rate?: number;
    voiceName?: string;
    volume?: number;
    audio?: ServiceAudioResponse;
}
//# sourceMappingURL=textToSpeech.d.ts.map