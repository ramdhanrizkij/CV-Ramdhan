<?php

    // PHP script for sending emails

    // Function to sanitize text
    function sanitize_string($str){
        $clean_str = filter_var($str, FILTER_SANITIZE_STRING);
        
        return $clean_str;
    }

    // Function to sanitize email address
    function sanitize_email($email) {
        $clean_email = filter_var($email, FILTER_SANITIZE_EMAIL);

        if(filter_var($clean_email, FILTER_VALIDATE_EMAIL)) {
            return $clean_email;
        } else {
            return false;
        }
    }

    // Visitor's name
    $name = $_POST['name'];
    $name = sanitize_string(trim($name)); // Safe name
    
    if( trim($name) === '' ){
        echo -1;
        exit();
    }

    // Visitor's email address
    $visitor_email = $_POST['email'];
    if( trim($visitor_email) === '' ){
        echo -1;
        exit();
    }

    $visitor_email = sanitize_email(trim($visitor_email));
    if($visitor_email === false){ // If invalid visitor email => Stop
        echo -1;
        exit(); 
    }

    // Visitor's message
    $message = $_POST['message'];
    if( trim($message) === '' ){
        echo -1;
        exit();
    }

    $message = sanitize_string(trim($message)); // Safe message

    // Type your email address on which you want to receive emails in quotes in below line of code
    $my_email = 'ramdhanrizki11@gmail.com';
    $subject = 'Message from - '. $name;

    // Headers
    $header = "From:$visitor_email \r\n";
    $header .= "MIME-Version: 1.0\r\n";
    $header .= "Content-type: text/html\r\n";

    $retval = mail($my_email, $subject, $message, $header);
         
    if( $retval == true ) {
        echo 1;
    }else {
        echo -1;
    }

?>