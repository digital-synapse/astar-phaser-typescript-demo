/// <reference path="./enums.ts"/>

class Info {
    
    constructor() {
        
        this._birthdate = Date.now();
    }
    private _birthdate: number;
    public get birthdate() { return this._birthdate; }
    
    private _state: State;
    public get state() { return this._state; }
    
    private _activity: Activity;
    public get activity() {return this._activity; }
}