export interface GCPTextToSpeechConfig {
    voice?: {
        languageCode?: string;
        name?: string;
        ssmlGender?: 'MALE' | 'FEMAL' | 'NEUTRAL';
        customVoice?: {
            model: string;
        };
    };
    audio?: {
        audioEncoding?: 'MP3' | 'LINEAR16' | 'OGG_OPUS' | 'MULAW' | 'ALAW';
        speakingRate?: number;
        pitch?: number;
        volumeGainDb?: number;
        sampleRateHertz?: number;
        effectsProfileId?: string[];
    };
}
export interface GCP {
    textToSpeech?: true | GCPTextToSpeechConfig;
}
//# sourceMappingURL=GCP.d.ts.map