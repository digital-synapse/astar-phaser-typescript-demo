// <reference path="../game.ts"/>
/// <reference path="../random.ts"/>

class Food {
    constructor() {
        var key = 'food';
        var game = Game.instance;
        var image = game.cache.getImage(key);
        var w = image.width;
        var h = image.height;
        var x= Random.int(w, Game.instance.width-w);
        var y= Random.int(h, Game.instance.height-h);
        this._sprite = new Phaser.Sprite(game,x,y,key);        
        //this._sprite.anchor.x=w/2;
        //this._sprite.anchor.y=h-1;        
        game.add.existing(this._sprite);        
        
        this._bin = [];
        this._bin.push(new Apple());
    }
    private _sprite: Phaser.Sprite;    
    private _bin: Array<Nutrition>;
}