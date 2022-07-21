export class MessageServiceMock {

    _hasShownAlert = false;
    _hasShownError = false;
    _hasShownSuccess = false;

    showAlert() {
        this._hasShownAlert = true;
    }
    showError() {
        this._hasShownError = true;
    }
    showSuccess() {
        this._hasShownSuccess = true;
    }
    
}