import { authService } from "./auth.service";
import { conversationService } from "./conversation.service";

export const localStorageService = {

    declare_function() {
        (window as any).clear_local_storage = () => this.clear_local_storage();
    },
    
    clear_local_storage() {
        conversationService.clear();
        authService.clear();
        localStorage.clear();
    },

    get_local_storage(key: string) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },

    set_local_storage(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    },

};
