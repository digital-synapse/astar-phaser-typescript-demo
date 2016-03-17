class Random {
    
    public static get Sign() : number {
        return Random.Boolean ? -1 : 1;
    }
    
    public static get Boolean() : boolean {
        return Random.Int(1) ==1;
    }
    
    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    public static Double(max:number):number;
    public static Double(min:number, max:number):number;
    public static Double(...params:any[]):number{
        var min:number, max:number;
        if (params.length === 2){
            min=params[0];
            max=params[1];
            return Math.random() * (max - min) + min;
        }
        else if (params.length === 1){
            max=params[0];
            return Math.random()*max;
        }
        else {
            throw new ArgumentException();
        }        
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    public static Int(max:number):number;
    public static Int(min:number, max:number):number;
    public static Int(...params:any[]):number {
        var min:number, max:number;
        if (params.length === 2){
            min=params[0];
            max=params[1];
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        else if (params.length === 1){
            max=params[0];
            return Math.floor(Math.random()*(max+1));
        }
        else {
            throw new ArgumentException();
        }
    }
}