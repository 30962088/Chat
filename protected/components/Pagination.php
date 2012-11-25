<?php
Yii::import('zii.widgets.CPortlet');


class Pagination extends CPortlet
{

    protected function renderContent()
    {
        $this->render('pagination');
    }
}