import { of } from "rxjs";

export class ClientServiceMock {

    _response: any;

    find() {
        return this._response || of({});
    }
    
}