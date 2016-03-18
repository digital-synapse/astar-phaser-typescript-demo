/// <reference path="./enums.ts"/>
/// <reference path="./base-attributes.ts"/>
/// <reference path="./base-info.ts"/>
const ticksInYear = 10000;
class Stats {
    
    constructor( baseAttributes: Attributes, baseInfo: Info){
        this.baseAttributes = baseAttributes;
        this.baseInfo = baseInfo;           
        this.initStats();           
    }  
    private baseInfo: Info;
    private baseAttributes: Attributes;
    
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
    public get dex() {return this.baseAttributes.dexterity * this.vitality; }
    public get age() {return Date.now() - this.baseInfo.birthdate;}
    public get int() {return this.baseAttributes.intelligence * (this.age + (this.baseAttributes.luck * 0.1));}
    public get hpMax() {return this.baseAttributes.strength * (this.age + (this.baseAttributes.luck * 0.1));} 
    public get spdMax() {return this.dex + (this.baseAttributes.luck * 0.1); }
    
    private initStats(){
        var age = this.age;
        this._ageMax = (this.baseAttributes.constitution + this.baseAttributes.resistance + this.baseAttributes.wisdom + this.baseAttributes.strength + this.baseAttributes.luck) /5;
        this._hp = this.hpMax;
        this._str = this.baseAttributes.strength;
        this._spd= this.spdMax * 0.1;
    }
    
    public get yearsOld() {
        return this.age / ticksInYear;
    }   
    
    public get vitality() {
        switch (this.ageGroup){
            case AgeGroup.Baby: return 1;
            case AgeGroup.Toddler: return 2;
            case AgeGroup.Child: return 8;
            case AgeGroup.Teen: return 12;
            case AgeGroup.Adult: return 18;
            case AgeGroup.Mature: return 16;
            case AgeGroup.Old: return 8;
            case AgeGroup.Ancient: return 3;
        }    
    }
    
    public get ageGroup() {
         var age = this.yearsOld;
         
         if (age <= 0.5){ // baby
            return AgeGroup.Baby;    
         }
         else if (age <= 3){ // toddler
             return AgeGroup.Toddler;
         }
         else if (age <= 12){ // child
             return AgeGroup.Child;
         }
         else if (age <= 19){ // teen
             return AgeGroup.Teen;
         }
         else if (age <= 28){ // adult
             return AgeGroup.Adult;
         }
         else if (age <= 45){ // mature
             return AgeGroup.Mature;
         }
         else if (age <= 80){ // old
             return AgeGroup.Old;
         }
         else { // very old
             return AgeGroup.Ancient;
         }        
    }       
}