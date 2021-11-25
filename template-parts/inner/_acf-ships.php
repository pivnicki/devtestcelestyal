<?php if (have_rows('ship_repeater')): ?>
    <?php while (have_rows('ship_repeater')) : the_row();
        $image = get_sub_field('image');
        $title = get_sub_field('title');
        $subtitle = get_sub_field('subtitle');
        $url_link = get_sub_field('link'); ?>

        <div class="_12 m-ship">
            <a href="<?php if ($url_link) echo $url_link['url']; ?>">
                <img class="a-image -ship" src="<?= $image; ?>"/>
                <div class="-content">
                    <h5 class="a-title -ship -white"><?= $title; ?></h5>
                    <div class="a-text -ship"><?= $subtitle; ?></div>
                </div>
            </a>
        </div>
    <?php endwhile; ?>
<?php endif; ?>