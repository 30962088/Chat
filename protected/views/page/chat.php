<div class="chat-box">
    <div class="liquid-box">
        <header class="chat-hd">

            <aside class="chat-hd-left">
                <span class="icon-sprite icon-china"></span>
                <span>中国</span>
                <span>上海</span>&nbsp;&nbsp; <span>20岁</span>
            </aside>
            <div class="chat-hd-center">
                <div class="inblock">
                    <font class="bold green">紫霞仙子&nbsp;&nbsp;(182909)</font>
                    <font class="green">快乐每一天~</font>
                    <span class="chat-group"> <font data-type="1">公聊</font> <a href="#" data-type="2">群聊(1分钟10金币)</a> <a href="#" data-type="3">群聊(1分钟10金币)</a> </span>
                    <script>
                        $(".chat-group").chatgroup({
                            //改变的时候触发,type为data-type的值
                            change : function(type) {

                            },
                            //初始化的时候触发,type为font的data-type
                            init : function(type) {

                            }
                        });
                    </script>

                </div>
            </div>
            <aside class="chat-hd-right">
                <div class="score-box" data-score="1.5">
                    <span class="icon-sprite score-bg"></span>
                    <span class="icon-sprite score"></span>
                </div>
                &nbsp;&nbsp;
                <span class="icon-sprite icon-heart"></span>
            </aside>
        </header>
    </div>
    <div class="chat-bd">
        <div class="room-box">
            <div class="liquid-box">
                <div class="room-left">

                    <div id="room-open-btn" class="icon-sprite icon-hbtn active" style="display: none;"></div>

                    <div class="roomuser-box ui-widget-content" style="width: 200px;">
                        <header class="roomuser-hd">
                            <div class="roomuser-hd-outer">
                                <span class="icon-sprite icon-user1"></span>
                                <span>1280</span>
                                <span class="icon-sprite icon-gold"></span>
                                <span>1134/51290</span>
                                <aside id="room-hide-btn" class="icon-sprite icon-hbtn"></aside>
                            </div>
                        </header>
                        <div class="roomuser-bd">
                            <div class="roomuser-list">

                                <?php for($j=0;$j<3;$j++){  for($i = 1;$i<=10;$i++){
if($i%4 == 0){
$username = "扯不断的红尘(29982093)";
}else{
$username = "扯不断的红尘(293)";
}
                                ?>
                                <div class="useritem-wrap" data-id="5" data-info="{id:5,username:'<?php echo $username?>',sign:'快乐每一天',from:'中国',old:28,sex:'男',pic:'/images/user<?php echo $i; ?>.png'}">
                                    <div class="useritem-outer">
                                        <div class="useritem-left">
                                            <img src="/images/user<?php echo $i; ?>.png"/>
                                        </div>
                                        <div class="useritem-center">
                                            <p class="name blue bold">
                                                <?php echo $username ?>
                                            </p>
                                        </div>
                                        <div class="useritem-right">
                                            <div class="useritem-right-outer">
                                                <?php if($i%5 == 0){
                                                ?>
                                                <span data-type="camera" class="icon-sprite icon-camera-s-gray active"></span>
                                                <span data-type="mic" class="icon-sprite icon-mic-s-gray active"></span>
                                                <?php }else if($i%4){ ?>
                                                <span data-type="camera" class="icon-sprite icon-camera-s-gray active"></span>
                                                <?php }else{ ?>
                                                <?php } ?>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <?php }} ?>
                            </div>
                            <div class="roomuser-bottom white">
                                (122 Guests)
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-center">
                    <div class="chatflash-box">
                        <div class="chatflash-bd">
                            <div class="flash-wrap">
                                <embed src="/images/7ff.swf" quality="high" width="984" height="90" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" wmode="opaque"/>
                            </div>
                        </div>
                        <div class="chatflash-fd">
                            <div class="inblock">
                                <div class="chatflash-ctrl">
                                    <span class="icon-sprite icon-vol" data-type="vol" data-value="0"></span>
                                    <span class="icon-sprite icon-camera-b" data-type="camera"></span>
                                    <span class="icon-sprite icon-mic-b" data-type="mic" data-value=""></span>
                                    <span class="icon-sprite icon-close-b" data-type="close"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="room-right">
                    <div id="chatcon-open-btn" class="icon-sprite icon-hbtn active" style="display: none;"></div>
                    <div class="chatcon-box ui-widget-content" style="width: 200px;">
                        <div class="chatcon-hd">
                            <div class="chatcon-hd-outer">
                                <div class="chatcon-hd-left">
                                    <div class="icon-sprite icon-gift"></div>
                                </div>
                                <div class="chatcon-hd-center">
                                    <div class="field-ui">
                                        <input type="text"/>
                                        <span class="icon-sprite icon-enter"></span>
                                    </div>
                                </div>
                                <div class="chatcon-hd-right">
                                    <div id="chatcon-hide-btn" class="icon-sprite icon-hbtn"></div>
                                </div>
                            </div>
                        </div>
                        <div class="chatcon-bd">
                            <div class="chatcon-list">
                                <?php for($i = 1;$i<=10;$i++){
                                ?>
                                <div class="chatcon-item">
                                    <div class="chatitem-box">
                                        <div class="chatitem-outer">
                                            <div class="chatitem-hd">
                                                <h5 class="title">紫霞仙子(1001):</h5>
                                            </div>
                                            <div class="chatitem-bd">
                                                <p>
                                                    你好啊你好啊你好啊你好啊你好啊~
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <?php } ?>
                            </div>
                            <div class="chatcon-fd">
                                <form id="chat-form">
                                    <div class="chatinput-wrap">
                                        <div type="text" id="chat-input" contenteditable="true"></div>
                                    </div>

                                    <div class="ctrl-wrap">
                                        <span class="icon-sprite icon-image"></span>
                                        <a href="javascript:void(0)" id="face-pop-btn"> <span class="icon-sprite icon-face"></span> </a>
                                        <button class="icon-sprite icon-enter"></button>
                                    </div>
                                </form>

                            </div>
                        </div>
                        <script>
                            $("#chat-form").bind("submit", function() {
                                var val = MEditor.getContent();
                                if (val.length > 0) {
                                    CHAT.insert({
                                        title : {
                                            'class' : 'red bold',
                                            'html' : '标题'
                                        },
                                        content : [{
                                            'class' : 'blue',
                                            'html' : val
                                        }]
                                    });
                                }

                                return false;
                            });

                        </script>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="evalpop-box common-pop-box clearfix" id="evalpop-box" style="display: none;">
    <div class="evalpop-item good" data-type="good">
        <div class="icon-sprite icon-good"></div>
        <p>
            好评+1
        </p>
    </div>
    <div class="evalpop-item bad" data-type="bad">
        <div class="icon-sprite icon-bad"></div>
        <p>
            差评-1
        </p>
    </div>
</div>
<!--
<script>
$(function(){
Evalpop.show(function(type){
console.info(type);
});
});
</script>
-->

<div class="cinfopop-box common-pop-box" id="cinfopop-box" style="display: none;">
    <p>
        提示信息
    </p>
    <button class="common-pop-btn">
        确认
    </button>
</div>
<!--
<script>
$(function(){
CInfopop.show("hehe");
});
</script>
-->

<div class="croompsw-box common-pop-box" id="croompsw-box" style="display: none;">
    <form class="validate-form" method="post" action="signup">
    <fieldset class="fieldset-box">
        <div class="field-row">
            <div class="field-ui">
                <span class="holder">房间密码</span>

                <input type="text" name="nickname" data-rule='[{name:"required",message:"请填写密码"},{name:"password",message:"限制长度9-100个字符"}]' class="text">
                
            </div>
        </div>
        <div class="field-row">
            <div class="field-ui">
                <span class="holder">验证码</span>
                <input type="password" name="password" data-rule='[{name:"required",message:"请填写验证码"},{name:"valinum",message:"限制长度1~10个字符"}]' class="text" maxlength="100">
            </div>
        </div>
        <div class="field-row" align="center">
            <img src="/images/valinum.jpg"/>
        </div>
        
    </fieldset>
    <button class="common-pop-btn">
        确认
    </button>
    </form>
</div>

<div class="facepop-box common-pop-box" id="facepop-box" style="display: none;">
    <ul class="clearfix">
        <?php for($i = 1;$i<=10;$i++) {?>
        <li>
            <div class="face-wrap">
                <a href="javascript:void(0)" class="operation"> <img alt="@" class="icon-sprite icon-face<?php echo $i ?>" style="width: 24px;height:24px;"/> </a>
            </div>
        </li>
        <?php } ?>
        <?php for($i = 1;$i<=5;$i++) {?>
        <li>
            <div class="face-wrap">
                <a href="javascript:void(0)" class="operation"> <img  alt="@" src="/images/<?php echo $i ?>.jpg"/> </a>
            </div>
        </li>
        <?php } ?>
    </ul>
</div>
<script id="tmpl-uchatpop-box" type="text/x-jquery-tmpl">
    <div class="uchatpop-box common-pop-box" data-id="${id}">
    <div class="uchatpop-left">
    <div class="user-pic">
    {{if pic}}
    <img src="${pic}"/>
    {{else}}
    <div class="icon-sprite icon-user-large"></div>
    {{/if}}

    </div>
    <div class="user-level">
    <span class="icon-sprite icon-star inblock"></span>
    </div>
    </div>
    <div class="uchatpop-right">
    <h5 class="username">${username}</h5>
    <div class="operation">
    <a href="javascript:void(0)" data-type="info">禁言</a>
    <a href="javascript:void(0)" data-type="">提出</a>
    <a href="javascript:void(0)" data-type="">拉黑</a>
    </div>
    <p class="sign">${sign}</p>
    <p class="from">
    <label>来自</label>
    <font>${from}</font>
    </p>
    <p class="old">
    <label>年龄</label>
    <font>${old}</font>
    </p>
    <p class="sex">
    <label>性别</label>
    <font>${sex}</font>
    </p>
    <div class="operation">
    <a href="javascript:void(0)" data-type="reply">回复</a>
    </div>
    </div>
    </div>
</script>
<script>
    $(".roomuser-list").userlist({
        iconChange : function(type, id, active) {
            console.info(type, id, active);
        },
        itemChange : function(id) {
            console.info(id);
        }
    });
    $(".chatflash-ctrl").chatCtrl(); 
</script>
