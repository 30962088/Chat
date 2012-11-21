<?php

$name = strtolower(@$_REQUEST["name"]);
$value = strtolower(@$_REQUEST["value"]);

if($value != "-1"){
    if($name=="country"){
        echo "({name:'province',datas:[{id:-1,value:'请选择'},{id:1,value:'北京'},{id:2,value:'重庆'}]})";
    }else if($name == "province"){
        echo "({name:'city',datas:[{id:1,value:'西城区'},{id:2,value:'海淀区'}]})";
    }
    
}

