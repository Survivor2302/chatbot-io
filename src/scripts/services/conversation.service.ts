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
            console.log(this.all_conversations)
            let conversation = this.all_conversations.find(convo => convo.bot.name  === bot.name && convo.user_id === user_id);
            if (!conversation) {
                conversation = { user_id: user_id, bot: bot, messages: [] };
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
        const conversation = this.user_conversations.find(convo => convo.bot.name  === botName);
        if (conversation) {
            return conversation;
        }
    },
     
    declare_function: function() {
        (window as any).selectContact = (botName: string) => {
            const conversation = this.user_conversations.find(convo => convo.bot.name  === botName);
            if (conversation) {
                document.querySelector('.chat-name')!.innerHTML = botName;
                document.querySelector('.chat-container')!.innerHTML = chat(conversation);
                document.querySelector('.chat-container')!.scrollTop = document.querySelector('.chat-container')!.scrollHeight;

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
            const conversation = this.user_conversations.find(convo => convo.bot.name === botName && convo.user_id === authService.get_current_user().id);

            if (message === 'help') {
                if (conversation) {
                    conversation.messages.push({ content: message, isUser: true, time: new Date() });
                    this.update_conversation(conversation);
                    document.querySelector('.chat-container')!.innerHTML = chat(conversation);
                    document.querySelector('.chat-container')!.scrollTop = document.querySelector('.chat-container')!.scrollHeight;
                }

                for (const bot of bots) {
                    const conversation = this.user_conversations.find(convo => convo.bot.name === bot.name && convo.user_id === authService.get_current_user().id);
                   if (conversation) {
                    let response = await bot.command.help();
                    conversation.messages.push({ content: response!, isUser: false, time: new Date() });
                    this.update_conversation(conversation);
                    
                    if (conversation.bot.name === botName) {
                        document.querySelector('.chat-container')!.innerHTML = chat(conversation);
                            document.querySelector('.chat-container')!.scrollTop = document.querySelector('.chat-container')!.scrollHeight;
                        }
                    }
                }
            } else {
            if (conversation) {
                conversation.messages.push({ content: message, isUser: true, time: new Date() });
                this.update_conversation(conversation);
                (document.querySelector('.chat-input') as HTMLInputElement).value = '';
                document.querySelector('.chat-container')!.innerHTML = chat(conversation);
                const bot = bots.find(bot => bot.name === conversation.bot.name);
                let response;
                if (bot) {
                    if (bot.command.hasOwnProperty(message.split(' ')[0])) {
                        const parts = message.split(' ');
                        const command = parts[0];
                        const arg1 = parts[1];
                        const arg2 = parts[2];
                        const remainingArgs = parts.slice(3).join(' '); 
                        const args = [arg1, arg2, remainingArgs]; 
                        if (bot.command.hasOwnProperty(command)) {
                            try {
                                //@ts-ignore
                                response = await bot.command[command](...args);
                                console.log(response);
                           
                            } catch (error) {
                                response = "Error executing command.";
                            }
                        } else {
                            response = "Command not found";
                        }
                } else {
                    response = 'Command not found make, ask for help';
                }
            }
            conversation.messages.push({ content: response, isUser: false, time: new Date() });
                this.update_conversation(conversation);
                document.querySelector('.chat-container')!.innerHTML = chat(conversation);
                document.querySelector('.chat-container')!.scrollTop = document.querySelector('.chat-container')!.scrollHeight;
            }
        };
        (document.querySelector('.chat-input') as HTMLInputElement).value = ''; 

    };
}
};
