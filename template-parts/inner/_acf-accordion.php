<?php
while (have_rows('items')) : the_row();
$title = get_sub_field('title');
$content = get_sub_field('content'); ?>

    <div class="m-accordion">
        <div class="m-accordion__intro">
            <h4><?= $title; ?></h4>
        </div>
        <div class="m-accordion__content">
            <?= $content; ?>
        </div>
    </div>
<?php
endwhile; ?>
