<?php
Yii::import('zii.widgets.CPortlet');


class Category extends CPortlet
{
    

    protected function renderContent()
    {
        $this->render('category');
    }
}