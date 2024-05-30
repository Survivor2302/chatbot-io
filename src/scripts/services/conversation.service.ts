import { chat } from "../../components/chat";
import { Conversation } from "../../types/convesation.type";
import { bots } from "../bots";
import { authService } from "./auth.service";
import { localStorageService } from "./local_storage.service";

export const conversationService = {

    user_conversations: [] as Conversation[],
    all_conversations: [] as Conversation[],

    init() {
        this.initialize_conversations();
        this.declare_function();
    },
    
    initialize_conversations() {
        if (this.all_conversations.length === 0) {
            this.retrieve_all_conversations_from_local_storage();
        }
        this.create_or_retrieve_user_bot_conversation(authService.get_current_user().id);
    },

    retrieve_all_conversations_from_local_storage() {
        const storedConversations = localStorageService.get_local_storage('conversations');
        if (storedConversations) {
            let conversations = storedConversations as Conversation[];
            this.all_conversations = conversations;
        }
    },
    
    create_or_retrieve_user_bot_conversation(user_id: string) {
        for (const bot of bots) {
            let conversation = this.all_conversations.find(convo => convo.bot  === bot.name && convo.user_id === user_id);
            if (!conversation) {
                conversation = { user_id: user_id, bot: bot.name, messages: [] };
                this.update_conversation(conversation);
            }
            this.user_conversations.push(conversation); 
        }
    },
    
    update_conversation(conversation: Conversation) {
        const current_onversation = this.all_conversations.find(convo => convo.bot === conversation.bot && convo.user_id === conversation.user_id);
        if (current_onversation) {
            current_onversation.messages = conversation.messages;
        }else{
            this.all_conversations.push(conversation);
        }
        localStorageService.set_local_storage('conversations', this.all_conversations);
    },
    
    get_contacts() {
        return this.user_conversations.map(conversation => conversation.bot);
    },
    
    clear_user_conversations() {
        this.user_conversations = [];
    },
    
    clear_all_conversations() {
        this.all_conversations = [];
    },
    
    clear(){
        this.clear_user_conversations();
        this.clear_all_conversations();
    },
    
    select_contact(botName: string){
        const conversation = this.user_conversations.find(convo => convo.bot  === botName);
        if (conversation) {
            return conversation;
        }
    },
    
    //TODO: separate the function
 
    declare_function: function() {
        (window as any).selectContact = (botName: string) => {
            const conversation = this.user_conversations.find(convo => convo.bot  === botName);
            if (conversation) {
                document.querySelector('.chat-container')!.innerHTML = chat(conversation);
            }
        };
        
        (window as any).handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                (window as any).sendMessage();
            } 
        };
        
        (window as any).sendMessage = async () => {
            const message = (document.querySelector('.chat-input') as HTMLInputElement).value;
            const botName = (document.querySelector('.chat-bot') as HTMLDivElement).innerHTML;
            const conversation = this.user_conversations.find(convo => convo.bot === botName && convo.user_id === authService.get_current_user().id);
            if (conversation) {
                conversation.messages.push({ content: message, isUser: true, time: new Date() });
                this.update_conversation(conversation);
                (document.querySelector('.chat-input') as HTMLInputElement).value = ''; // Clear input after sending
                document.querySelector('.chat-container')!.innerHTML = chat(conversation);
                const bot = bots.find(bot => bot.name === conversation.bot);
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
                                response = "Error executing command.";
                            }
                        } else {
                            response = "Command not found";
                        }
                }
            }
            conversation.messages.push({ content: response, isUser: false, time: new Date() });
            this.update_conversation(conversation);
            document.querySelector('.chat-container')!.innerHTML = chat(conversation);
        };
    };
}
};
