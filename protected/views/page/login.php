<<<<<<< HEAD
<?php $this->pageTitle=1 ?>
<div class="liquid-box">
    <div class="form-box">
        <div class="form-outer">
            <header class="form-hd center">
                请先&nbsp;<a href="#">登录</a>&nbsp;或&nbsp;<a href="#">注册</a>
            </header>
            <div class="form-bd">
                <form class="validate-form" method="post" action="signup">
                    <fieldset class="fieldset-box">
                        <div class="field-row">
                            <div class="field-ui">
                                <span class="holder">邮箱/UID</span>
                                
                                <input type="text" class="text" data-rule='[{name:"required",message:"请填写邮箱/UID"},{name:"uid/email",message:"非法输入"}]'  name="nickname"/>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field-ui">
                                <span class="holder">密码</span>
                                <input type="password" maxlength="100" class="text" data-rule='[{name:"required",message:"请填写密码"},{name:"password",message:"限制长度9-100个字符"}]'  name="password"/>
                            </div>
                        </div>
                        <div class="field-row field-valinum">
                            <div class="field-left">
                                <div class="field-ui">
                                    <span class="holder">验证码</span>
                                    <input type="text" maxlength="10" class="text" data-rule='[{name:"required",message:"请填写验证码"},{name:"valinum",message:"限制长度1~10个字符"}]' name="email"/>
                                </div>
                            </div>
                            
                            <div class="valinum-wrap">
                                <img src="/images/valinum.jpg"/>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="filed-check-wrap inblock">
                                <span class="field-check">
                                    <input type="checkbox" name="ok"/>
                                </span>
                                <label>保持登录状态</label>
                            </div>
                            <a class="fr" href="#">取回密码</a>
                        </div>
                    </fieldset>
                    <div class="form-ctrl">
                        <button class="wiget-btn" type="submit">
                            登录
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
=======
<?php $this->pageTitle=1 ?>
<div class="liquid-box">
    <div class="form-box">
        <div class="form-outer">
            <header class="form-hd center">
                请先&nbsp;<a href="#">登录</a>&nbsp;或&nbsp;<a href="#">注册</a>
            </header>
            <div class="form-bd">
                <form class="validate-form" method="post" action="signup">
                    <fieldset class="fieldset-box">
                        <div class="field-row">
                            <div class="field-ui">
                                <span class="holder">邮箱/UID</span>
                                
                                <input type="text" class="text" data-rule='[{name:"required",message:"请填写邮箱/UID"},{name:"uid/email",message:"非法输入"}]'  name="nickname"/>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field-ui">
                                <span class="holder">密码</span>
                                <input type="password" maxlength="100" class="text" data-rule='[{name:"required",message:"请填写密码"},{name:"password",message:"限制长度9-100个字符"}]'  name="password"/>
                            </div>
                        </div>
                        <div class="field-row field-valinum">
                            <div class="field-left">
                                <div class="field-ui">
                                    <span class="holder">验证码</span>
                                    <input type="text" maxlength="10" class="text" data-rule='[{name:"required",message:"请填写验证码"},{name:"valinum",message:"限制长度1~10个字符"}]' name="email"/>
                                </div>
                            </div>
                            
                            <div class="valinum-wrap">
                                <img src="/images/valinum.jpg"/>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="filed-check-wrap inblock">
                                <span class="field-check">
                                    <input type="checkbox" name="ok"/>
                                </span>
                                <label>保持登录状态</label>
                            </div>
                            <a class="fr" href="#">取回密码</a>
                        </div>
                    </fieldset>
                    <div class="form-ctrl">
                        <button class="wiget-btn" type="submit">
                            登录
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
>>>>>>> 46323a925819603fd2890a35b7ea72bb54003ead
