<<<<<<< HEAD
<?php $this->pageTitle=1 ?>
<div class="liquid-box">
    <div class="form-box">
        <div class="form-outer">
            <header class="form-hd">
                注册成功!UID:<span class="blue bold">18766455656</span> 请查阅你的邮箱 <span class="bold size12">mail@mail.com,</span>点击链接来完成邮箱绑定.<a href="#">去邮箱查收</a>
            </header>
            <div class="form-bd">
                <form class="validate-form" method="post" action="signup">
                    <fieldset class="fieldset-box">
                        <div class="field-row">
                            <div class="field-ui">
                                <span class="holder">昵称</span>
                                <input type="text" maxlength="20" class="text" data-rule='[{name:"required",message:"请填写昵称"},{name:"nickname",message:"限制长度1~20个字符"}]'  name="nickname"/>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field-ui">
                                <span class="holder">密码</span>
                                <input type="password" maxlength="100" class="text" data-rule='[{name:"required",message:"请填写密码"},{name:"password",message:"限制长度9-100个字符"}]' name="password"/>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field-ui">
                                <span class="holder">邮箱(可选)</span>
                                <input type="text" class="text" data-rule='[{name:"email",message:"请输入合法的Email"}]' name="email"/>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="select-group clearfix" cascade-url="/ajax/search.php">
                                 <select name="country" data-rule='[{name:"selectrequired",message:"请选择地区"}]'>
                                    <option value="-1">请选择</option>
                                    <option>Z:中国</option>
                                </select>
                            </div>
                        </div>
                        <div class="field-row field-valinum">
                            <div class="field-left">
                                <div class="field-ui">
                                    <span class="holder">验证码</span>
                                    <input type="text" maxlength="10" class="text" data-rule='[{name:"required",message:"请填写验证码"},{name:"valinum",message:"限制长度1~10个字符"}]'  name="email"/>
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
                                <label>同意</label>
                            </div>
                            <a href="#">使用协议</a>

                        </div>
                    </fieldset>
                    <div class="form-ctrl">
                        <button class="wiget-btn" id="signup-btn" type="submit">
                            注册
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
=======
<?php $this->pageTitle=1 ?>
<div class="liquid-box">
    <div class="form-box">
        <div class="form-outer">
            <header class="form-hd">
                注册成功!UID:<span class="blue bold">18766455656</span> 请查阅你的邮箱 <span class="bold size12">mail@mail.com,</span>点击链接来完成邮箱绑定.<a href="#">去邮箱查收</a>
            </header>
            <div class="form-bd">
                <form class="validate-form" method="post" action="signup">
                    <fieldset class="fieldset-box">
                        <div class="field-row">
                            <div class="field-ui">
                                <span class="holder">昵称</span>
                                <input type="text" maxlength="20" class="text" data-rule='[{name:"required",message:"请填写昵称"},{name:"nickname",message:"限制长度1~20个字符"}]'  name="nickname"/>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field-ui">
                                <span class="holder">密码</span>
                                <input type="password" maxlength="100" class="text" data-rule='[{name:"required",message:"请填写密码"},{name:"password",message:"限制长度9-100个字符"}]' name="password"/>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="field-ui">
                                <span class="holder">邮箱(可选)</span>
                                <input type="text" class="text" data-rule='[{name:"email",message:"请输入合法的Email"}]' name="email"/>
                            </div>
                        </div>
                        <div class="field-row">
                            <div class="select-group clearfix" cascade-url="/ajax/search.php">
                                 <select name="country" data-rule='[{name:"selectrequired",message:"请选择地区"}]'>
                                    <option value="-1">请选择</option>
                                    <option>Z:中国</option>
                                </select>
                            </div>
                        </div>
                        <div class="field-row field-valinum">
                            <div class="field-left">
                                <div class="field-ui">
                                    <span class="holder">验证码</span>
                                    <input type="text" maxlength="10" class="text" data-rule='[{name:"required",message:"请填写验证码"},{name:"valinum",message:"限制长度1~10个字符"}]'  name="email"/>
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
                                <label>同意</label>
                            </div>
                            <a href="#">使用协议</a>

                        </div>
                    </fieldset>
                    <div class="form-ctrl">
                        <button class="wiget-btn" id="signup-btn" type="submit">
                            注册
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
>>>>>>> 46323a925819603fd2890a35b7ea72bb54003ead
</div>