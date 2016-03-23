/// <reference path="./pathfinder.ts"/>
/// <reference path="../common/interfaces/messages.ts"/>

var pathfinder: Pathfinder;


self.addEventListener('message',(e:any)=>{
    var request: IWorkerRequest = e.data;
    var response: IWorkerResponse = {
        requestToken: request.requestToken
    };
    
    if (request.pathfinderInit){
        pathfinder = new Pathfinder( request.pathfinderInit ); 
        response.pathfinderInit= true;

        
    }
    else if (request.pathfinderFindPath){
        var params=request.pathfinderFindPath;
        response.pathfinderFindPath= pathfinder.findPath(params.start, params.finish)
    }
    
    self.postMessage(response);
});
