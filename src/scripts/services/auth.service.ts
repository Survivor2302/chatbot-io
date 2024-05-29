import { login } from "../../pages/auth/login";
import { home } from "../../pages/home";
import { User } from "../../types/user.type";
import { uuidv4 } from "../uuid";

export const authService = {
    users: [] as User[],
    myUser: {} as User,

    getMyUser() {
        return this.myUser;
    },

    init() {
        const storedUser = localStorage.getItem('users');
        if (storedUser) {
            this.users = JSON.parse(storedUser) as User[];
        }
        this.declareFunction();
    },

    declareFunction: function() {
        (window as any).login= (username: string, password: string) => this.signIn(username, password);
        (window as any).signOut = () => this.signOut();
    },
    


    signUp(username: string, password: string) {
        const newUser = {
            id: uuidv4(),
            username: username,
            password: password,
        }
        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        return newUser;
    },
    
    signIn(username: string, password: string) {
        const user = this.users.find(user => user.username === username && user.password === password);
        if (user) {
            this.myUser = user;
        } else {
            this.myUser = this.signUp(username, password);
        }
        console.log(this.myUser);
        document.querySelector('#app')!.innerHTML = home();
    },

    signOut() {
        this.myUser = {} as User;
        document.querySelector('#app')!.innerHTML = login();
    },
    

        

}
