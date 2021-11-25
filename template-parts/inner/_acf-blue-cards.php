<?php
$title = get_sub_field('title'); ?>

<div class="section blue -inner-content">
    <div class="wrapper">
        <?php
        if ($title): ?>
        <div class="wrap">
            <h1 class="_12 a-title -inner-content -white">
                <?= $title; ?>
            </h1>
        </div>
        <?php endif; ?>
        <?php
        if (have_rows('cards_repeater')): ?>
        <div class="wrap m-cards -inner-content">
            <?php while (have_rows('cards_repeater')) : the_row();
                $image = get_sub_field('image');
                $title = get_sub_field('title');
                $text= get_sub_field('text'); ?>
            <div class="_12 _m4 m-card -inner-content">
                <img class="a-image -offers" src="<?= $image; ?>"/>
                <h4 class="a-title -offers -white"><?= $title; ?></h4>
                <div class="a-text -offers -white">
                    <?= $text; ?>
                </div>
            </div>
            <?php
            endwhile; ?>
        </div>
        <?php
        endif; ?>
    </div>
</div>
