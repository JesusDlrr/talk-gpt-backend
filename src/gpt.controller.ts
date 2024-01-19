import { Body, Controller, Post } from "@nestjs/common";
import { ChatService } from "./gpt.service";

@Controller('chat')
export class ChatController {
    constructor(private, readonly, chatService: ChatService) { }

    @Post
    async talkGPT(@Body('content') content: string) {
        return this.chatService.chatWithGPT(content);
    }
}