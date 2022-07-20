import { of } from "rxjs";

export class StockServiceMock {
    
    _isAdded = false;
    _isCreated = false;
    _response: any;

    addStock() {
        this._isAdded = true;
        return this._response || of({});
    }
    createStock() {
        this._isCreated = true;
        return this._response || of({});
    }
    findByProductId() {
        return this._response || of({});
    }
    removeStockOption() {
        return this._response || of({});
    }
    updateStockOption() {
        return this._response || of({});
    }

}