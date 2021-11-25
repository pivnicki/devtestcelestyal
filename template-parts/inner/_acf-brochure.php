<?php
$image = get_sub_field('brochure_image');
$title = get_sub_field('title');
$subtitle = get_sub_field('subtitle');
$browse = get_sub_field('browse'); ?>
<div class="_12 ofs_m1 _m5">
    <div class="m-brochure">
        <img class="a-image -shadow" src="<?php echo $image; ?>"/>
    </div>
</div>
<div class="_12 _m5">
    <div class="m-brochure">
        <h4 class="a-title -brochure"><?php echo $title; ?></h4>
        <div class="a-subtitle -brochure"><?php echo $subtitle; ?></div>
        <div class="button-wrap">
            <a href="<?php echo $browse['url']; ?>" class="a-link inverse"><?php echo $browse['title']; ?></a>
        </div>
    </div>
</div>
