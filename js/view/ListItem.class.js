/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/16/13
 * Time: 1:12 PM
 * To change this template use File | Settings | File Templates.
 */
    //requires(View)
var ListItem = (function () {

    function ListItem(caption,decorationType,actionElement$owner_data_event$,actionDetail2$owner_data_event$) {
        var _super=new View(caption,function(table,index){},"div")
        var _View=this;
        var _view=_super.getElement();
        var _text=caption||"List Item";
        var _detail="Detail";
        var _decoration=decorationType||ListItem.decorations.arrow;
        var _width=240;
        var _height=44;
        var _click_eventListener=actionElement$owner_data_event$||function(owner,data,event){alert('button '+owner.getText()+' clicked')};
        var _clickDetail_eventListener=actionDetail2$owner_data_event$||function(owner,data,event){alert('detail of button '+owner.getText()+' clicked')};

        __init=function(view,template,listeners){
            _view.innerHTML=ListItem.template.html;_view.className='listitem';_view.children[0].innerHTML=_text;_view.children[2].innerHTML=_detail;
            var st=document.getElementById('style_ListItem');
            if(st==null){
                st=document.createElement('style');
                st.id="style_ListItem";st.innerHTML=ListItem.template.css;
                document.head.appendChild(st);
            }
            adjustLayout();
           _View.setDetail(_detail);

            _view.addEventListener('click',View.makeEventListener(_View,_text,function(owner,data,event){
                //console.log(event.clientX,owner,data);

                if(_decoration==ListItem.decorations.none||event.clientX<(_width-_height)){
                    //console.log(_click_eventListener)
                    _click_eventListener(owner,data,event);
                }else{
                    //console.log(_clickDetail_eventListener);
                    _clickDetail_eventListener(owner,data,event);
                }
            }),false);
            //_view.children[1].addEventListener('click',View.makeEventListener(_View,_text,_clickDetail_eventListener),false);

        }
        var adjustLayout=function(){
            var v0=_view.children[0];
            var v1=_view.children[1];
            var v2=_view.children[2];
            _view.style.width=(_width)+'px';
            _view.style.height=(_height)+'px';
            v1.src=_decoration;
            setTimeout(function(){
                v1.style.paddingTop= ((_height-v1.offsetHeight)>>1)+'px';
                v1.style.right= ((40-v1.offsetWidth)>>1)+'px';
                v2.style.width=/*v0.style.width=*/((_width-v1.offsetWidth-10)>>0)+'px';
            },1);
        }
        this.setDecoration=function(decoration){
            _decoration=decoration;
            adjustLayout();

        }
        this.setWidth=function(w){
            _width=w;
            adjustLayout();
        }
        this.setHeight=function(h){
            _height=h;
            adjustLayout();
        }
        this.setClickListener=function(f$owner_data_event$){
            _click_eventListener=f$owner_data_event$;
        }
        this.setDetailClickListener=function(f$owner_data_event$){
            _clickDetail_eventListener=f$owner_data_event$;
        }
        this.setDetail=function(detail){
            _detail=detail;
            _view.children[2].innerHTML=detail;
        }
        this.setText=function(title){
            _text=title;
            var v=_view.children[0],i=0;
            v.innerHTML="";
            //console.log(title.length,v.offsetWidth,title.substr(0,i++));
            while(v.offsetWidth<(_width-44) && i<title.length){
                v.innerHTML=title.substr(0,i++)+'...';
            }
            //console.log(title);
        }
        this.getText=function(){
            return _text;
        }
        this.getElement=function(){
            return _super.getElement()
        }
        this.setElement=function(element){
            _super.setElement(element);
        }
        __init();
    }
    ListItem.prototype.bindToParent=function(parent){
        parent.appendChild(this.getElement());
        return this;
    }
    ListItem.prototype.removeFromParent=function(){
        this.getElement().parentNode.removeChild(this.getElement());
        return this;
    }
    ListItem.prototype.initFromPrototype=function(id){
        var proto=document.getElementById(id);
        var _tempContainer=document.createElement("div");
        _tempContainer.innerHTML=proto.innerHTML;
        this.setElement(_tempContainer.children[0]);
        return this;
    }
    ListItem.decorations={
        arrow:"js/view/templates-images/UITableNext.png",
        next:"js/view/templates-images/UITableNextButton.png",
        none:"js/view/templates-images/empty.png"

    }
    ListItem.images={
        img:'js/view/templates-images/empty.png',
        img_hover:'js/view/templates-images/UITableSelection.png'
    }
    ListItem.template={
        img:'js/view/templates-images/_button.png',
        img_hover:'js/view/templates-images/_button_dark.png',
        html:'<div class="listitem_cell">' +
            'ListItem' +
            '</div>' +
            '<img class="listitem_decoration"/>'+
            '<div class="listitem_detail"></div>',
        css:'.listitem{' +
                'background-color:#FFFFFF;' +
                'cursor:pointer;' +
                'position:relative;' +
                'font-family:helvetica;' +
                //'margin-bottom:1px;' +
                //'border:1px solid grey;' +
            '}' +
            '.listitem_cell{' +
                'display:inline-block;' +
                'postion:absolute;' +
                'margin-left:5px;' +
                'background: url('+ListItem.images.img+');' +
            '}' +
            '.listitem_detail{' +
                'position:absolute;' +
                'margin-left:5px;' +
                'font-size:11px;' +
                'font-style:italic;' +
                'background: url('+ListItem.images.img+');' +
            '}' +
            '.listitem:hover{' +
                'background: url('+ListItem.images.img_hover+') repeat-x 0px 0px;' +
            '}' +
            '.listitem_decoration{' +
                'position:absolute;' +
                'vertical-align: bottom;' +
            '}'
    }
    return ListItem;
})();