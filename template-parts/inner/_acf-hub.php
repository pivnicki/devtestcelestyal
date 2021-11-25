<?php
if (have_rows('packages')) : ?>
        <?php $count = 1;?>
        <?php while (have_rows('packages')) : the_row();
            $image = get_sub_field('image');
            $title = get_sub_field('title');
            $content = get_sub_field('content');
            $link = get_sub_field('link'); ?>
            <div class="_12 m-single -staff <?php if ($count == 1) echo '_m8'; else echo '_m4'; ?>">
                <img class="a-image -staff" src="<?= $image; ?>"/>
                <h4 class="a-title -staff"><?= $title; ?></h4>
                <div class="a-text -staff"><?= $content; ?></div>
                <a href="<?php echo $link['url'] ?>" class="a-link inverse"><?= $link['title']; ?></a>
            </div>
            <?php
            $count++;
        endwhile; ?>
<?php
endif; ?>
