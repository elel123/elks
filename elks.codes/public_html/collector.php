#!/usr/bin/php
<?php
    
    // $data->agent = $_SERVER['HTTP_USER_AGENT'];
    $data->agent = null;
    $data->language = null;
    $data->acceptsCookies = null;
    $data->allowsJavascript = false;
    $data->screenWidth = null;
    $data->screenHeight = null;
    $data->windowWidth = null;
    $data->windowHeight = null;
    $data->networkType = null;
    $data->allowsImages = null;
    $data->allowsStyles = null;

    $options = array(
        'http' => array(
            'method'  => 'POST',
            'content' => json_encode( $data ),
            'header'=>  "Content-Type: application/json\r\n" .
                        "Accept: application/json\r\n"
        )
    );
        
    $url = 'https://elks.codes/server/api/static';
    $context  = stream_context_create( $options );
    $result = file_get_contents( $url, false, $context );
    $response = json_decode( $result );

    
?>
    

