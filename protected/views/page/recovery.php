<?php $this->pageTitle=1 ?>
<div class="liquid-box">
    <div class="form-box">
        <div class="form-outer">
            <header class="form-hd">
                请查阅您的邮箱 <span class="bold size12">mail@mail.com</span>,点击邮箱中的链接来重设密码.&nbsp;&nbsp;<a href="#">去邮箱查收</a>
            </header>
            <div class="form-bd">
                <form class="validate-form" method="post" action="signup">
                    <fieldset class="fieldset-box">
                        <div class="field-row">
                            <div class="field-ui">
                                <span class="holder">邮箱</span>
                                <input type="text" class="text" data-rule='[{name:"required",message:"请填写邮箱"},{name:"email",message:"请输入合法的Email"}]' name="email"/>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field-ui">
                                <span class="holder">新密码</span>
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
                    </fieldset>
                    <div class="form-ctrl">
                        <button class="wiget-btn" type="submit">
                            取回密码
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>