/// <reference path="../sprite/motion-sprite.ts"/>
/// <reference path="./base-attributes.ts"/>
/// <reference path="./stats.ts"/>

class Progranism extends MotionSprite {
    
    constructor( mother?: Progranism, father?: Progranism){   
        super();
                 
        if (mother && father)                 
            this._baseAttributes = new BaseAttributes(mother.attributes, father.attributes);
        else
            this._baseAttributes = new BaseAttributes();
        
        this._stats = new Stats(this._baseAttributes)       
    }
        
    private _baseAttributes: BaseAttributes;
    public get attributes() { return this._baseAttributes; }
    
    private _stats: Stats;
    public get stats() { return this._stats;}        
    
}