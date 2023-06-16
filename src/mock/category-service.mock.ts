import { of } from "rxjs";

export class CategoryServiceMock {
    
    _response: any;

    changeVisibility() {
        return this._response || of({});
    }
    find() {
        return this._response || of({});
    }
    findById() {
        return this._response || of({});
    }
    remove() {
        return this._response || of({});
    }
    save() {
        return this._response || of({});
    }
    update() {
        return this._response || of({});
    }

}