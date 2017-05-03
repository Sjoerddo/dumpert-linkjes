<?php

// te bereiken op: https://i321720.iris.fhict.nl/php/linkjes_scrape.php?target=
header("Access-Control-Allow-Origin: *");

include 'get_html.php';

$html = get_html(transform_url($_GET['target']));

foreach ($html->find('article.comment') as $comment) {
    $kudos = $comment->getAttribute('data-kudos');

    // alleen positieve comments
    if (intval($kudos) >= 0) {
        // comments met linkje
        if ($comment->find('a', 0)->innertext !== '+') {
            echo $comment;
        }
    }
}

function transform_url($url)
{
    $split = explode('/', $url);
    return 'https://comments.dumpert.nl/embed/' . $split[4] . '/' . $split[5] . '/comments/';
}
