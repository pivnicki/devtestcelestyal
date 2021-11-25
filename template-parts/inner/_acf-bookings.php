<?php
if (have_rows('book_repeater')) : ?>
    <?php $count = 1;?>
    <div class="wrap">
    <?php while (have_rows('book_repeater')) : the_row();
        $image = get_sub_field('image');
        $title = get_sub_field('title');
        $subtitle = get_sub_field('subtitle');
        $link = get_sub_field('link'); ?>

        <div class="_12 _m4 -booking">
            <a href="<?php echo $link; ?>">
                <img class="a-image" src="<?= $image; ?>"/>
                <div class="-gray">
                    <div class="-more">
                        <h4 class="a-title -booking"><?= $title; ?></h4>
                        <img src="<?php echo $globalSite['theme_url'] . '/bundles/images/arrow-forward.png'; ?>" alt="">
                    </div>
                    <div class="a-text -booking"><?= $subtitle; ?></div>
                </div>
            </a>
        </div>
        <?php
        $count++;
    endwhile; ?>
    </div>
<?php
endif; ?>
