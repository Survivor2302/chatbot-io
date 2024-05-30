import { contact } from '../components/contact';
import { chat } from '../components/chat';
import { conversationService } from '../scripts/services/conversation.service';


export const home = () => {
    conversationService.init();
    
    const contacts = conversationService.get_contacts();
    const conversations = conversationService.user_conversations;
   
    
    return `
    <div style="display: flex;">
      <div style="flex: 1; padding-right: 20px;">
        <h1>Contacts</h1>
        ${contact(contacts)}
      </div>
      <div style="flex: 2;" class="chat">
        <h1>Chat</h1>
        <div class="chat-container">
            ${chat(conversations[0])}
        </div>
      </div>
      <div>
        <button onclick="signOut()">Sign Out</button>
      </div>
    </div>
    `;
    };
    
    