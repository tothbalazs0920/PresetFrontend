import { AuthService } from "../user/auth.service";

export class AuthServiceMock extends AuthService {

    constructor() {
        super(null);
    }

    logout() { }

    loggedIn() {
        return true;
    }
}