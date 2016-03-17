class BaseInfo {
    
    constructor() {
        
        this._birthdate = Date.now();
    }
    private _birthdate: number;
    public get birthdate() { return this._birthdate; }
}