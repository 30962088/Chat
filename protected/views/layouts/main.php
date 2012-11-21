<!DOCTYPE html>
<!--[if lt IE 9]>
<html class="ie_lt9">
<!--[else]>  
<html>
<![endif]-->

    <head>
        <title>首页</title>
        
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="<?php echo Yii::app() -> request -> baseUrl; ?>/css/reset.css"/>
        <link rel="stylesheet" href="<?php echo Yii::app() -> request -> baseUrl; ?>/css/global.css"/>
        <link rel="stylesheet" href="<?php echo Yii::app() -> request -> baseUrl; ?>/css/icon.css"/>
        <link rel="stylesheet" href="<?php echo Yii::app() -> request -> baseUrl; ?>/css/nivo-slider.css"/>
        <link rel="stylesheet" href="<?php echo Yii::app() -> request -> baseUrl; ?>/css/jquery.autocomplete.css"/>
        <link rel="stylesheet" href="<?php echo Yii::app() -> request -> baseUrl; ?>/css/style.css"/>
        
        <!--[if lt IE 9]>
        <script src="<?php echo Yii::app()->request->baseUrl;?>/js/html5.js"></script>
        <![endif]-->
        <script src="<?php echo Yii::app() -> request -> baseUrl; ?>/js/jquery-1.8.2.min.js"></script>
        <script src="<?php echo Yii::app() -> request -> baseUrl; ?>/js/jquery-ui-1.9.1.custom.min.js"></script>
        <script src="<?php echo Yii::app() -> request -> baseUrl; ?>/js/jquery.validate.js"></script>
        <script src="<?php echo Yii::app() -> request -> baseUrl; ?>/js/jquery.nivo.slider.pack.js"></script>
        <script src="<?php echo Yii::app() -> request -> baseUrl; ?>/js/jquery.autocomplete.js"></script>
        <script src="<?php echo Yii::app() -> request -> baseUrl; ?>/js/jquery.cascade-select.js"></script>
        <script src="<?php echo Yii::app() -> request -> baseUrl; ?>/js/common.js"></script>
        <script src="<?php echo Yii::app() -> request -> baseUrl; ?>/js/i18n.js"></script>
    </head>
    <body>
        <header id="header">

            <div id="header-bg-color"></div>
            <div id="header-bg-image" class="global-bg"></div>
            <div id="header-hd">
                <div class="liquid-box">
                    <aside class="loc-box">
                        <div class="fl">
                            <div id="g-loc-select" cascade-url="/ajax/search.php" class="fl">
                                <select class="bold" name="country">
                                    <option>Z:中國</option>
                                    <option>R:日本</option>
                                </select>
                            </div>
                            <div id="g-lang-select" class="fl">
                                <select class="red">
                                    <option>哈哈</option>
                                </select>
                            </div>
                            
                        </div>
                        
                        
                    </aside>
                    <div class="center-wrap">
                        <div class="center-outer inblock">
                            <a href="index">
                                <span class="logo-sprite logo-logo1"></span>
                            </a>
                            <div class="search-wrap">
                                <form action="#" method="get">
                                    <fieldset>
                                        <div class="search-ui">
                                            <div class="search-ui-outer">
                                                
                                                <input type="text" id="g-search-text" name="s"/>
                                                <script src="<?php echo Yii::app() -> request -> baseUrl; ?>/js/data/city.js"></script>
                                                <script></script>
                                            </div>
                                            <div class="search-btn">
                                                <span class="icon-sprite icon-search-black" type="submit"></span>
                                                <button type="submit"></button>
                                            </div>
                                            
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <nav class="nav-wrap">
                                <ul position-last>
                                    <li>
                                        <a href="#">浏览</a>
                                    </li>
                                    <li>
                                        <a href="#">排行</a>
                                    </li>
                                    <li>
                                        <a href="#">其他</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <aside class="right-box">
                        <?php if($this->pageTitle ==1){ ?>
                            <div class="unlogin-wrap">
                                <a href="signup">注册</a>
                                <a href="login">登录</a>
                            </div>
                            
                            
                        <?php }else{ ?>
                            
                        
                        <span class="username">紫霞仙子</span>
                        <span class="icon-sprite icon-redheart" title="红心"></span>
                        <span class="icon-sprite icon-camera"></span>
                        <div class="user-box" effect-hover>
                            <div class="image-box">
                                <span class="icon-sprite icon-user-small"></span>
                                <span class="loading-small"></span>
                            </div>
                            <div class="detail-box">
                                <div class="detail-outer clearfix">
                                    <aside class="detail-left">
                                        <div class="detail-image">
                                            <span class="icon-sprite icon-user-large">
                                                
                                            </span>
                                            <input type="file" id="g-user-upload"/>
                                            <span class="loading-large"></span>
                                        </div>
                                        <p class="orange" id="g-upload-tip">
                                            图片大小不可超过1024K
                                        </p>
                                    </aside>
                                    <aside class="detail-right">
                                        <h5>紫霞仙子</h5>
                                        <p class="gray size12">
                                            mail@mail.com
                                        </p>
                                        <p class="col2">
                                            <span class="orange bold">金币:2718</span>
                                            <a href="#">充值</a>
                                            <a href="#">提现</a>
                                        </p>
                                        <p>
                                            <a href="#">我的账户</a>
                                        </p>
                                        <p>
                                            <a href="#">我的房间</a>
                                        </p>
                                        <p>
                                            <a href="#">我的收藏</a>
                                        </p>
                                        <p>
                                            <a href="#">经纪管理</a>
                                        </p>
                                        <p>
                                            <a href="#">修改密码</a>
                                        </p>
                                    </aside>
                                </div>

                                <div class="invite-wrap">
                                    邀请链接:http://www.domain.com/i?19982091
                                </div>
                                <p class="logout">
                                    <a href="#" class="bold">退出</a>
                                </p>
                            </div>
                        </div>
                        <?php }?>
                    </aside>
                    
                </div>
            </div>
        </header>
        <section id="page-bd">
            <?php echo $content ?>
        </section>
        <footer id="footer">
            <div class="liquid-box">
                <div class="footer-left">
                    <a class="icon-sprite icon-RTA" href="#"></a>
                </div>
                <div class="footer-center">
                    <div class="inblock">
                        <nav>
                            <ul>
                                <li>
                                    <a href="#">关于我们</a>
                                </li>
                                <li>
                                    <a href="#">关于我们</a>
                                </li>
                                <li>
                                    <a href="#">关于我们</a>
                                </li>
                                <li>
                                    <a href="#">关于我们</a>
                                </li>
                                <li>
                                    <a href="#">关于我们</a>
                                </li>
                                <li class="gray">
                                    &copy;2011 Chat
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="footer-right">
                    <a class="icon-sprite icon-ICRA" href="#"></a>
                </div>
            </div>
            
        </footer>
        
    </body>
</html>