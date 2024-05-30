import { authService } from "./services/auth.service";
import { localStorageService } from "./services/local_storage.service";

export const window_function = {
    init(){
        localStorageService.declare_function();
        authService.declare_function();
    }
}
