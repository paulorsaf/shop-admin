import { of } from "rxjs";

export class CompanyServiceMock {

    _response: any;

    findById() {
        return this._response || of({});
    }
    update() {
        return this._response || of({});
    }
    updateAboutUs() {
        return this._response || of({});
    }
    updateAddress() {
        return this._response || of({});
    }
    updateLogo() {
        return this._response || of({});
    }
    
}