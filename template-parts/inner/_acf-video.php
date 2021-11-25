<?php
$emb_video = get_sub_field('emb_video');
if ($emb_video) {
    if (preg_match('/src="(.+?)"/', $emb_video, $matches)) {
        $src = $matches[1];
        $params = array(
            'controls' => 0,
            'hd' => 1,
            'fs' => 0,
            'rel' => 0,
            'modestbranding' => 0,
            'autoplay' => 0,
            'showinfo' => 0,
            'title' => 0,
        );

        $new_src = add_query_arg($params, $src);

        $emb_video = str_replace($src, $new_src, $emb_video);
        $attributes = 'frameborder="0"';
        $emb_video = str_replace('></iframe>', ' ' . $attributes . '></iframe>', $emb_video);
    }
} ?>

<div class="a-video -inner-content">
    <?= $emb_video; ?>
</div>