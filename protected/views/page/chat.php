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
                                ?>
                                <div class="useritem-wrap" data-id="5">
                                    <div class="useritem-outer">
                                        <div class="useritem-left">
                                            <img src="/images/user<?php echo $i; ?>.png"/>
                                        </div>
                                        <div class="useritem-center">
                                            <?php if($i%4 == 0){
                                            ?>
                                            <p class="name blue bold">
                                                扯不断的红尘(29982093)
                                            </p>
                                            <?php }else{ ?>
                                            <p class="name">
                                                扯不断的红尘(293)
                                            </p>
                                            <?php } ?>
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
                                <?php for($i = 1;$i<=10;$i++){?>
                                <div class="chatcon-item">
                                    <div class="chatitem-box">
                                        <div class="chatitem-outer">
                                            <div class="chatitem-hd">
                                                <h5 class="title">紫霞仙子(1001):</h5>
                                            </div>
                                            <div class="chatitem-bd">
                                                <p>你好啊你好啊你好啊你好啊你好啊~</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <?php }?>
                            </div>
                            <div class="chatcon-fd">
                                <form id="chat-form">
                                    <input type="text"/>
                                    <div class="ctrl-wrap">
                                        <span class="icon-sprite icon-image"></span>
                                        <span class="icon-sprite icon-face"></span>
                                        <button class="icon-sprite icon-enter"></button>
                                    </div>
                                </form>
                                
                                
                            </div>
                        </div>
                        <script>
                        $("#chat-form").bind("submit",function(){
                               var val = $(this).find("input[type='text']").val();
                               if(val.length>0){
                                   CHAT.insert({
                                       title:{
                                           'class':'red bold',
                                           'html':'标题'
                                       },
                                       content:[{
                                           'class':'blue',
                                           'html': val
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