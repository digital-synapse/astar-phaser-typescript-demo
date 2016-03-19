/// <reference path="./progranism/progranism.ts"/>
/// <reference path="./food/food.ts"/>

class Game {

    public static instance : Phaser.Game;
    
    constructor() {
        var winW = document.body.offsetWidth;
        var winH = document.body.offsetHeight;
        Game.instance = new Phaser.Game(winW,winH, Phaser.WEBGL, '', this);

        this.progranisms = new Array<Progranism>();
        this.maxProgranisms = 1000;    
        this.food = new Array<Food>();    
        this.maxFood = 3;
    }
        
    //private game: Phaser.Game;
    
    private preload() {
        Game.instance.load.image('food', '../assets/food.png');
        Game.instance.load.image('progranism', '../assets/sphere.png');
    }
    
    private create() {
        Game.instance.scale.setExactFit();
        Game.instance.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        Game.instance.physics.startSystem(Phaser.Physics.ARCADE);
        
        for (var i=0; i < this.maxProgranisms; i++){
            var p = new Progranism(); 
            this.progranisms.push(p);
        }
        
        /*
        for (var i=0; i < this.maxFood; i++){
            var f= new Food();
            this.food.push(f);
        }
        */
    }
    
    private update() {
       
    }
    
    public maxFood: number;
    public food: Array<Food>;
    public maxProgranisms : number;
    public progranisms : Array<Progranism>; 
   
}