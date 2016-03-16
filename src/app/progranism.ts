
class Progranism extends Phaser.Sprite{
    
    constructor(game: Phaser.Game, imageKey: string){
              
        var x= Random.int(game.width);
        var y= Random.int(game.height);
        super(game, x, y,imageKey);
        this.scale = new Phaser.Point(0.5, 0.5);
        //this.tint = 0xFF0000;
        this.alpha = 0.3;        
        game.add.existing(this);
        game.physics.arcade.enable(this);
        
        this.trail = new Array<Phaser.Sprite>();
        this.maxTrailLength = 25;
        var alphaStep = (this.alpha*0.9) / this.maxTrailLength;
        for (var i=0; i < this.maxTrailLength; i++){
            var sprite = new Phaser.Sprite(game,x,y,imageKey);
            var thisStep = (alphaStep*(i+1));
            sprite.scale = new Phaser.Point(0.5-thisStep, 0.5-thisStep);
            sprite.tint = this.tint;
            sprite.alpha = this.alpha - thisStep;
            sprite.physicsEnabled=false;
            game.add.existing(sprite);
            this.trail.push(sprite);
        }        
        
        this.positionHistory = new Array<Phaser.Point>();
        //this.nextHistoryUpdate = (new Date).getTime();
    }
    
    public update(){
            this.positionHistory = [new Phaser.Point(this.position.x, this.position.y)].concat(this.positionHistory);
            if (this.positionHistory.length > this.maxTrailLength)
                this.positionHistory.pop();            
                
            for (var i = 0; i < this.positionHistory.length; i++){
                this.trail[i].position = this.positionHistory[i];
            }
        //}
    }
    
    //private nextHistoryUpdate: number;
    private maxTrailLength: number;
    private positionHistory: Array<Phaser.Point>;
    private trail: Array<Phaser.Sprite>;
}