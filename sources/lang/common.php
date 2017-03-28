<?php
/**
 * Created by IntelliJ IDEA.
 * User: thobber
 * Date: 14.02.17
 * Time: 14:38
 */

session_start();
header('Cache-control: private'); // IE 6 FIX
if(isSet($_GET['lang']))
{
    $lang = $_GET['lang'];
// register the session and set the cookie
    $_SESSION['lang'] = $lang;
    setcookie('lang', $lang, time() + (3600 * 24 * 30));
}
else if(isSet($_SESSION['lang']))
{
    $lang = $_SESSION['lang'];
}
else if(isSet($_COOKIE['lang']))
{
    $lang = $_COOKIE['lang'];
    $_SESSION["lang"] = $lang;
}
else
{
    $lang = 'en';
    $_SESSION["lang"] = "en";
}
switch ($lang) {
    case 'en':
        $lang_file = 'lang.en.php';
        break;
    case 'no':
        $lang_file = 'lang.no.php';
        break;
    default:
        $lang_file = 'lang.en.php';
        $_SESSION["lang"] = "en";
}
include_once $lang_file;