<?php
class PageController extends Controller{
	public function actionIndex(){
		$this->render('index');
	}
    public function actionList(){
        $this->render('list');
    }
    public function actionSignup(){
        $this->render('signup');
    }
    public function actionLogin(){
        $this->render('login');
    }
    public function actionRecovery(){
        $this->render('recovery');
    }
    public function actionChat(){
        $this->render("chat");
    }
}
