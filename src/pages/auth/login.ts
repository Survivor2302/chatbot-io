import { authService } from "../../scripts/services/auth.service";

export const login = () => {
    document.addEventListener('DOMContentLoaded', () => {
        authService.init();
    });
    
    return `
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f2f5;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .login-container {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                width: 300px;
                text-align: center;
            }
            .login-container h1 {
                margin-bottom: 20px;
                color: #333;
            }
            .login-container form div {
                margin-bottom: 15px;
            }
            .login-container label {
                display: block;
                margin-bottom: 5px;
                color: #555;
            }
            .login-container input {
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            .login-container button {
                width: 100%;
                padding: 10px;
                background-color: #007bff;
                border: none;
                border-radius: 4px;
                color: #fff;
                font-size: 16px;
                cursor: pointer;
            }
            .login-container button:hover {
                background-color: #0056b3;
            }
            .login-container .clear-storage {
                margin-top: 10px;
                background-color: #dc3545;
            }
            .login-container .clear-storage:hover {
                background-color: #c82333;
            }
        </style>
        <div class="login-container">
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
                    <button type="button" onclick="login()">Sign In</button>
                </div>
            </form>
            <button class="clear-storage" type="button" onclick="clear_local_storage()">Clear Storage</button>
        </div>
    `;
}
