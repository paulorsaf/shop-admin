import { of } from "rxjs";

export class ProductServiceMock {
    
    _response: any;

    find() {
        return this._response || of({});
    }
    findById() {
        return this._response || of({});
    }
    save() {
        return this._response || of({});
    }

}