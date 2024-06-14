import { messageCard } from './cards/message.card';
import { Conversation } from '../types/convesation.type';

export function chat(conversation: Conversation) {
    return `
    <div>
        <div class="chat-bot" style="display: none;">${conversation.bot.name}</div>

        <div>${conversation.messages.map(message => messageCard(message)).join('')}</div>
    </div>`;
};
