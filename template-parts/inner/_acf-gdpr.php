<?php
if (have_rows('policies_repeater')) : ?>
        <?php while (have_rows('policies_repeater')) : the_row();
            $title = get_sub_field('title');
            $link = get_sub_field('link'); ?>
            <div class="gdpr">
                <h4 class="a-title -staff"><?= $title; ?></h4>
                <a href="<?php echo $link['url']; ?>" class="a-link inverse"><?php echo $link['title']; ?></a>
            </div>
            <?php
        endwhile; ?>
<?php
endif; ?>

