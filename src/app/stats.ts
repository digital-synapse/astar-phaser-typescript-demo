class Stats {
    
    constructor( baseAttributes: BaseAttributes){
        this.baseAttributes = baseAttributes;           
        this.calculateStats();           
    }  
    
    private baseAttributes: BaseAttributes;
    
    // Base Stats -
    //      these are dynamic values that do change during the lifetime
    //      of a progranism
    private _hp: number;    
    private _hpMax:number;
    private _age: number;
    private _ageMax: number;  // 0-100
    private _str:number;
    private _spd:number;
    private _spdMax:number;
    private _int:number;
    
    public get hp() {return this._hp;}
    public get age() {return this._age;}
    public get str() {return this._str;}
    public get spd() {return this._spd;}
    public get int() {return this._int;}
    
    
    private calculateStats(){
        if (!this._age) this._age = 0.1;
        this._ageMax = (this.baseAttributes.constitution + this.baseAttributes.resistance + this.baseAttributes.wisdom + this.baseAttributes.strength + this.baseAttributes.luck) /5;
        this._hpMax = this.baseAttributes.strength * (this._age + (this.baseAttributes.luck * 0.1));
        this._hp = this._hpMax - (this.baseAttributes.luck * 0.5) ;
        this._str = this.baseAttributes.strength;
        this._spdMax = this.baseAttributes.dexterity * (this._age + (this.baseAttributes.luck * 0.1));
        this._spd= this._spdMax * 0.1;
        this._int = this.baseAttributes.intelligence * (this._age + (this.baseAttributes.luck * 0.1));
    }
      
}