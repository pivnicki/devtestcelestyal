<?php
while (have_rows('accordion')) : the_row();
    $title = get_sub_field('title');
    $content = get_sub_field('content');
    $link = get_sub_field('link');?>

    <div class="m-accordion">
        <div class="m-accordion__intro">
            <h4><?= $title; ?></h4>
        </div>
        <div class="m-accordion__content">
            <?= $content; ?>
            <a href="<?php echo $link['url']; ?>" class="a-link inverse"><?php echo $link['title']; ?></a>
        </div>
    </div>
<?php
endwhile; ?>
