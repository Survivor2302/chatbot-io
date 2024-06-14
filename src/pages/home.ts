import { contact } from '../components/contact';
import { chat } from '../components/chat';
import { conversationService } from '../scripts/services/conversation.service';

export const home = () => {
    conversationService.init();
    
    const contacts = conversationService.get_contacts();
    const conversations = conversationService.user_conversations;
    
    return `
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            height: 100vh;
        }

        #app {
            display: flex;
            width: 100%;
        }

        .contacts {
            width: 30%;
            border-right: 1px solid #ccc;
            overflow-y: auto;
            background-color: #f8f8f8;
        }

        .contacts h1 {
            padding: 10px;
            background-color: #075E54;
            color: white;
            margin: 0;
        }

        .contacts ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .contacts li {
            padding: 15px;
            cursor: pointer;
            border-bottom: 1px solid #ccc;
        }

        .contacts li:hover {
            background-color: #ddd;
        }

        .chat {
            width: 70%;
            display: flex;
            flex-direction: column;
        }

        .chat h1 {
            padding: 10px;
            background-color: #075E54;
            color: white;
            margin: 0;
        }

        .chat-container {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background-color: #ece5dd;
        }

        .chat-bot {
            font-weight: bold;
            margin-bottom: 10px;
        }

        .message-card {
            margin-bottom: 10px;
        }

        .chat-input {
            width: calc(100% - 100px);
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-right: 10px;
        }

        .chat-input-container {
            display: flex;
            padding: 10px;
            border-top: 1px solid #ccc;
            background-color: #f8f8f8;
        }

        button {
            padding: 10px 20px;
            background-color: #075E54;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #128C7E;
        }

        .test {
            display: flex;
            justify-content: space-between;
            align-items: center;
            display:column;
            background-color: #075E54;
        
        }
    </style>
    <div id="app">
      <div class="contacts">
        <h1>Contacts</h1>
        ${contact(contacts)}
      </div>
      <div class="chat">
        <div class="test">
            <h1 class="chat-name">Assistant</h1>
            <button onclick="signOut()">Logout</button>
        </div>

        <div class="chat-container">
            ${chat(conversations[0])}
        </div>
        <div class="chat-input-container">
            <input type="text" placeholder="Type a message" class="chat-input" onkeypress="handleKeyPress(event)" />
            <button onclick="sendMessage()">Send</button>
        </div>
      </div>
    </div>
    `;
};
