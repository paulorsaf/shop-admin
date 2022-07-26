import { of } from "rxjs";

export class BannersServiceMock {

    _hasSaved = false;
    _hasUpdated = false;
    _response: any;

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
        this._hasSaved = true;
        return this._response || of({});
    }

    update() {
        this._hasUpdated = true;
        return this._response || of({});
    }
    
}