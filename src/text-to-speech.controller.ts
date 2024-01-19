import { Body, Controller, Post, Res } from "@nestjs/common";
import { TextToSpeechService } from "./text-to-speech.service";
import { ChatService } from "./gpt.service";

@Controller('text-to-speech')
export class TextToSpeechController {
    constructor{
        prvate readonly textToSpeechService: TextToSpeechService,
        private readonly chatService: ChatService
}

@Post('synthesize')
async synthesize(@Body('text') text: string, @Res() res: Response){
    try {
        const gptResponse = await this.chatService.chatWithGPT(text);
        const request = {
            imput: {
                text: gptResponse
            },
            voice: {
                languageCode: 'en-US',
                name: 'en-US-Wavenet-F',
                ssmlGender: 'FEMALE'
            },
            audioConfig: {
                audioEncoding: 'MP3'
            }
        };
        const audioContet = await this.textToSpeechService.synthesizeSpeech(request);

        res.createHeader('Content-Type', 'audio/mpeg')
        res.end(audioContet);

    } catch (error) {
        console.log(error);
        res.status(500).send('An error occorred while synthesizing speech: ' + error);
    }
}
}