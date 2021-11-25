<?php if (have_rows('carriage_repeater')): ?>
    <?php while (have_rows('carriage_repeater')) : the_row();
        $image = get_sub_field('image');
        $title = get_sub_field('title');
        $subtitle = get_sub_field('subtitle');
        $url_link = get_sub_field('link'); ?>

        <div class="gdpr">
            <img src="<?= $image; ?>"/>
            <h4 class="a-title -carriage"><?= $title; ?></h4>
            <p class="a-text"><?php echo $subtitle; ?></p>
            <a href="<?php echo $url_link['url']; ?>" class="a-link inverse"><?php echo $url_link['title']; ?></a>
        </div>
    <?php endwhile; ?>
<?php endif; ?>