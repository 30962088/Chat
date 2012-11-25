<?php
Yii::import('zii.widgets.CPortlet');


class WaterFall extends CPortlet
{


    protected function renderContent()
    {
        $this->render('waterFall');
    }
}