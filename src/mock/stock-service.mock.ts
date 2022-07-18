import { of } from "rxjs";

export class StockServiceMock {
    
    _response: any;

    addStock() {
        return this._response || of({});
    }
    findByProductId() {
        return this._response || of({});
    }

}