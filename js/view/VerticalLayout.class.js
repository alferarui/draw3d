/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/15/13
 * Time: 11:00 AM
 * To change this template use File | Settings | File Templates.
 */
    //requires View
var VerticalLayout = (function () {
    function VerticalLayout(data,itemAtIndex) {
        View.call(this,[data,itemAtIndex]);
        var _View=this;
        var _data=data||[];
        var _element=document.createElement('div');
        this.setElement=function(element){
            _element=element;
        }
        this.getElement=function(){
            return _element;
        }
        this.getViewAtIndex=function(table,index){
            var cell=document.createElement('div');
            cell.innerHTML=table[index];
            cell.addEventListener('click',View.makeEventListener(_View,_data[index]));
            return cell;
        }
        this.notifyDataChanged=function(startIndex,endIndex){
            _element.children.length=0;
            for(var i=startIndex||0;i<endIndex||data.length;i++){
                _element.appendChild(this.getViewAtIndex(_data,i));
            }
        }
    }
    VerticalLayout.bindToParent=function(parent){
        parent.appendChild(this.getElement());
        return this;
    }
    VerticalLayout.initFromPrototype=function(id){
        var proto=document.getElementById(id);
        var _tempContainer=document.createElement("div");
        _tempContainer.innerHTML=proto.innerHTML;
        this.setElement(_tempContainer.children[0]);
        return this;
    }
    VerticalLayout.makeEventListener=function(owner,data){
        return function(event){
            //owner is the Object that owns this view;
            //data is the Object that served at building this view
        }
    }
    return VerticalLayout;
})();