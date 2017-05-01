<?php

// te bereiken op: https://i321720.iris.fhict.nl/php/d.php?target=
header("Access-Control-Allow-Origin: *");

include 'simple_html_dom.php';

$url = transform($_GET['target']);
$html = file_get_html($url);

foreach ($html->find('article.comment') as $comment) {
    $kudos = $comment->getAttribute('data-kudos');

    // alleen positieve comments
    if (intval($kudos) > 0) {
        // comments met linkje
        if ($comment->find('a', 0)->innertext !== '+') {
            echo $comment;
        }
    }
}

function transform($url)
{
    $split = explode('/', $url);

    return 'https://comments.dumpert.nl/embed/' . $split[4] . '/' . $split[5] . '/comments/';
}