
interface IResizeable {
    resize: (w:number, h:number)=>void;
}

function Component( component: any){
   return new FluentComponent(component); 
}

class FluentComponent {       
   constructor( component: any){
       this.component = component;
   }

   public resizable( maxFrequency?:number ){
       this._resizable = new Resizeable(this.component, maxFrequency);
   }
   
   private component: any;
   private _resizable: Resizeable;   
}

class Resizeable {
    
    private ctx:IResizeable;    
    
    constructor(ctx:IResizeable, maxFrequency:number) {
        this.ctx = ctx;
        if (document.addEventListener){
            window.addEventListener("resize", ()=>{this.onResize();}, false)            
        }
        this.throttledResize= throttle(()=>{   
            var winW = document.body.offsetWidth;
            var winH = document.body.offsetHeight;
            this.ctx.resize(winW,winH);
        }, maxFrequency, this.ctx);
    }
    private throttledResize:any;
    private onResize() {
        this.throttledResize();
    }
}

function throttle(fn:any, threshhold:number, ctx:any) {
  threshhold || (threshhold = 250);
  var last:number,
      deferTimer:number;
  return function () {
    var context = ctx || this;

    var now = Date.now(),
        args = arguments;
    if (now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
/*
class Resizeable {
    
    private static ctx:IResizeable;
    
    // doing a static constructor in typescript
    static construct = Resizeable.init(); // static assignment
    static init():any {               // non void static function
        if (document.addEventListener){
            window.addEventListener("resize", ()=>{this.onResize();}, false)            
        }
    }
    private static onResize() {   
             
         //requestAnimationFrame(()=>{
             var winW = document.body.offsetWidth;
             var winH = document.body.offsetHeight;
             this.ctx.resize(winW,winH);
         //});
    }
            
    public static component(ctx:IResizeable){
        this.ctx = ctx;    
    }    
    
}
*/

