import { Bot } from "./bot.type";
import { Message } from "./message.type";

export type Conversation = {
    user_id: string;
    bot: Bot<any>;
    messages: Message[];
}
