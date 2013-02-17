/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/16/13
 * Time: 8:12 PM
 * To change this template use File | Settings | File Templates.
 */
var Conditional=(function(){
    function Conditional(_$if,_$then,repeatType){
        var _Conditional=this;
        this.$if=_$if||function(){return false;}
        this.$then=function(){
            _$then();
            this.remove=(repeatType==Conditional.EXECUTE_ONCE)
        };
        this.remove=false;
    }

    Conditional.EXECUTE_ONCE=-1;
    Conditional.EXECUTE_ALWAYS=-2;
    return Conditional;
})();