<?php

require_once('/var/www/wp-load.php');

$posts = get_posts(array('numberposts' => 10));
foreach($posts as &$post)
{
    $post->permalink = get_permalink($post);
}
echo json_encode($posts);
die();