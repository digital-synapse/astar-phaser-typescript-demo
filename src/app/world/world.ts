
class World extends Phaser.Group {
    
    constructor() {
        var game = Game.instance;
        super(game);
        
        game.scale.setExactFit();
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.time.advancedTiming = true;
        var world= game.add.sprite(0,0,'world_tiles');
        game.world.setBounds(0,0,world.width,world.height);        
        
        world.inputEnabled=true;
        world.events.onInputDown.add(()=>{ game.camera.unfollow(); });       
        
        game.add.existing(this);
    }
}