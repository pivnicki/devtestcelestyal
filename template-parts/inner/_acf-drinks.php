<?php
if (have_rows('drinks')) : ?>
    <?php $count = 1;?>
    <?php while (have_rows('drinks')) : the_row();
        $image = get_sub_field('image');
        $title = get_sub_field('title');
        $content = get_sub_field('content'); ?>
        <div class="_12 m-single -staff <?php if ($count == 1) echo '_m4'; else echo '_m8'; ?>">
            <img class="a-image -staff" src="<?= $image; ?>"/>
            <h4 class="a-title -staff"><?= $title; ?></h4>
            <div class="a-text -staff"><?= $content; ?></div>
        </div>
        <?php
        $count++;
    endwhile; ?>
<?php
endif; ?>
