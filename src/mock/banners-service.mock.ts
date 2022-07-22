import { of } from "rxjs";

export class BannersServiceMock {

    _response: any;

    find() {
        return this._response || of({});
    }
    
}