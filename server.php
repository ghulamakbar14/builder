<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
//print_r($request);
$type = $request->type;
$data = $request->data;

/* Config array posted. Save data array in concerned DB table */
if($type == 'config'){
    print_r($data);
}
/* Question array posted. Save data array in concerned DB table */
if($type == 'question'){
    print_r($data);
}
/* Data array posted. Save data array in concerned DB table */
if($type == 'data'){
    print_r($data);
}
?>