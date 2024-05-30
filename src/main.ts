import { login } from './pages/auth/login';
import './style.css'
import { window_function } from './scripts/window.function';

document.addEventListener('DOMContentLoaded', () => {
    window_function.init();
});

document.querySelector('#app')!.innerHTML = login();

