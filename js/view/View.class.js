/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/15/13
 * Time: 10:35 AM
 * To change this template use File | Settings | File Templates.
 */
var View = (function () {
    function View(data,itemAtIndex,tag) {
        var _View=this;
        var _element=document.createElement(tag||"div");
        var _data=data||[];
        this.setElement=function(element){
            _element=element;
        }
        this.getElement=function(){
            return _element;
        }
        this.getViewAtIndex=function(table,index){
            var cell=document.createElement('div');
            cell.innerHTML=table[index];
            cell.addEventListener('click',View.makeEventListener(_View,_data[index],View.standardEventListeners.log));
            return cell;
        }
        this.notifyDataChanged=function(startIndex,endIndex){
            _element.children.length=0;
            for(var i=startIndex||0;i<endIndex||data.length;i++){
                _element.appendChild(this.renderItemAtIndex(_data,i));
            }
        }
    }
    View.bindToParent=function(parent){
        parent.appendChild(_element);
        return this;
    }
    View.initFromPrototype=function(id){
        var proto=document.getElementById(id);
        var _tempContainer=document.createElement("div");
        _tempContainer.innerHTML=proto.innerHTML;
        this.setElement(_tempContainer.children[0]);
        return this;
    }
    View.makeEventListener=function(owner,data,function$owner_data_event$){
        return function(event){
            //owner is the Object that owns this view;
            //data is the Object that served at building this view
            function$owner_data_event$(owner,data,event);
        }
    }
    View.standardEventListeners={
        log:function View_log(event,owner,data,element){
            console.log(event,owner,data,element);
        },
        alert:function View_alert(event,owner,data,element){
            alert(event,owner,data,element);
        },
        switchImages:function(elements,images){
            for(var i=0;i<elements.length;i++){
                ;
            }
        }
    }
    return View;
})();
