import { messageCard } from './messageCard';
import { Conversation } from '../types/convesation.type';

export function chat(conversation: Conversation) {
    return `
    <div>
        <div class="chat-bot">${conversation.bot}</div>
        <div>${conversation.messages.map(message => messageCard(message)).join('')}</div>
        <input type="text" placeholder="Type a message" class="chat-input"  onkeypress="handleKeyPress(event)" />
        <button onclick="sendMessage()">Send</button>
    </div>`;
};
