export class ActivatedRouteMock {
    value = "";

    snapshot = {
        paramMap: {
            get: () => this.value
        }
    }
}