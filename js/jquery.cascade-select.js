
(function($) {
    $.extend($.fn, {
        cascade: function(options) {
            
            options = $.extend({
                url:false
            },options);
            
            if(!options.url){
                return;
            }
            
            function fireChange($parent){
               
                var $select = $(this);
                $(this).nextAll("select").remove();
                
                //datas {name:formname,datas:[{id:1,value:1}]}
                $.post(options.url,{
                   "name":$select.attr("name"),
                   "value":$select.val()
                },function(res){
                    res = eval(res);
                    if($.isPlainObject(res)){
                       var datas = res.datas;
                        var name = res.name;
                        var $select = $("<select></select>").attr("name",name).appendTo($parent);
                        for(var i = 0;i<datas.length;i++){
                            var d = datas[i];
                             $("<option></option>").attr("value",d.id).text(d.value).appendTo($select);
                            
                        } 
                    }
                    fireChange.apply($select,$parent);
                });
                
            }
            
            return this.each(function(){
                
                (function($that){
                    $that.delegate("select","change",function(){
                        
                        fireChange.call(this,$that);
                    });
                })($(this));
                
                /*
                $("select",this).each(function(){
                                    fireChange.call(this,$that);
                                });*/
                
                
            });
        }
    });

})(jQuery);


