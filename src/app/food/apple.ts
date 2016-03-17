/// <reference path="./food.ts"/>
class Apple extends Food {
    
    constructor() {
        super();
        
        this._calories = 65;
        this._fat = 0;
        this._carbohydrates = 17;
        this._protien = 0;
        this._vitaminA = 1;
        this._vitaminC = 10;
        this._calcium = 1;
        this._iron = 1;
    }
    
}