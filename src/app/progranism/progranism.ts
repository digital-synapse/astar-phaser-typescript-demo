/// <reference path="./homing-sprite.ts"/>
/// <reference path="./attributes.ts"/>
/// <reference path="./stats.ts"/>
/// <reference path="./info.ts"/>
/// <reference path="./enums.ts"/>

class Progranism {
    
    constructor( mother?: Progranism, father?: Progranism){           
                 
        if (mother && father)                 
            this._baseAttributes = new Attributes(mother.attributes, father.attributes);
        else
            this._baseAttributes = new Attributes();
        
        this._info = new Info();
        this._stats = new Stats(this._baseAttributes, this._info);        
        this._sprite = new HomingSprite();              
        
        this.logicUpdateHandle = setInterval(()=>{this.logicUpdate();},1000);
    }
    private _sprite: HomingSprite; 
        
    private _baseAttributes: Attributes;
    public get attributes() { return this._baseAttributes; }
    
    private _stats: Stats;
    public get stats() { return this._stats;}        
    
    private _info: Info;
    public get info() {return this._info;}
    
    private logicUpdateHandle:number;
    private logicUpdate() {
        
    }
    
    public destory() {
        clearInterval(this.logicUpdateHandle);
    }
    
}