<?php
$main_title = get_sub_field('title'); ?>
<div class="wrap">
    <h2 class="_12 a-title -section -kit"><?php echo $main_title; ?></h2>
</div>
<?php while (have_rows('birthday_accordion')) : the_row();
    $title = get_sub_field('title');
    $content = get_sub_field('content'); ?>

    <div class="m-accordion">
        <div class="m-accordion__intro">
            <p class="a-text"><?= $title; ?></p>
        </div>
        <div class="m-accordion__content">
            <?= $content; ?>
        </div>
    </div>
<?php
endwhile; ?>
