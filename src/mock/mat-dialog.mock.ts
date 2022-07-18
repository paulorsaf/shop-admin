import { of } from "rxjs";

export class MatDialogMock {
    hasOpened = false;
    response: any;
    
    open() {
        this.hasOpened = true;
        return {
            afterClosed: () => of(this.response)
        }
    }
}

export class MatDialogRefMock {
    hasClosed = false;
    close() {
        this.hasClosed = true;
    }
}