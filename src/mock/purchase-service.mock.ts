import { of } from "rxjs";

export class PurchaseServiceMock {

    _response: any;

    find() {
        return this._response || of({});
    }
    findById() {
        return this._response || of({});
    }
    sendToSystem() {
        return this._response || of({});
    }
    updateStatus() {
        return this._response || of({});
    }
    
}