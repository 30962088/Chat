(function($) {
    $.extend($.fn, {
        validate : function(options) {

            function tipDom($input) {
                var $tip = $input.siblings(".tip-box");
                if ($tip.size()>0) {
                    return $tip;
                }

                var $tipdom = $('<div class="tip-box"><span class="triangle"></span><label class="content">错误提示</label></div>');

                $input.after($tipdom);


                return $tipdom;

            }


            // <input data-rule='[{name:"required",message:"必须"},{name:"nick",message:"哈哈"}]'/>
            function initRules($form) {

                $("input,select", $form).each(function() {
                    var _rules = eval($(this).attr("data-rule"));
                    if (_rules) {
                        var rules = $.validate.rules;
                        var arrRules = [];
                        for (var i = 0; i < rules.length; i++) {
                            var rule = rules[i];
                            for (var j = 0; j < _rules.length; j++) {
                                var _rule = _rules[j];
                                if (rule.rule.name == _rule.name) {
                                    rule = $.extend({}, rule);
                                    if (_rule.message) {
                                        rule.message = _rule.message;
                                    }
                                    arrRules.push(rule);
                                }
                            }
                        }
                        $(this).data("rules", arrRules);
                    }

                });
            }

            function valid($input) {
                var rules = $input.data("rules");
                
                if (rules) {
                    var $tipDom = tipDom($input);
                   
                    for (var i = 0; i < rules.length; i++) {
                        var rule = rules[i];
                        var cls = rule.cls||"error";
                        var $field = $tipDom.closest(".field-ui");
                        var $tipContent = $tipDom.find(".content");
                        if (!rule.rule.exec($input.val())) {
                            $tipContent.html(rule.message);
                            $tipDom.show();
                            $field.addClass(cls);
                            $tipDom.addClass(cls);
                            return false;
                        } else {
                            $field.removeClass(cls);
                            $tipDom.removeClass(cls);
                            $tipContent.html("");
                        }
                    }
                    $tipDom.hide();
                }
                return true;
            }

            return this.each(function(options) {
                options = $.extend({
                    debug:false
                },options);
                initRules(this);
                $(this).delegate("input","blur",function(){
                   valid($(this)); 
                });
                $(this).delegate("select","change",function(){
                   valid($(this)); 
                });
                $(this).bind("submit", function() {
                    var unvalidInputs = [];
                    $("input,select",this).each(function(){
                       if(!valid($(this))){
                           unvalidInputs.push(this);
                       } 
                    });
                    if(unvalidInputs.length>0){
                        unvalidInputs[0].focus();
                        return false;
                    }
                    if(options.debug){
                        return false;
                    }
                });

            });
        }
    });

    $.validate = {};

    $.validate.rules = [{
        rule : {
            name : "required",
            exec : function(val) {
                return val.length > 0;
            }
        },
        message : "字段必须",
        cls:'info'
    },{
        rule : {
            name : "nickname",
            exec : function(val) {
                function getBytesLength(str) {
     
                    return str.replace(/[^\x00-\xff]/g, 'xx').length;
                }
                var length = getBytesLength(val);
                return length>=1&&length<=20;
            }
        },
        message : "限制长度1~20个字符"
    },{
        rule : {
            name : "password",
            exec : function(val) {
                var length = val.length;
                return length>=9&&length<=100
            }
        },
        message : "限制长度9-100个字符"
    },{
        rule : {
            name : "email",
            exec : function(val) {
                if(val.length == 0){
                    return true;
                }
               var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/;
                return reg.test(val);
            }
        },
        message : "请输入合法的Email"
    },{
        rule : {
            name : "valinum",
            exec : function(val) {
               
                return val.length>=1&&val.length<=10;
            }
        },
        message : "限制长度1~10个字符"
    },{
        rule : {
            name : "uid",
            exec : function(val) {
                var reg = /^([a-zA-Z0-9_-])+$/;
                return reg.test(val);
            }
        },
        message : "UID错误"
    },{
        rule : {
            name : "uid/email",
            exec : function(val) {
                var reg;
                if(/@/.test(val)){
                    reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/;
                }else{
                    reg = /^([a-zA-Z0-9_-])+$/;
                }
                return reg.test(val);
            }
        },
        message : "uid/email错误"
    },{
        rule : {
            name : "selectrequired",
            exec : function(val) {
                if(val<0){
                    return false;
                }
                return true;
            }
        },
        message : "请选择",
        cls:"info"
    }]
    
    

})(jQuery);

