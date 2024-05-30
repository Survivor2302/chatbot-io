import { login } from "../../pages/auth/login";
import { home } from "../../pages/home";
import { User } from "../../types/user.type";
import { uuidv4 } from "../uuid";
import { conversationService } from "./conversation.service";
import { localStorageService } from "./local_storage.service";

export const authService = {
    users: [] as User[],
    current_user: {} as User,

    get_current_user() {
        return this.current_user;
    },
    
    init() {
        this.retrieve_users();
    },

    declare_function: function() {
        (window as any).login= () => this.signIn();
        (window as any).signOut = () => this.signOut();
    },
    
    retrieve_users() {
        const storedUser = localStorageService.get_local_storage('users');
        if (storedUser) {
            this.users = storedUser as User[];
            this.current_user = this.users.find(user => user.isLoggedIn === true) as User || {} as User;
            if (this.current_user.isLoggedIn) {                
                document.querySelector('#app')!.innerHTML = home();
            } else {
                document.querySelector('#app')!.innerHTML = login();
            }
        }
    },

    update_users_list(user: User, signUp: boolean) {
        if (signUp) {
            this.users.push(user);
            this.current_user = user;
        } else {
            this.users = this.users.map(user => user.id === this.current_user.id ? this.current_user : user);
        }
        localStorageService.set_local_storage('users', this.users);
        document.querySelector('#app')!.innerHTML = home();
    },
    
    clear_current_user() {
        this.current_user = {} as User;
    },

    clear_users() {
        this.users = [];
    },

    clear() {
        this.clear_current_user();
        this.clear_users();
    },

    signUp(username: string, password: string) {
        const newUser = {
            id: uuidv4(),
            username: username,
            password: password,
            isLoggedIn: true,
        }
        this.update_users_list(newUser, true);
        return newUser;
    },
    
    signIn() {
        const username = (document.querySelector('#username') as HTMLInputElement).value;
        const password = (document.querySelector('#password') as HTMLInputElement).value;

        const user = this.users.find(user => user.username === username);
        if (!user) {
            this.signUp(username, password);
        }
        if (user && user.password !== password) {
            console.log('wrong password');
        }
        if (user && user.password === password) {
            this.current_user = user;
            this.current_user.isLoggedIn = true;
            this.update_users_list(this.current_user, false);
        } 
    },
    
    signOut() {
        this.current_user.isLoggedIn = false;
        //update user in users array
        this.users = this.users.map(user => user.id === this.current_user.id ? this.current_user : user);
        localStorageService.set_local_storage('users', this.users);
        this.clear_current_user();
        conversationService.clear_user_conversations();
        document.querySelector('#app')!.innerHTML = login();
    },
}
