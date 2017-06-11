import { CustomAuthService } from "../user/auth.service";

export class CustomAuthServiceMock extends CustomAuthService {

    constructor() {
        super(null);
    }

    logout() { }

    loggedIn() {
        return true;
    }
}