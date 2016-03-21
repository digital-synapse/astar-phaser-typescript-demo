/// <reference path="../list.ts"/>


class PathfinderNode implements IHashCode {
    
    constructor() {
        this.reset();
    }
    public walkable: boolean;
    public town: boolean;
    public port: boolean;
    public dungeon: boolean;
    public rect: Phaser.Rectangle;
    /// node (tile) position
    public position: Phaser.Point; 
    public path: IPathfinderNodePaths;
    public paths: Array<IPathfinderNodePath>;
        
    public reachable: boolean;
    public explored: boolean;
    public cost: number;
    public previous: PathfinderNode;
    
    public reset() {
        this.reachable=false;
        this.explored=false;
        this.cost= Infinity;
    }
    public getHashCode(): number {
        return this.position.x + (this.position.y * 10000);
    }
}

interface IPathfinderNodePaths {
    n?: PathfinderNode,
    ne?: PathfinderNode,
    e?: PathfinderNode,
    se?: PathfinderNode,
    s?: PathfinderNode,
    sw?: PathfinderNode,
    w?: PathfinderNode,
    nw?: PathfinderNode
}

interface IPathfinderNodePath {
    direction: Direction,
    node: PathfinderNode;
}

enum Direction {
    N, NE, E, SE, S, SW, W, NW
}