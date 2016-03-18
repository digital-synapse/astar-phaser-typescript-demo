/// <reference path="../random.ts"/>

class Attributes{
    
    constructor(mother?: Attributes, father?: Attributes){
        // make child
        if (mother && father){
                            
            this._strength = this.combineAttributesOfParents(father.strength, mother.strength);
            this._intelligence = this.combineAttributesOfParents(father.intelligence, mother.intelligence);
            this._constitution = this.combineAttributesOfParents(father.constitution, mother.constitution);
            this._resistance = this.combineAttributesOfParents(father.resistance, mother.resistance);
            this._dexterity = this.combineAttributesOfParents(father.dexterity, mother.dexterity);
            this._charisma = this.combineAttributesOfParents(father.charisma, mother.charisma);
            this._wisdom = this.combineAttributesOfParents(father.wisdom, mother.wisdom);
            this._willpower = this.combineAttributesOfParents(father.willpower, mother.willpower);
            this._perception = this.combineAttributesOfParents(father.perception, mother.perception);
            this._luck = this.combineAttributesOfParents(father.luck, mother.luck); 
        }
        // adam and eve (this only happens when the simulation is first seeded)
        else {
            this._strength = Random.int(100);
            this._intelligence = Random.int(100);
            this._constitution = Random.int(100);
            this._resistance = Random.int(100);
            this._dexterity = Random.int(100);
            this._charisma = Random.int(100);
            this._wisdom = Random.int(100);
            this._willpower = Random.int(100);
            this._perception = Random.int(100);
            this._luck = Random.int(100);
        }        
    }
    
    // Base Attributes - 
    //      these are basically static values that do not change in a 
    //      progranisms lifetime. They are generated at birth.
    private _strength : number;
    public get strength() { return this._strength; }
    
    private _intelligence: number;
    public get intelligence() { return this._intelligence; }
    
    private _constitution: number;
    public get constitution() { return this._constitution; }
    
    private _resistance: number;
    public get resistance() { return this._resistance; }
    
    private _dexterity: number;
    public get dexterity() { return this._dexterity; }
    
    private _charisma: number;
    public get charisma() { return this._charisma; }
    
    private _wisdom: number;
    public get wisdom() { return this._wisdom; }
    
    private _willpower: number;
    public get willpower() { return this._willpower; }
    
    private _perception: number;
    public get perception() { return this._perception; }
    
    private _luck: number;
    public get luck() { return this._luck; }    
    
    // combine the 2 parent attributes using a randomized ratio
    // adds a small amount of random mutation 
    private combineAttributesOfParents(male:number, female:number, mutationRate:number = 0.1){
        
        // all attributes range from 0-100
        var ratio = Random.double(100);
        var attr = ((male/100)*ratio) + ((female/100) * (100-ratio));
        var mutation = Random.double(1-mutationRate, 1+mutationRate);
        var value = attr * mutation;
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        return value;
    }    
}