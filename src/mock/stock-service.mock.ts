import { of } from "rxjs";

export class StockServiceMock {
    
    _response: any;

    findByProductId() {
        return this._response || of({});
    }

}