import { of } from "rxjs";

export class AuthServiceMock {
    
    _response: any;

    findCompanyByUser() {
        return this._response || of({});
    }

    login() {
        return this._response || of({});
    }

    recoverPassword() {
        return this._response || of({});
    }

    findLoggedUser() {
        return this._response || of({});
    }

    logout() {
        return this._response || of({});
    }

}