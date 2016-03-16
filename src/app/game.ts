
class Game implements IResizeable {

    constructor() {
        var winW = document.body.offsetWidth;
        var winH = document.body.offsetHeight;
        this.game = new Phaser.Game(winW,winH, Phaser.WEBGL, '', this);
        
        Component(this).resizable(50);
        this.progranisms = new Array<Progranism>();
        this.maxProgranisms = 300;        
    }
        
    private game: Phaser.Game;
    
    private preload() {
        this.game.load.image('sphere', '../assets/sphere.png');
    }
    
    private create() {
        /*
        var text = "Hello World!";
        var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
        this.game.add.text(0, 0, text, style);
        */
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        for (var i=0; i < this.maxProgranisms; i++){
            this.progranisms.push(new Progranism(this.game, 'sphere'));
        }
        
    }
    
    private pointerWasDown:boolean = false;
    private update() {
        if (this.game.input.mousePointer.isDown){
            for (var i = 0; i < this.progranisms.length; i++){
                var p = this.progranisms[i];
                p.body.moves =true;
                //this.game.physics.arcade.moveToPointer(p,200);
                var x = Random.int(this.game.input.mousePointer.clientX-150, this.game.input.mousePointer.clientX+150);
                var y = Random.int(this.game.input.mousePointer.clientY-150, this.game.input.mousePointer.clientY+150);
                this.game.physics.arcade.moveToXY(p, x,y,250);   
            }
        }
        if (this.pointerWasDown && !this.game.input.mousePointer.isDown) {
        //else {
            for (var i = 0; i < this.progranisms.length; i++){
                //this.game.physics.arcade.moveToXY(this.progranisms[i], Random.int(this.game.width), Random.int(this.game.height),200);                //this.progranisms[i].body.velocity.x = 0;
                //this.progranisms[i].body.velocity.y = 0;
                var p = this.progranisms[i];
                p.body.moves =false;
                var t = this.game.add.tween(p.position);
                t.to({x:Random.int(this.game.width), y:Random.int(this.game.height)}, 2500, Phaser.Easing.Linear.None);
                t.onComplete.add(()=>{
                   p.body.velocity.y = 0; 
                   p.body.velocity.x = 0;
                   p.body.moves =true;
                });
                t.start();
            }            
        }    
        this.pointerWasDown = this.game.input.mousePointer.isDown;
    }
    
    
    public maxProgranisms : number;
    public progranisms : Array<Progranism>; 
   
    public resize(w:number, h:number){
        this.game.width = w;
        this.game.height = h;        
        this.game.renderer.resize(w,h);               
    }
   
}