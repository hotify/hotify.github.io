<?php

$site           = 'Siena Template'; // Put the name of your website
$to             = 'email@example.com'; // Put the email address

$name           = (isset($_POST['name']))    ? $_POST['name']     : "";
$email          = (isset($_POST['email']))   ? $_POST['email']    : "";
$subject        = (isset($_POST['subject'])) ? $_POST['subject']  : "";
$message        = (isset($_POST['message'])) ? $_POST['message']  : "";

if(empty($to)) {
    header('HTTP/1.1 200 OK');
    echo esc_attr( $result );
    exit();
} else {
    $html        = htmlentities($message, ENT_QUOTES, "UTF-8") . "<br>\n";
    $html       .= 'Sent from' . $site;

    $headers     = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
    $headers    .= 'From: ' . $name . "<". $email .">\r\n";
    $headers    .= 'Reply-To: ' .  $email . "\r\n";

    $html       = utf8_decode($html);

    mail($to, $subject, $html, $headers);

    if ($html) $result  = "ok";

    header('HTTP/1.1 200 OK');
    echo $result;
    exit();
} ?>