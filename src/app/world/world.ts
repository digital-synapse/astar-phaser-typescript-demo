class World extends Phaser.Group {
    
    constructor(game: Phaser.Game) {
        super(game);
        
        game.scale.setExactFit();
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.time.advancedTiming = true;
        var world= new Phaser.Sprite(game,0,0,'world_tiles');        
        game.world.setBounds(0,0,world.width,world.height);                
        world.inputEnabled=true;
        world.events.onInputDown.add(()=>{ game.camera.unfollow(); });               
        game.add.existing(this);      
        this.add(world);  
    }    
    
}