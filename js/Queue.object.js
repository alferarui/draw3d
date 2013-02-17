/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/16/13
 * Time: 8:07 PM
 * To change this template use File | Settings | File Templates.
 */
// requires Conditional;
var Queue=(function(){
    function Queue(){
        var logging=false;
        this.Logging=function(_logging){logging=_logging;return this;}

        var speed=1000;
        this.Speed=function(_speed){if(_speed==null){return speed;}else{speed=_speed;return this;}}

        var stopped=true;
        this.Start=function(){stopped=false;run();return this;};
        this.End=function(){stopped=true;return this;};

        var paused=true;
        this.Pause=function(){paused=true;return this;}
        this.Resume=function(){paused=false;return this;}

        var tasks=[];
        this.AddTask=function(_task){
            //console.log('added',_task);
            tasks[tasks.length]=_task;
        }

        var run=function(){
            if(logging)console.log("Queue is started @ "+speed)
            if(!paused){
                if(logging)console.log("Queue is running @ "+speed)
                for(var i=0;i<tasks.length;i++){
                    var task=tasks[i];
                    if(task instanceof Function){
                        task();
                    }else{
                        if(task instanceof Conditional){
                            if(task.$if()){
                                task.$then();
                            }else{
                                if(task.$else()!=undefined)task.$else();
                            }
                        }
                    }
                }
            }
            if(!stopped)setTimeout(run.bind(this),speed);
        }
        this.Tasks=function(_tasks){if(_tasks==null){return tasks;}else{tasks=_tasks;return this;}}
    }
    var instance=new Queue();
    Queue.getInstance=function(){
        return instance;
    }
    instance.Start();
    return instance;
})();
/**
 * @synthax : While(function(){...}).Do(function(){...});
 * @param condition
 * @return {Function}
 * @private
 */
function While(condition){
    var f={}
    f.Do=function(code){
        //console.log(condition,code);
        var conditional=new Conditional(condition,code,null,Conditional.REPEAT_WHILE);
        Queue.AddTask(conditional);
        //return null;
    }
    return f;
}
/**
 * @synthax : When(function(){...}).Do(function(){...});
 * @param condition
 * @return {Function}
 * @private
 */
function If(condition){
    var f={}
    f.Then=function(code_true){
        var g={};
        g.Else=function(code_false){
            var conditional=new Conditional(condition,code_true,code_false,Conditional.DO_ONCE);
            Queue.AddTask(conditional);
        }
        //return g;
    }
    return f;
}
/**
 * @synthax : Whenever(function(){...}).Do(function(){...});
 * @param condition
 * @return {Function}
 * @private
 */
function Whenever(condition){
    var f=function(){
        //console.log(condition)
    }
    f.Do=function(code){
        //console.log(condition,code);
        var conditional=new Conditional(condition,code,null,Conditional.REPEAT_WHEN);
        Queue.AddTask(conditional);
    }
    return f;
}
/*
function While(condition,code){
    var conditional=new Conditional(condition,code);
    Queue.AddTask(conditional);
}
function When(condition,code){
    var conditional=new Conditional(condition,code);
    Queue.AddTask(conditional);
}
function Whenever(condition,code){
    var conditional=new Conditional(condition,code);
    Queue.AddTask(conditional);
}*/