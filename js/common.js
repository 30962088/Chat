function DrawImage(ImgD,FitWidth,FitHeight){
   var image = ImgD;
   console.info(image.width+","+image.height+",",FitWidth+","+FitHeight);
   if(image.width>0 && image.height>0){
       if(image.width/image.height>= FitWidth/FitHeight){
           if(image.width>FitWidth){
               ImgD.width=FitWidth;
               ImgD.height=(image.height*FitWidth)/image.width;
           }else{
               ImgD.width=image.width;
               ImgD.height=image.height;
           }
       } else{
           if(image.height>FitHeight){
               ImgD.height=FitHeight;
               ImgD.width=(image.width*FitHeight)/image.height;
           }else{
               ImgD.width=image.width;
               ImgD.height=image.height;
           }
       }
   }
}

$(function(){
    
});

function ON_CHAT_RESIZE() {
    var $center = $(".chat-center");
    var $left = $(".room-left");
    var $right = $(".room-right");
    var embed = $center.find("embed");
    
    DrawImage(embed.get(0),$center.width(),$center.height());
    
    $(".chatcon-box").css({
        right : 0,
        left : "auto"
    });
   
    $center.css({
        "margin-left" : $left.width() + "px",
        "margin-right" : $right.width() + "px"
    });
    
    
}

(function() {
    var CHAT = {};
    //obj {"title":{'class':'cls sd as','html':'哈哈'},"content":[{'class'}]}
    CHAT.toBottom = function() {
        var list = $(".chatcon-list").get(0);
        list.scrollTop = list.scrollHeight;
    }

    CHAT.playMp3 = function(url) {
        $('<embed src="niftyplayer.swf?file=betty.mp3&as=0" name="niftyPlayer1" type="application/x-shockwave-flash" swLiveConnect="true" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>');
    }

    CHAT.insert = function(obj) {

        var dom = $('<div class="chatcon-item"><div class="chatitem-box"><div class="chatitem-outer"><div class="chatitem-hd"><h5></h5></div><div class="chatitem-bd"></div></div></div></div>');
        if (!$.isPlainObject(obj))
            return;
        dom.find('h5').addClass(obj.title['class']).html(obj.title.html);
        var $bd = dom.find(".chatitem-bd");
        var contents = obj.content;
        for (var i = 0; i < contents.length; i++) {
            var content = contents[i];
            $bd.append($("<p class='" + content['class'] + "'>" + content.html + "</p>"));
        }
        dom.appendTo($(".chatcon-list"));
        CHAT.toBottom();
        MEditor.clearContent();

    }

    CHAT.appendInput = function(html) {

    }

    CHAT.focus = function(text) {
        $("#chat-input").val(text).focusEnd();
        ;
    }

    window.CHAT = CHAT;
})();

var MUtils = {

    CenterInWindow : function($box) {
        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var popupHeight = $box.outerHeight();
        var popupWidth = $box.outerWidth();
        //centering
        $box.css({
            "position" : "fixed",
            "top" : windowHeight / 2 - popupHeight / 2,
            "left" : windowWidth / 2 - popupWidth / 2
        });
        return $box;
    },
    CenterInDom:function($box,$dom){
        var windowWidth = $dom.outerWidth();
        var windowHeight = $dom.outerHeight();
        var popupHeight = $box.outerHeight();
        var popupWidth = $box.outerWidth();
        //centering
        $box.css({
            "position" : "absolute",
            "top" : windowHeight / 2 - popupHeight / 2,
            "left" : windowWidth / 2 - popupWidth / 2
        });
        return $box;
    }
}
$(function() {
    var Evalpop = function() {
        var $box = $("#evalpop-box").appendTo("body");

        var onlick = function(type) {
        }

        $box.find(".evalpop-item").bind("click", function() {
            var type = $(this).data("type");
            onlick(type);
            $box.hide();
        });

        return {
            show : function(_onclick) {
                onlick = _onclick;
                MUtils.CenterInWindow($box).show();
            }
        }
    }
    window.Evalpop = Evalpop();
});

$(function() {
    var flashCtrl = function(options) {
        
        options = $.extend({
            onSelect:function(type,active){},
            onSliderChange:function(type,value){}
        },options);
        
        function getLevel(val) {
            if (val >= 70 && val <= 100) {
                return 3;
            }
            if (val >= 30 && val <= 69) {
                return 2;
            }
            if (val >= 1 && val <= 29) {
                return 1;
            }
            if (val == 0) {
                return 0;
            }
        }

        function setLevelClass($box, val) {
            console.info(val);
            var lv = getLevel(val);
            var cls = $box.attr("class");
            cls = cls.replace(/_[0-9]/, "") + " _" + lv;
            $box.attr("class", cls);
        }

        var $wrap = $(".chatflash-ctrl");

        function sliderChange(e,obj){
            var value = obj.value;
            var $box = $(this).prev();
            var type = $box.data("data").type;
            if(type=="music"){
                MusicPop.setVol(value/100);
            }
            setLevelClass($box,value);
            options.onSliderChange(type,value);
        }

        function init() {
            
            $wrap.find("[data-init]").each(function() {
                var data = eval("("+$(this).data("init")+")");
                $(this).data("data",data);
                var active = data.active;
                if (active) {
                    $(this).addClass("active");
                }
                if("music"==data.type){
                    MusicPop.setVol(data.value/100);
                }
                var value = data.value;
                if (value) {
                    var $slider =  $(this).next().slider({
                        orientation : "horizontal",
                        range : "min",
                        max : 100,
                        value : value,
                        slide : sliderChange
                    }).hide();
                    setLevelClass($(this),value);
                }
            });
            $wrap.find(".slider-wrap").hover(function(){
                if($(this).find(".icon-sprite").hasClass("active")){
                    $(this).find(".flash-slider").show();
                }
                
            },function(){
                $(this).find(".flash-slider").hide();
            });
            $wrap.delegate(".icon-sprite","click",function(){
               var data = $(this).data("data");
               var type = data.type;
               if($(this).hasClass("active")){
                   
                   $(this).removeClass("active");
                   options.onSelect(type,false);
                   if(type=="music"){
                       MusicPop.hide();
                   }
                   if(data.value){
                       $(this).next().hide();
                   }
                   
               }else{
                   $(this).addClass("active");
                   options.onSelect(type,true);
                   if(type=="music"){
                       var offset= $(this).offset();
                       offset.top += $(this).outerHeight();
                       MusicPop.show(offset);
                   }
                   if(data.value){
                       $(this).next().show();
                   }
                  
                   
               }
            });
            
            
        }

        init();

        return {

        }
    }
    window.flashCtrl = flashCtrl;
});

$(function() {
    var MusicPop = function() {
        var $box = $("#musicpop-box").appendTo("body");
        var player = $("#playObj").jPlayer({
            cssSelectorAncestor : "#musicpop-box", // Remove the ancestor css selector clause
            cssSelector : {
                play : ".icon-mplay",
                pause : ".icon-mpause",
                stop : ".jp-stop",
                seekBar : ".seek",
                playBar : ".playBar",
                currentTime : ".seekBar-wrap .current",
                duration : ".total"
            },
            swfPath : "/js/player/",
            solution : "html,flash",
            supplied : "mp3",
            wmode : "window"
        });
        var lastActive;
        $box.delegate(".musicitem", "click", function() {
            if (lastActive) {
                lastActive.removeClass("current");
            }
            $(this).addClass("current");
            onListChange($(this));
            lastActive = $(this);

        });

        var onListChange = function($currentBox) {
            var music = $currentBox.data("music");
            play(music);
        }
        var play = function(music) {
            player.jPlayer("setMedia", {
                mp3 : music
            }).jPlayer("play");
        }

        return {
            show : function(offset) {
                $box.css({
                    left:offset.left+"px",
                    top:offset.top+"px"
                }).show();
                
            },
            hide : function() {
                $box.hide();
            },
            setVol:function(num){
                player.jPlayer("volume",num);
            }
        }
    }
    window.MusicPop = MusicPop();
});

$(function() {

    var CroompswPop = function() {
        var $box = $("#croompsw-box").appendTo("body");

        $box.find("form").validate({
            debug : true
        });

        return {
            show : function() {

                MUtils.CenterInWindow($box).show();
            },
            hide : function() {
                $box.hide();
            }
        }
    }
    window.CroompswPop = CroompswPop();

});

$(function() {
    var CInfopop = function() {
        var $box = $("#cinfopop-box");

        $box.find("button").bind("click", function() {
            $box.hide();
        });

        return {
            show : function(info) {
                MUtils.CenterInDom($box,$box.parent()).show().find("p").html(info);
            }
        }
    }
    window.CInfopop = CInfopop();
});

$(function() {
    var MEditor = function(id) {

        var $editor = $("#" + id);

        var lastSelectedRange;

        var content = "";

        $editor.bind("mouseup keyup blur", function() {
            if (window.getSelection) {
                lastSelectedRange = getSelection().getRangeAt(0);
                console.info(getSelection());
            }
        });

        return {
            insert : function(html) {

                var content = this.getContent();
                var leftContent = content.substring(0, startOffset + 1);
                console.info(content);
                var rightContent = content.substring(endOffset + 1, content.length);
                $editor.html(leftContent + html + rightContent);

            },
            setContent:function(val){
              $editor.html(val);  
            },
            append : function(html) {
                $editor.html(this.getContent() + html);
            },
            getContent : function() {
                return $editor.html();
            },
            clearContent : function() {
                $editor.html("");
            }
        }
    }

    window.MEditor = MEditor("chat-input");
});

(function($) {
    $.extend($.fn, {
        holderplace : function(options) {
            return this.each(function() {
                function onkeyup(e) {
                    (function($this) {
                        setTimeout(function() {
                            var length = $this.value.length;
                            if (length <= 0) {
                                $($this).siblings(".holder").show();
                            } else {
                                $($this).siblings(".holder").hide();
                            }
                        }, 20);

                    })(this);
                }


                $(this).delegate(".field-ui", "click", function() {
                    $(this).find("input[type='text'],input[type='password']").focus();
                });
                $(this).delegate("input[type='text'],input[type='password']", "keydown", onkeyup);

                $("input[type='text'],input[type='password']", this).each(function() {
                    onkeyup.call(this);
                });

            });
        }
    });
})(jQuery);

(function($) {
    $.extend($.fn, {
        widgetcheck : function(options) {
            return this.each(function() {
                function init() {
                    var ui = $(this).find('.field-check');
                    var $checkbox = $(this).find("input[type='checkbox']");
                    if ($checkbox.attr("checked")) {
                        ui.addClass("checked");
                        options.onchange && options.onchange.call(this, true);
                    } else {
                        ui.removeClass("checked");
                        options.onchange && options.onchange.call(this, false);
                    }
                }


                init.apply(this);
                $(this).bind("click", function() {
                    var ui = $(this).find('.field-check');
                    var $checkbox = $(this).find("input[type='checkbox']");
                    if ($checkbox.attr("checked")) {
                        $checkbox.attr("checked", false);
                        options.onchange && options.onchange.call(this, false);
                        ui.removeClass("checked");
                    } else {
                        $checkbox.attr("checked", true);
                        options.onchange && options.onchange.call(this, true);
                        ui.addClass("checked");
                    }

                });
            });
        }
    });
})(jQuery);

(function($) {
    $.extend($.fn, {
        score : function(options) {
            options = $.extend({
                score : 1,
                total : 5
            }, options);
            return this.each(function() {
                var score = options.score && $(this).attr("data-score");
                score = score > options.total ? options.total : score;
                $(this).find(".score").width(score * 18);
            });
        }
    });
})(jQuery);

(function($) {
    $.userlist = {};
    $.userlist.popbox = {};
    $.userlist.popbox.init = function() {
        $(document).delegate(".uchatpop-box,.roomuser-list", "click", function(e) {
            e.stopPropagation();
        });
        $(document).bind("click", function() {
            if ($.userlist.lastBox) {
                $.userlist.lastBox.remove();
            }
        });
        $(document).delegate(".uchatpop-box .operation a", "click", function() {
            var type = $(this).data("type");
            var $box = $(this).closest(".uchatpop-box");
            var info = $box.data("info");
            if ("reply" == type) {
                var username = info.username;
                MEditor.setContent("回复 " + username+" :&nbsp;");
                $box.remove();
            }
        });
    }
    $.userlist.popbox.init();
    $.userlist.popbox.show = function($box) {
        var lastBox = $.userlist.lastBox;
        if (lastBox) {
            lastBox.remove();
        }

        var offset = $box.offset();
        offset.left += $box.outerWidth();
        var info = eval("(" + $box.data("info") + ")");
        lastBox = $.tmpl($("#tmpl-uchatpop-box").template(), info).data("info", info).css({
            left : offset.left + "px",
            top : offset.top + "px"
        }).appendTo("body");
        $.userlist.lastBox = lastBox;
    }

    $.extend($.fn, {

        userlist : function(options) {
            options = $.extend({
                iconChange : function(type, id, active) {
                },
                itemChange : function(id) {
                }
            }, options);

            return this.each(function() {
                $(this).children().each(function() {
                    var $right = $(".useritem-right", this);
                    var $center = $(".useritem-center", this);
                    $center.css({
                        "margin-right" : ($right.width() + 1) + "px"
                    })
                });

                var $lastActive;

                $(this).delegate(".useritem-wrap", "click", function() {
                    if ($lastActive) {
                        $lastActive.removeClass("active");
                    }
                    $(this).addClass("active");
                    $.userlist.popbox.show($(this));
                    options.itemChange($(this).data("id"));
                    $lastActive = $(this);
                });

                $(this).delegate(".useritem-right .icon-sprite", "click", function(e) {
                    var id = $(this).closest(".useritem-wrap").data("id");
                    if ($(this).hasClass("active")) {
                        $(this).removeClass("active");

                        options.iconChange($(this).data("type"), id, false);
                    } else {
                        $(this).addClass("active");
                        options.iconChange($(this).data("type"), id, true);
                    }
                    e.stopPropagation();
                });
            });
        }
    });
})(jQuery);

//facepop widget
$(function() {
    $.facepop = {};

    $.facepop._box = $("#facepop-box").appendTo("body");

    $.facepop.init = function() {
        $("#face-pop-btn").bind("click", function(e) {
            var offset = $(this).offset();
            offset.left -= $.facepop._box.outerWidth() - $(this).width() + 5;
            offset.top -= $.facepop._box.outerHeight();
            $.facepop._box.css({
                left : offset.left + "px",
                top : offset.top + "px"
            }).toggle();
            e.stopPropagation();
        });
        $(document).bind("click", function() {
            $.facepop._box.hide();
        });

        $.facepop._box.delegate("a.operation", "click", function() {
            var html = $(this).html();
            MEditor.append(html);
        });
    }

    $.facepop.init();
});

(function($) {
    $.extend($.fn, {
        chatgroup : function(options) {
            options = $.extend({
                change : function(type) {
                },
                init : function(type) {
                }
            }, options);
            return this.each(function() {
                function change(i) {
                    $(this).children().each(function(j) {
                        var type = $(this).data("type");
                        if (j == i) {
                            $(this).replaceWith($('<font>' + this.innerHTML + '</font>').data("type", type));
                            options.change(type);
                        } else {
                            $(this).replaceWith($('<a href="#">' + this.innerHTML + '</a>').data("type", type));
                        }
                    });
                }

                (function(that) {
                    $(that).delegate("a", "click", function() {
                        change.call(that, $(this).index());
                    });
                    options.init($(that).find("font").data("type"));
                })(this);

            });
        }
    });
})(jQuery);

$(function() {
    ON_CHAT_RESIZE();
    $("[cascade-url]").each(function() {
        var url = $(this).attr("cascade-url");
        $(this).cascade({
            url : "/ajax/cascade.php"
        });
    });

    $(".score-box").score();

    $(".validate-form").validate();

    $(".roomuser-box").resizable({
        handles : "e",
        resize : ON_CHAT_RESIZE
    });
    $(".chatcon-box").resizable({
        handles : "w",
        resize : ON_CHAT_RESIZE
    });

    (function() {
        $("#room-open-btn").bind("click", function() {
            $(".roomuser-box").show();
            $(this).hide();
            ON_CHAT_RESIZE();
        });
        $("#room-hide-btn").bind("click", function() {
            $("#room-open-btn").show();
            $(".roomuser-box").hide();
            ON_CHAT_RESIZE();
        });
        $("#chatcon-open-btn").bind("click", function() {
            $(".chatcon-box").show();
            $(this).hide();
            ON_CHAT_RESIZE();
        });
        $("#chatcon-hide-btn").bind("click", function() {
            $("#chatcon-open-btn").show();
            $(".chatcon-box").hide();
            ON_CHAT_RESIZE();
        });

    })();

    $(".filed-check-wrap").widgetcheck({
        onchange : function(checked) {
            if (checked) {
                $(this).removeClass("disable");
                $("#signup-btn").removeClass("disable").attr("disabled", false);
            } else {
                $(this).addClass("disable");
                $("#signup-btn").addClass("disable").attr("disabled", true);
            }
        }
    });

    $(".valinum-wrap img,.valinum").bind("click", function() {
        var out1 = /(.*)/.exec($(this).attr('src'));
        var out2 = /(.*)\?/.exec($(this).attr('src'));
        var out = out2 || out1;
        if (out) {
            $(this).attr("src", out[1] + "?v=" + new Date().getTime());
        }
    });

    $(".fieldset-box").holderplace();
    // $(".field-check").widgetcheck();
    $("[effect-hover]").hover(function() {
        $(this).addClass("hover");
    }, function() {
        $(this).removeClass("hover");
    });
    $("[position-last]").each(function() {
        $(this).children("*:last").addClass('last');
    });
    $("#g-search-text").autocomplete("/ajax/search.php", {
        width : function() {
            return $("#header .search-ui").innerWidth();
        },
        offset : function() {
            var $ui = $("#header .search-ui");
            var _offset = $ui.offset();
            var height = $ui.height();

            _offset.top = _offset.top + height;
            return _offset;
        },
        alwayInInput : true,
        onEnter : function() {
            $(this).closest("form").submit();
        },
        onSelectClick : function() {
            $(this).closest("form").submit();
        }
    });
    $('.slide-box').nivoSlider({
        effect : 'random', // Specify sets like: 'fold,fade,sliceDown'
        slices : 15, // For slice animations
        boxCols : 8, // For box animations
        boxRows : 4, // For box animations
        animSpeed : 500, // Slide transition speed
        pauseTime : 5000, // How long each slide will show
        startSlide : 0, // Set starting Slide (0 index)
        directionNav : true, // Next & Prev navigation
        directionNavHide : true, // Only show on hover
        controlNav : false, // 1,2,3... navigation
        keyboardNav : false, // Use left & right arrows
        pauseOnHover : true, // Stop animation while hovering
        manualAdvance : false, // Force manual transitions
        captionOpacity : 1, // Universal caption opacity
        prevText : '', // Prev directionNav text
        nextText : '', // Next directionNav text
        beforeChange : function() {
        }, // Triggers before a slide transition
        afterChange : function() {
        }, // Triggers after a slide transition
        slideshowEnd : function() {
        }, // Triggers after all slides have been shown
        lastSlide : function() {
        }, // Triggers when last slide is shown
        afterLoad : function() {
        } // Triggers when slider has loaded
    });
    (function() {
        var headerHeight = $("#header").outerHeight();
        var bodyHeight = $("#page-bd").outerHeight();
        var footerHeight = $("#footer").outerHeight() + $("#footer").outerHeight();
        function footerAlwaysBottom() {
            var screenHeight = $("html").height();

            if (footerHeight + bodyHeight + headerHeight < screenHeight) {
                $("#footer").addClass("fix-bellow");
            } else {
                $("#footer").removeClass("fix-bellow");
            }
        }

        footerAlwaysBottom();
        $(window).bind("resize", footerAlwaysBottom);
    })();
    $("#g-user-upload").bind("change", function() {
        var value = this.value;

        if (!/(png|jpeg|jpg|gif)$/.test(value.toLowerCase())) {
            $("#g-upload-tip").html(I18N.imageTypeError)
        } else {
            $("#g-upload-tip").html("");
        }
    });
});
