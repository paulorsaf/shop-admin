import { of } from "rxjs";

export class ProductServiceMock {
    
    _isSaved = false;
    _isUpdated = false;
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
        this._isSaved = true;
        return this._response || of({});
    }
    update() {
        this._isUpdated = true;
        return this._response || of({});
    }
    removeImage() {
        return this._response || of({});
    }
    uploadImage() {
        return this._response || of({});
    }
    uploadProducts() {
        return this._response || of({});
    }

}