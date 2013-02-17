/**
 * Created with JetBrains PhpStorm.
 * User: alf
 * Date: 2/16/13
 * Time: 8:12 PM
 * To change this template use File | Settings | File Templates.
 */
var Conditional=(function(){
    function Conditional(_$if,_$then,_$else,repeatType){
        var _Conditional=this;
        this.$if=_$if||function(){return false;}
        this.$then=_$then||function(){};
        this.$else=_$else;
        this.repeat=repeatType||Conditional.REPEAT_WHILE;
    }
    Conditional.prototype.REPEAT_WHILE=-1;
    Conditional.prototype.REPEAT_WHEN=-2;
    Conditional.prototype.DO_ONCE=-3;
    return Conditional;
})();