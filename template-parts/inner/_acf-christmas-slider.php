<?php
$title = get_sub_field('title');
$content = get_sub_field('content');
?>
<section class="section blue">
    <div class="wrapper">
        <div class="wrap">
            <h1 class="_12 a-title -inner-content -white"><?php echo $title; ?></h1>
        </div>
<div class="wrap m-cards -info-slider -full">
<div class="_12 edge js-infoSlider">
    <?php while (have_rows('image_repeater')) : the_row();
        $image = get_sub_field('image'); ?>
        <img class="a-image -infoSlide js-infoSlide" src="<?php echo $image; ?>"/>

    <?php
    endwhile; ?>
    <div class="m-nav -infoSlide">
        <div class="left"><i class="fa fa-chevron-left"></i></div>
        <div class="right"><i class="fa fa-chevron-right"></i></div>
    </div>
</div>
</div>
<div class="wrap">
    <div class="_12 _m12 a-text -white">
        <?php echo $content; ?>
    </div>
</div>
</section>
