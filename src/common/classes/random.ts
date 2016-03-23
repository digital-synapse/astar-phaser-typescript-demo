/// <reference path="./exceptions.ts"/>
class Random {
    
    public static get sign() : number {
        return Random.boolean ? -1 : 1;
    }
    
    public static get boolean() : boolean {
        return Random.int(1) ==1;
    }
    
    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    public static double(max:number):number;
    public static double(min:number, max:number):number;
    public static double(...params:any[]):number{
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
    public static int(max:number):number;
    public static int(min:number, max:number):number;
    public static int(...params:any[]):number {
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