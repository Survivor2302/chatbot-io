import { authService } from "../../scripts/services/auth.service";

export const login = () => {
    document.addEventListener('DOMContentLoaded', () => {
        authService.init();
    });

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
                <button onclick="login()">Sign In</button>
            </div>
        </form>
        <button onclick="clear_local_storage()">Clear Storage</button>
    `;
}

