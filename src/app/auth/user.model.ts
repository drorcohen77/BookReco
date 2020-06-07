export  class User {
    constructor(
        public email: string,
        public idToken: string,
        private _Token: string,
        private _expiresIn: Date
    ) {}

    get token() {
        if(!this._expiresIn || new Date() > this._expiresIn) {
            return null;
        }
        return this._Token;
    }

}