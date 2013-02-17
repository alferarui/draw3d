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
        var index=0;
        var logging=false;
        this.Logging=function(_logging){logging=_logging;return this;}

        var speed=1;
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
            var _startTime=Date.now();
            if(logging)console.log("Queue is started @ "+speed)
            if(!paused){
                if(logging)console.log("Queue is running @ "+speed)
                for(var i=0;i<tasks.length;i++){
                    var task=tasks[i];
                    if(task instanceof Conditional){
                        if(task.$if()){
                            try{
                            task.$then();
                            }catch(e){
                                throw(Error("error at "+i+";"+task))
                            }
                        }
                    }
                    //var __speed=(Date.now()-_startTime);

                    //index=(i<tasks.length)?(i+1):0;
                }
            }
            if(window.li3!=undefined){
                window.li3.setDetail("watching "+(tasks.length)+" tasks");
            }
            var _tasks=[];
            //tasks.length=0;
            for(var i=0;i<tasks.length;i++){
                var task=tasks[i];
                if(task.remove==false){
                    _tasks[_tasks.length]=task;
                }
            }
            tasks=_tasks;

            var __speed=(Date.now()-_startTime);

            /*
            if(window.li2!=undefined){
                window.li2.setDetail("adjusting queue speed to "+(__speed+20)+"ms");
            }
            if(speed!=__speed){
                speed=__speed;
            }*/
            if(!stopped)setTimeout(run.bind(this),speed);
        }
        this.Tasks=function(_tasks){if(_tasks==null){return tasks;}else{tasks=_tasks;return this;}}
    }
    var instance=new Queue();
    Queue.getInstance=function(){
        return instance;
    }
    instance.Start();
    instance.Resume();
    return instance;
})();
/**
 * 'Do' registers a function to be executed on every iteration,
 * @param procedure
 * @constructor
 */
function Do(procedure){
    if(!(procedure instanceof Function)){
        throw (new Error(Do.toString()));
    }
    var task=new Conditional(function(){return true},procedure,Conditional.EXECUTE_ALWAYS);
    Queue.AddTask(task);
}
Do.toString=function(){
    var message="\n*  'Do' registers a function to be executed on every iteration\n" +
            "*  @synthax : Do(function(){...});\n";
    return message;
}

/**
 *  * 'While' registers a function to be executed while
 *  the condition function evaluates to true
 * @synthax : While(function(){...}).Do(function(){...});
 * @param condition
 * @return {Object}
 * @constructor
 */

function While(condition){
    if(!(condition instanceof Function)){
        throw (new Error(While.toString()));
    }
    var f={}
    f.Do=function(code){
        //console.log(condition,code);
        var conditional=new Conditional(condition,code,Conditional.EXECUTE_ALWAYS);
        Queue.AddTask(conditional);
        //return null;
    }
    return f;
}

While.toString=function(){
    var message="\n*  'While' registers a function to be executed while\n" +
            "*  the condition function evaluates to true\n" +
            "*  synthax : While(function(){...}).Do(function(){...});\n";
    return message;
}

/**
 * @synthax : When(function(){...}).Do(function(){...});
 * @param condition
 * @return {Function}
 * @private
 */
function When(condition){
    if(!(condition instanceof Function)){
        throw (new Error(When.toString()));
    }
    var f=function(){
        //console.log(condition)
    }
    f.Do=function(code){
        if(!(code instanceof Function)){
            throw (new Error(When.toString()));
        }
        //console.log(condition,code);
        var conditional=new Conditional(condition,code,Conditional.EXECUTE_ONCE);
        Queue.AddTask(conditional);
    }
    return f;
}
When.toString=function(){
    var message="\n * 'When' registers one function (procedure) to be executed\n" +
        " *  when the condition evaluates to true \n" +
        " *  synthax : When(function(){...}).Do(function(){...});\n";
    return message;
}