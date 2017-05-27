class CommonServiceClass {
    private userKey = 'drafts-username';
    private tokenKey = 'drafts-token';

    constructor() { }

    public getName() : string {
        return localStorage.getItem(this.userKey);
    }

    public setName(username: string) : void {
        localStorage.setItem(this.userKey, username);
    }

    public getToken() : string {
        return localStorage.getItem(this.tokenKey);
    }

    public setToken(token: string) : void {
        localStorage.setItem(this.tokenKey, token);
    }

    public clearStorage() : void {
        localStorage.removeItem(this.userKey);
        localStorage.removeItem(this.tokenKey);
    }
}

let commonServiceInstance = new CommonServiceClass();

export default commonServiceInstance;