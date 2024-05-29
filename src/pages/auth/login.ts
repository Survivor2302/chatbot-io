import { authService } from "../../scripts/services/auth.service";

export const login = () => {
    authService.init();
    function handleLogin() {
        const username = (document.querySelector('#username') as HTMLInputElement).value;
        const password = (document.querySelector('#password') as HTMLInputElement).value;
        authService.signIn(username, password);
    }
    (window as any).handleLogin = handleLogin;

    return `
        <h1>Login</h1>
        <form>
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div>
                <button onclick="handleLogin()">Sign In</button>
            </div>
        </form>
    `;
}

