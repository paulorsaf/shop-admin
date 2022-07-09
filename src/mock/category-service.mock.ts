import { of } from "rxjs";

export class CategoryServiceMock {
    
    _response: any;

    find() {
        return this._response || of({});
    }
    findById() {
        return this._response || of({});
    }

}