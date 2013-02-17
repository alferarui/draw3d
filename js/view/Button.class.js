/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/15/13
 * Time: 12:11 PM
 * To change this template use File | Settings | File Templates.
 */
var Button = (function () {
    function Button(title,action$owner_data_event$) {
        var _super=new View(title,function(table,index){})
        var _View=this;
        var _view=_super.getElement();
        var _title=title||"Button";
        var _width=240;
        var _click_eventListener=action$owner_data_event$||function(owner,data,event){alert('button '+owner.getTitle()+' clicked')};

        __init=function(view,template,listeners){
            _view.innerHTML=Button.template.html;_view.className='button';_view.children[1].innerHTML=title;
            var st=document.getElementById('style_Button');
            if(st==null){
                st=document.createElement('style');
                st.id="style_Button";st.innerHTML=Button.template.css;
                document.head.appendChild(st);
            }
            _view.addEventListener('click',View.makeEventListener(_View,title,_click_eventListener));

            _view.children[1].addEventListener('mouseover',View.makeEventListener(null, null,function(){
                        _view.children[0].style.background='url('+Button.images.img_hover+') no-repeat 0px 0px';
                        _view.children[2].style.background='url('+Button.images.img_hover+') repeat-x 0px -60px';}),true);
            _view.children[1].addEventListener('mouseout',
                View.makeEventListener(null,null,function(){
                        _view.children[0].style.background='url('+Button.images.img+') no-repeat 0px 0px';
                        _view.children[2].style.background='url('+Button.images.img+') repeat-x 0px -60px';
                    }),true);
        }
        this.setClickListener=function(f$owner_data_event$){
            _click_eventListener=View.makeEventListener(_View,title,f$owner_data_event$);
        }
        this.setTitle=function(title){
            _title=title;
            _view.children[1].innerHTML=title;
        }
        this.getTitle=function(){
            return _title;
        }
        this.getElement=function(){
            return _super.getElement()
        }
        this.setElement=function(element){
            _super.setElement(element);
        }
        this.setWidth=function(_w){
            _width=_w;
            _view.children[1].style.width=(_w-10)+'px';
        }
        __init();
    }
    Button.prototype.bindToParent=function(parent){
        parent.appendChild(this.getElement());
        return this;
    }
    Button.prototype.initFromPrototype=function(id){
        var proto=document.getElementById(id);
        var _tempContainer=document.createElement("div");
        _tempContainer.innerHTML=proto.innerHTML;
        this.setElement(_tempContainer.children[0]);
        return this;
    }
    Button.images={
        img:'js/view/templates-images/_button.png',
        img_hover:'js/view/templates-images/_button_dark.png'
    }
    Button.template={
        img:'js/view/templates-images/_button.png',
        img_hover:'js/view/templates-images/_button_dark.png',
        html:'<div class="button_left"></div>' +
             '<div class="button_center">' +
                'Button' +
             '</div>'+
             '<div class="button_right"></div>',
        css:'.button{' +
                'cursor:pointer;' +
            '}' +
            '.button_left{' +
                'width:5px;' +
                'height:30px;' +
                'display:inline-block;' +
                'background: url('+Button.images.img+') no-repeat 0px 0px;' +
            '}' +
            '.button_center{' +
                'font-family:helvetica;' +
                'font-size:12px;' +
                'color:#FFFFFF;' +
                'text-shadow: rgba(0, 0, 0, 0.597656) 0px -1px 0px;' +
                'padding-top:8px;' +
                'position: relative;'+
                'top: -10px;'+
                'text-shadow: 0px 1px grey;'+
                'text-align: center;'+
                'width:240px;'+
                'height:22px;' +
                'display:inline-block;' +
                'background: url('+Button.images.img+') repeat-x 0px -30px;' +
            '}' +
            '.button_center:hover{' +
                'background: url('+Button.images.img_hover+') repeat-x 0px -30px;' +
            '}' +
            '.button_right{' +
                'height:30px;' +
                'width:5px;'+
                'display:inline-block;' +
                'background: url('+Button.images.img+') repeat-x 0px -60px;' +
            '}'
    }
    return Button;
})();