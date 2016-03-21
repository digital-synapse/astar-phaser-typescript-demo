/// <reference path="./pathfinder-node.ts"/>
/// <reference path="../list.ts"/>
/// <reference path="../random.ts"/>

const tilemapKey = 'world_map';

class Pathfinder {
    
    // create in preload
    constructor(tiledJsonUrl:string) {
        var game = Game.instance;
        game.load.tilemap(tilemapKey, tiledJsonUrl, null,Phaser.Tilemap.TILED_JSON);
    }
    
    /* Expects tilemap loaded from tiled to have 
        tiles with properties defined in the 'info' layer:
        - Collidable: boolean
    */
    public create() {
        var game = Game.instance;
        
        // get the 'info' layer from the tilemap which contains the collision tiles
        this.nodes = [];    
        var map = new Phaser.Tilemap(game,tilemapKey);
        var index=0;
        for (var i=0; i < map.layers.length; i++){
            var layer = map.layers[i];
            if (layer.name=='info'){
                index=i;
                break;
           
         }                
        }
        
        // get walkable nodes from collision tiles
        this.walkable = [];
        var tilemap = new Phaser.TilemapLayer(game, map, index);        
        var info:any= tilemap.layer;        
        var w = info.width;
        var h = info.data.length;                
        for (var y=0; y < h; y++){            
            for (var x=0; x < w; x++){                
                var tile:Phaser.Tile =info.data[y][x];
                var node = new PathfinderNode();
                this.nodes.push(node);
                node.walkable= !tile.properties.Collidable,
                node.town= tile.properties.Town,
                node.dungeon= tile.properties.Dungeon,
                node.port= tile.properties.Port,
                node.position= new Phaser.Point(tile.x, tile.y),
                node.rect= new Phaser.Rectangle(tile.left, tile.top, tile.width, tile.height)
                
                // just for convienience. easier to look up a random node on the map for object placement                
                if (node.walkable){
                    this.walkable.push(node);
                }                             
            }
        }
        
        // second pass to create links between nodes
        for (var y=0; y < h; y++){            
            for (var x=0; x < w; x++){                
                var tile:Phaser.Tile =info.data[y][x];
                var node = this.nodes[(y*w)+x];
                node.path = {
                    n: (y > 0 && !info.data[y-1][x].properties.Collidable) ? this.nodes[((y-1)*w)+x] : undefined,
                    s: (y < (h-1) && !info.data[y+1][x].properties.Collidable) ? this.nodes[((y+1)*w)+x] : undefined,
                    w: (x > 0 && !info.data[y][x-1].properties.Collidable) ? this.nodes[(y*w)+(x-1)] : undefined,
                    e: (x < (w-1) && !info.data[y][x+1].properties.Collidable) ? this.nodes[(y*w)+(x+1)] : undefined
                }
                if ((node.path.n || node.path.e) && (y > 0 && x < w-1 && !info.data[y-1][x+1].properties.Collidable)) 
                    node.path.ne = this.nodes[((y-1)*w)+(x+1)];
                if ((node.path.s || node.path.e) && (y < h-1 && x < w-1 && !info.data[y+1][x+1].properties.Collidable)) 
                    node.path.se = this.nodes[((y+1)*w)+(x+1)];
                if ((node.path.s || node.path.w) && (y < h-1 && x > 0 && !info.data[y+1][x-1].properties.Collidable)) 
                    node.path.sw = this.nodes[((y+1)*w)+(x-1)];
                if ((node.path.n || node.path.w) && (y > 0 && x > 0 && !info.data[y-1][x-1].properties.Collidable)) 
                    node.path.nw = this.nodes[((y-1)*w)+(x-1)];
                    
                node.paths = [];
                if (node.path.n) node.paths.push({direction: Direction.N, node: node.path.n});
                if (node.path.ne) node.paths.push({direction: Direction.NE, node: node.path.ne});
                if (node.path.e) node.paths.push({direction: Direction.E, node: node.path.e});
                if (node.path.se) node.paths.push({direction: Direction.SE, node: node.path.se});
                if (node.path.s) node.paths.push({direction: Direction.S, node: node.path.s});
                if (node.path.sw) node.paths.push({direction: Direction.SW, node: node.path.sw});
                if (node.path.w) node.paths.push({direction: Direction.W, node: node.path.w});
                if (node.path.nw) node.paths.push({direction: Direction.NW, node: node.path.nw});
            }
        }    
        
        // save the dimensions
        this.nodeWidth = info.data[0][0].width;
        this.nodeHeight = info.data[0][0].height;       
        this.rowWidth = w;
        this.width = info.widthInPixels;
        this.height = info.widthInPixels;
        this.left = this.margin;
        this.top = this.margin;
        this.right = this.width+this.margin;
        this.bottom = this.height + this.margin;
        
        // release resources to GC
        tilemap.destroy();
        tilemap = undefined;
        game.cache.removeTilemap(tilemapKey);
        map = undefined;
        info = undefined;
    }        
    
    public findPath(start: Phaser.Point, finish: Phaser.Point){
        var startNode = this.findNodeAtPosition(start);
        var endNode = this.findNodeAtPosition(finish);
        if (startNode && endNode){
            var path = this.findPathAStar(startNode, endNode);
            
            if (path){
                var result: Array<Phaser.Point>=[];
                for (var i=0; i < path.length; i++){
                    var node = path[i];
                    var point = new Phaser.Point(node.rect.centerX, node.rect.centerY);
                    result.push(point);
                }
                return result;
            }
        }
    }
        
    private margin:number = 6; // todo: figure out a better way
    private width:number;
    private height:number;
    private rowWidth:number;
    private nodeWidth:number;
    private nodeHeight:number;
    private nodes: Array<PathfinderNode>;    
    
    // these values include the margin
    private left: number;
    private top: number;
    private right: number;
    private bottom: number
    
    // this is just for convienience.
    private walkable: Array<PathfinderNode>;
    
    // should be way faster than searching through the whole list
    // for this to work the nodes collection cannot be reorderd
    private findNodeAtPosition(position: Phaser.Point): PathfinderNode{
        if (position.x < this.left || position.y < this.top || 
            position.x >= this.right || position.y >= this.bottom)
            return undefined;      
        var x = position.x / this.nodeWidth;
        var y = position.y / this.nodeHeight;
        var ix = parseInt(x.toString());
        var iy = parseInt(y.toString());        
        return this.nodes[(iy*this.rowWidth)+ix];
    }
    
    private findPathAStar(startNode: PathfinderNode, endNode: PathfinderNode){
        var reachable= new List<PathfinderNode>();                
        var explored= new List<PathfinderNode>();
        reachable.add(startNode);
        startNode.previous=undefined; // make sure we stop here when we build the path
        startNode.cost=0;
        
        while (reachable.length > 0){
            
            // choose some node we know how to reach
            var node = this.chooseNode(reachable, endNode);
            
            // If we just got to the goal node, build and return the path
            if (node == endNode){             
                this.cleanup(reachable, explored);
                return this.buildPath(endNode);
            }
                
            // dont repeat ourselves
            reachable.remove(node);
            explored.add(node);
            node.explored=true; // speed opt. faster than searching the list
            
            // Where can we get from here that we havent explored before?
            for (var i=0; i < node.paths.length; i++){
                var adjacentNode = node.paths[i].node;
                if (!adjacentNode.explored){
                    
                    //first time we see this node?
                    if (!adjacentNode.reachable){
                        reachable.add(adjacentNode);
                        adjacentNode.reachable=true;
                    }
                    
                    // If this is a new path, or a shorter path than what we have, keep it.
                    if (node.cost+1 < adjacentNode.cost){
                        adjacentNode.previous = node;
                        adjacentNode.cost = node.cost+1;
                    }
                }
            }
        }
        
        //oops all done so we need to cleanup after ourselves
        this.cleanup(explored);
        
        // If we got here, no path was found :(         
        return null;        
    }
    private cleanup(...lists:Array<List<PathfinderNode>>) {
        for (var i=0; i < lists.length; i++){
            var list = lists[i];
            var iterator= list.getIterator();
            while (iterator.hasMore()){
                var node = iterator.next();
                node.reset();
            };
        }
        
    }
    
    private buildPath(toNode: PathfinderNode): Array<PathfinderNode>{
        var path:Array<PathfinderNode>=[];
        while (toNode != undefined){
            path.push(toNode);
            toNode=toNode.previous;
        }
        return path;
    }
    private chooseNode(reachable: List<PathfinderNode>, goalNode:PathfinderNode): PathfinderNode {
        var minCost = Infinity;
        var bestNode:PathfinderNode=undefined;
        var context=this;
        
        var iterator= reachable.getIterator();
        var node: PathfinderNode;
        while (node = iterator.next()){
            

           var costStartToNode = node.cost;
           var costNodeToGoal = context.estimateCost(node,goalNode);
           var totalCost = costStartToNode + costNodeToGoal;
           
           if (minCost > totalCost){
               minCost = totalCost;
               bestNode = node;
           }                      
        }

        return bestNode;
    }
    private estimateCost(fromNode:PathfinderNode, toNode:PathfinderNode):number {
        // as the crow flies
        //var distance= Phaser.Math.distance(fromNode.rect.centerX, fromNode.rect.centerY, toNode.rect.centerX, toNode.rect.centerY);
        
        var xdif = toNode.position.x - fromNode.position.x;
        var ydif = toNode.position.y - fromNode.position.y;
        var cost= Math.abs(xdif) + Math.abs(ydif);        
        return cost;

    }
    
    // end A*
    
    // utility methods for other classes
    
    public getRandomWalkablePoint():Phaser.Point {
        var i=Random.int( this.walkable.length );
        var rect=this.walkable[i].rect;
        return new Phaser.Point(rect.centerX, rect.centerY);
    }
}