class BaseAttributes{
    
    constructor(mother?: BaseAttributes, father?: BaseAttributes){
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
    private _intelligence: number;
    private _constitution: number;
    private _resistance: number;
    private _dexterity: number;
    private _charisma: number;
    private _wisdom: number;
    private _willpower: number;
    private _perception: number;
    private _luck: number;
    
    public get strength(): number{
        return this._strength;
    }
    public get intelligence(): number{
        return this._intelligence;
    }
    public get constitution(): number {
        return this._constitution;
    }
    public get resistance(): number {
        return this._resistance;
    }
    public get dexterity(): number {
        return this._dexterity;
    }
    public get charisma(): number {
        return this._charisma;
    }
    public get wisdom(): number {
        return this._wisdom;
    }
    public get willpower(): number {
        return this._willpower;
    }
    public get perception(): number {
        return this._perception;
    }
    public get luck(): number {
        return this._luck;
    }    
    
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