/// <reference path="./progranism/progranism.ts"/>

class Game {

    public static instance : Phaser.Game;
    
    constructor() {
        var winW = document.body.offsetWidth;
        var winH = document.body.offsetHeight;
        Game.instance = new Phaser.Game(winW,winH, Phaser.WEBGL, '', this);

        this.progranisms = new Array<Progranism>();
        this.maxProgranisms = 300;        
    }
        
    //private game: Phaser.Game;
    
    private preload() {
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
    }
    
    private update() {
       
    }
    
    
    public maxProgranisms : number;
    public progranisms : Array<Progranism>; 
   
}