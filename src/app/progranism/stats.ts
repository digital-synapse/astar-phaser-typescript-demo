/// <reference path="./base-attributes.ts"/>
/// <reference path="./base-info.ts"/>

class Stats {
    
    constructor( baseAttributes: BaseAttributes, baseInfo: BaseInfo){
        this.baseAttributes = baseAttributes;
        this.baseInfo = baseInfo;           
        this.initStats();           
    }  
    private baseInfo: BaseInfo;
    private baseAttributes: BaseAttributes;
    
    // Base Stats -
    //      these are dynamic values that do change during the lifetime
    //      of a progranism
    private _hp: number;    
    private _hpMax:number;    
    private _ageMax: number;  // 0-100
    private _str:number;
    private _spd:number;
    private _int:number;
    
    public get hp() {return this._hp;}    
    public get str() {return this._str;}
    public get spd() {return this._spd;}
    
    public get age() {return Date.now() - this.baseInfo.birthdate;}
    public get int() {return this.baseAttributes.intelligence * (this.age + (this.baseAttributes.luck * 0.1));}
    public get hpMax() {return this.baseAttributes.strength * (this.age + (this.baseAttributes.luck * 0.1));} 
    public get spdMax() {return this.baseAttributes.dexterity * (this.age + (this.baseAttributes.luck * 0.1)); }
    
    private initStats(){
        var age = this.age;
        this._ageMax = (this.baseAttributes.constitution + this.baseAttributes.resistance + this.baseAttributes.wisdom + this.baseAttributes.strength + this.baseAttributes.luck) /5;
        this._hp = this.hpMax;
        this._str = this.baseAttributes.strength;
        this._spd= this.spdMax * 0.1;
    }
      
}