class WorkerRequest {
    
    // singleton pattern
    private static _instance:WorkerRequest = new WorkerRequest();
    public static getInstance(): WorkerRequest {
        return this._instance;
    }
    constructor() {
        if (WorkerRequest._instance){
            throw new Error("Error: Instantiation failed.\nUse WorkerRequest.getInstance()");
        }
        WorkerRequest._instance = this;
        this.init();
    }
    
    // the actual class starts here
    private init() {
        this.worker = new Worker('../build/worker.js');
        this.worker.addEventListener('message',(e:any)=>{
            var response: IWorkerResponse = e.data;
            this.callbacks[response.requestToken](response);
            delete this.callbacks[response.requestToken];
        });  
    };
    private worker: Worker;
    private requestCount:number = 0;
    private callbacks: any = {};
    
    public post( msg: IWorkerRequest, callback: (response:IWorkerResponse)=>void ){
        msg.requestToken = this.requestCount++;
        this.callbacks[msg.requestToken] = callback;
        this.worker.postMessage(msg);
    }
    
}