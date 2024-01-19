import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TextToSpeechService {
    private client: TextToSpeechService;

    constructor() {
        this.client = new TextToSpeechClient();
    }

    async synthesizeSpeech(requestBody) {
        const [response] = await this.client.synthesizeSpeech(requestBody);
        return response.audioContent;
    }
}