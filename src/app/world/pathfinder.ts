/// <reference path="../../common/interfaces/geometry.ts"/>
/// <reference path="../../common/interfaces/messages.ts"/>
/// <reference path="../../common/classes/random.ts"/>
/// <reference path="../worker-request.ts"/>

interface IWorldObjectLocation {
    position: Phaser.Point,
    rect: Phaser.Rectangle
}

class Pathfinder {
    
    // create in preload
    constructor(tiledJsonUrl:string, tilemapKey:string = 'world_map') {
        this.game = Game.instance;
        this.game.load.tilemap(tilemapKey, tiledJsonUrl, null,Phaser.Tilemap.TILED_JSON);
        this.worker = WorkerRequest.getInstance();
        this.tilemapKey = tilemapKey;        
    }
    private tilemapKey: string;
    private worker: WorkerRequest;
    
    /* Expects tilemap loaded from tiled to have 
        tiles with properties defined in the 'info' layer:
        - Collidable: boolean
    */
    public create(onInitComplete:()=>void) {
        
        this.map = new Phaser.Tilemap(this.game, this.tilemapKey);
        var index = this.findLayerIndex('info');
        
        // get walkable nodes from collision tiles
        this.walkable = [];
        var tiles : IPathfinderTileProperties[][] = [];
        var tilemap = new Phaser.TilemapLayer(this.game, this.map, index);        
        var info:any= tilemap.layer;        
        var w = info.width;
        var h = info.data.length;                
        for (var y=0; y < h; y++){
            var row :IPathfinderTileProperties[]=[];
            tiles.push(row);         
            for (var x=0; x < w; x++){                
                var tile:Phaser.Tile =info.data[y][x];
                var node:IPathfinderTileProperties = {
                    walkable: !tile.properties.Collidable,
                };
                row.push(node);
                
                // just for convienience. easier to look up a random node on the map for object placement                
                if (node.walkable){
                    this.walkable.push({
                        position: new Phaser.Point(tile.x, tile.y),
                        rect: new Phaser.Rectangle(tile.left, tile.top, tile.width, tile.height)
                    });
                }                             
            }
        }
        var msg:IWorkerRequest = {
            pathfinderInit: {
                tiles: tiles,
                tileWidth: info.data[0][0].width,
                tileHeight: info.data[0][0].height,
            }
        }
        this.worker.post(msg, (response)=>{
            onInitComplete();
        });
    }
    
    private findLayerIndex(name:string):number {
        var game = Game.instance;        
        
        var index=0;
        for (var i=0; i < this.map.layers.length; i++){
            var layer = this.map.layers[i];
            if (layer.name==name){
                index=i;
                break;
            }                
        }   
        return i;     
    }
    
    // this is just for convienience.
    private walkable: Array<IWorldObjectLocation>;    
    private map: Phaser.Tilemap;
    private game: Phaser.Game;
    
    
    public getRandomWalkablePoint():Phaser.Point {
        var i=Random.int( this.walkable.length -1 );
        var rect=this.walkable[i].rect;
        return new Phaser.Point(rect.centerX, rect.centerY);
    }    
    
    public findPath(start: Phaser.Point, finish: Phaser.Point, callback:(points:IPoint[])=>void){
    
        var msg: IWorkerRequest = {
            pathfinderFindPath: {
                start: {x: start.x, y: start.y},
                finish: {x: finish.x, y: finish.y }
            }
        }
        this.worker.post(msg, (response)=>{
            callback(response.pathfinderFindPath);
        })        
    }
}