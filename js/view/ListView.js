/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/17/13
 * Time: 1:44 PM
 * To change this template use File | Settings | File Templates.
 */

//requires(View)
//requires(ListView)
//requires(adapter)
var ListView = (function () {

    function ListView(adapter){//decorationType,actionClickCell$owner_data_event$,actionClickCellDetail2$owner_data_event$) {
        var _adapter=adapter;
        var children=[]
        var _super=new View([],function(table,index){},"div");
        var _View=this;
        var _view=_super.getElement();
        _view.className='listView';

        var adjustLayout=function(){
            _view.style.width=(_width)+'px';
            for(var i=0;i<children.length;i++){
                children[i].setWidth(_width);
            }
        }
        var __init=function(){
            var st=document.getElementById('style_ListView');
            if(st==null){
                st=document.createElement('style');
                st.id="style_ListView";st.innerHTML=ListView.template.css;
                document.head.appendChild(st);
            }
            //this.setWidth(320);
            _adapter.notifyDataChanged(0,adapter.data.length);
        }
        _adapter.notifyDataChanged=function(begin,end){
            var b=begin||0,e=end||adapter.data.length;
            for(var i=b;i<e;i++){
                if(children[i]==undefined){
                    console.log(i+"undefined");
                    children[i]=adapter.viewAtIndex(adapter.data,i);
                    children[i].bindToParent(_view);
                    children[i].setWidth(_width);
                }else{
                    console.log(i+"defined");
                    //children[i].removeFromParent();
                    //children[i]=undefined;
                    var nc=adapter.viewAtIndex(adapter.data,i);
                    _view.insertBefore(nc.getElement(),children[i].getElement());
                    children[i].removeFromParent();
                    children[i]=nc;
                    children[i].setWidth(_width);
                }
            }
        }
        var _width=320;
        this.setWidth=function(w){
            _width=w;
            adjustLayout();
        }
        this.bindToParent=function(parent){
            _super.bindToParent(parent||document.body)
        }
        __init();
    }
    ListView.template={
        img:'js/view/templates-images/_button.png',
        img_hover:'js/view/templates-images/_button_dark.png',
        html:'<div class="listView">' +
             '</div>',
        css:'.listView{' +
            'background-color:#FFFFFF;' +
            'margin-top:2px;' +
            //'border-radius:12px;' +
            //'padding:6px;' +
            //'padding-top:12px;' +
            //'padding-bottom:12px;' +
            '}'
    }
return ListView;
})();