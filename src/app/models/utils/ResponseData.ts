export class ResponseData<T> {
    public statusHttp: Boolean;
    public title: String;
    public message: String;
    public data: T;
    constructor() {
    }
}