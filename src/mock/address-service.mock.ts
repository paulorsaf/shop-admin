import { of } from "rxjs";

export class AddressServiceMock {

    _response: any;

    findByZipCode() {
        return this._response || of({});
    }
    
}