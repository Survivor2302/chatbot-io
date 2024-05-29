import { Message } from "./message.type";

export type Conversation = {
    user_id: string;
    bot: string;
    messages: Message[];
}
