<?php
Yii::import('zii.widgets.CPortlet');


class Slide extends CPortlet
{
    

    protected function renderContent()
    {
        $this->render('slide');
    }
}