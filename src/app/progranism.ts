class Progranism extends MotionSprite {
    
    constructor( mother?: Progranism, father?: Progranism){   
        super();
        
        // make child
        if (mother && father){
                            
            this.strength = this.combineAttributesOfParents(father.Strength, mother.Strength);
            this.intelligence = this.combineAttributesOfParents(father.Intelligence, mother.Intelligence);
            this.constitution = this.combineAttributesOfParents(father.Constitution, mother.Constitution);
            this.resistance = this.combineAttributesOfParents(father.Resistance, mother.Resistance);
            this.dexterity = this.combineAttributesOfParents(father.Dexterity, mother.Dexterity);
            this.charisma = this.combineAttributesOfParents(father.Charisma, mother.Charisma);
            this.wisdom = this.combineAttributesOfParents(father.Wisdom, mother.Wisdom);
            this.willpower = this.combineAttributesOfParents(father.Willpower, mother.Willpower);
            this.perception = this.combineAttributesOfParents(father.Perception, mother.Perception);
            this.luck = this.combineAttributesOfParents(father.Luck, mother.Luck); 
        }
        // adam and eve (this only happens when the simulation is first seeded)
        else {
            this.strength = Random.Int(100);
            this.intelligence = Random.Int(100);
            this.constitution = Random.Int(100);
            this.resistance = Random.Int(100);
            this.dexterity = Random.Int(100);
            this.charisma = Random.Int(100);
            this.wisdom = Random.Int(100);
            this.willpower = Random.Int(100);
            this.perception = Random.Int(100);
            this.luck = Random.Int(100);
        }            
    }
        
    // Base Attributes --------------------------
    private strength : number;
    private intelligence: number;
    private constitution: number;
    private resistance: number;
    private dexterity: number;
    private charisma: number;
    private wisdom: number;
    private willpower: number;
    private perception: number;
    private luck: number;
    
    public get Strength(): number{
        return this.strength;
    }
    public get Intelligence(): number{
        return this.intelligence;
    }
    public get Constitution(): number {
        return this.constitution;
    }
    public get Resistance(): number {
        return this.resistance;
    }
    public get Dexterity(): number {
        return this.dexterity;
    }
    public get Charisma(): number {
        return this.charisma;
    }
    public get Wisdom(): number {
        return this.wisdom;
    }
    public get Willpower(): number {
        return this.willpower;
    }
    public get Perception(): number {
        return this.perception;
    }
    public get Luck(): number {
        return this.luck;
    }
    
    // combine the 2 parent attributes using a randomized ratio
    // adds a small amount of random mutation 
    private combineAttributesOfParents(male:number, female:number, mutationRate:number = 0.1){
        
        // all attributes range from 0-100
        var ratio = Random.Double(100);
        var attr = ((male/100)*ratio) + ((female/100) * (100-ratio));
        var mutation = Random.Double(1-mutationRate, 1+mutationRate);
        var value = attr * mutation;
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        return value;
    }
}