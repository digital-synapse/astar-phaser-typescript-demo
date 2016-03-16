class Random {
    
    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    public static double(min:number, max:number) {
        return Math.random() * (max - min) + min;
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    public static int(max:number):number
    public static int(min:number, max:number):number
    public static int(...params:number[]):number {
        var min:number, max:number;
        if (params.length == 2){
            min=params[0];
            max=params[1];
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        else {
            max=params[0];
            return Math.floor(Math.random()*(max+1));
        }        
    }
}