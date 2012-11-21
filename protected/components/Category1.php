<?php
Yii::import('zii.widgets.CPortlet');


class Category1 extends CPortlet
{
    

    protected function renderContent()
    {
        $this->render('category1');
    }
}