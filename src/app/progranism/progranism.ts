/// <reference path="../sprite/motion-sprite.ts"/>
/// <reference path="./base-attributes.ts"/>
/// <reference path="./stats.ts"/>
/// <reference path="./base-info.ts"/>
/// <reference path="./progranism-state.ts"/>

class Progranism {
    
    constructor( mother?: Progranism, father?: Progranism){           
                 
        if (mother && father)                 
            this._baseAttributes = new BaseAttributes(mother.attributes, father.attributes);
        else
            this._baseAttributes = new BaseAttributes();
        
        this._info = new BaseInfo();
        this._stats = new Stats(this._baseAttributes, this._info);
        this._state = new ProgranismState();
        this._sprite = new MotionSprite();               
    }
    private _sprite: MotionSprite; 
        
    private _baseAttributes: BaseAttributes;
    public get attributes() { return this._baseAttributes; }
    
    private _stats: Stats;
    public get stats() { return this._stats;}        
    
    private _info: BaseInfo;
    public get info() {return this._info;}
    
    private _state: ProgranismState;
    public get state() { return this._state.current; }
}