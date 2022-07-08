export class MessageServiceMock {

    _hasShownError = false;
    _hasShownSuccess = false;

    showError() {
        this._hasShownError = true;
    }
    
    showSuccess() {
        this._hasShownSuccess = true;
    }
    
}