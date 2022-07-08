import { of } from "rxjs";

export class AuthServiceMock {
    
    _response: any;

    login() {
        return this._response || of({});
    }

    recoverPassword() {
        return this._response || of({});
    }

    findLoggedUser() {
        return this._response || of({});
    }

}