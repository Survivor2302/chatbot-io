import { chat } from "../../components/chat";
import { Conversation } from "../../types/convesation.type";
import { assistantBot } from "../bots/assistant.bot";
import { weatherBot } from "../bots/weather.bot";
import { authService } from "./auth.service";
// import { uuidv4 } from "./uuid";
export const conversationService = {
    
    bots: [assistantBot, weatherBot],
    
    conversations: [] as Conversation[],

    init() {
        this.initializeConversations();
        this.declareFunction();
    },
    
    initializeConversations() {
        const storedConversations = localStorage.getItem('conversations');
        if (storedConversations) {
            const conversations = JSON.parse(storedConversations) as Conversation[];
            this.conversations = conversations.filter(conversation => conversation.user_id === authService.getMyUser().id);
        } else {
            this.conversations = [
                { user_id: authService.getMyUser().id, bot: assistantBot.name, messages: [] },
                { user_id: authService.getMyUser().id, bot: weatherBot.name, messages: [] },
            ];
            localStorage.setItem('conversations', JSON.stringify(this.conversations));
        }
    },
    
    
    getContacts() {
        return this.conversations.map(conversation => conversation.bot);
    },
    
    declareFunction: function() {

        (window as any).selectContact = (botName: string) => {
            const conversation = this.conversations.find(convo => convo.bot  === botName);
            if (conversation) {
                document.querySelector('.chat-container')!.innerHTML = chat(conversation);
            }
        };
        
        (window as any).handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                console.log('Enter');
                (window as any).sendMessage();
            } 
        };
        
        (window as any).sendMessage = async () => {
            console.log('sendMessage');
            const message = (document.querySelector('.chat-input') as HTMLInputElement).value;
            const botName = (document.querySelector('.chat-bot') as HTMLDivElement).innerHTML;
            const conversation = this.conversations.find(convo => convo.bot === botName && convo.user_id === authService.getMyUser().id);
            if (conversation) {
                conversation.messages.push({ content: message, isUser: true, time: new Date() });
                (document.querySelector('.chat-input') as HTMLInputElement).value = ''; // Clear input after sending
                document.querySelector('.chat-container')!.innerHTML = chat(conversation);
                const bot = this.bots.find(bot => bot.name === conversation.bot);
                let response;
                if (bot) {
                    // Ensure the command exists in the bot's command object
                    if (bot.command.hasOwnProperty(message.split(' ')[0])) {
                        // Extract the command and the expression from the message
                        const parts = message.split(' ');
                        const command = parts[0];
                        const arg1 = parts[1]; // Premier argument
                        const arg2 = parts[2]; // Deuxième argument
                        const remainingArgs = parts.slice(3).join(' '); // Regroupe le reste en un seul argument

                        const args = [arg1, arg2, remainingArgs]; // Crée un tableau avec les trois arguments

                        if (bot.command.hasOwnProperty(command)) {
                            try {
                                // Call the command function dynamically with all arguments
                                response = await bot.command[command](...args);
                            } catch (error) {
                                console.error('Error executing command:', error);
                                response = "Error executing command.";
                            }
                        } else {
                            response = "Command not found";
                        }
                }
            }
            conversation.messages.push({ content: response, isUser: false, time: new Date() });
            localStorage.setItem('conversations', JSON.stringify(this.conversations));
            document.querySelector('.chat-container')!.innerHTML = chat(conversation);

        };
    }
}
};
