<div class="waterfall-box clearfix">
    
    <?php
     $arr = array(150,135,256,194,194,151,149,85,118);
     $height = array();
     for($i=1;$i<=9;$i++) {
    ?>
    <script>
        function INTRO_IMG_LOAD (img){
           var $parent = $(img).parent();
           $(img).siblings(".icon-sprite").css({
               
               top:($(img).position().top+5)+"px"
           }).show();
          
        }
    </script>
    <div class="intro-box <?php if($i%7 ==0 ) echo "bgpink";?>" style="width:<?php echo ($arr[$i-1]+10)."px"; ?>;height:198px;">
        <a href="#" class="intro-outer">
            <div class="intro-bd">
                <div class="intro-wrap">
                    <div class="inblock">
                        <img src="/images/img<?php echo $i; ?>.jpg" onload="INTRO_IMG_LOAD(this)"></img>
                        <?php if($i%2 ==0 ) {?>
                            <span class="icon-sprite icon-HD"></span>
                        <?php }else{?>
                            <span class="icon-sprite icon-redheart"></span>
                        <?php }?>
                        
                    </div>
                </div>
            </div>
            <footer class="intro-fd">
                <div >
                    <span class="name blue">NAGISA73</span>
                    <span class="loc"><font>韩国</font>&nbsp;<font>首尔</font>&nbsp;</span>
                    <span class="old">25岁</span>
                </div>
            </footer>
        </a>
    </div>
    <?php } ?>
</div>

