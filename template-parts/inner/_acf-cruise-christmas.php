<?php $title = get_sub_field('title') ?>
<section class="section blue">
    <div class="wrapper">
        <div class="wrap">
            <h1 class="_12 a-title -inner-content -white"><?php echo $title; ?></h1>
        </div>
        <?php if (have_rows('christmas_repeater')) : ?>
            <div class="wrap">
                <?php while (have_rows('christmas_repeater')) : the_row();
                    $image = get_sub_field('image');
                    $title = get_sub_field('title');
                    $text = get_sub_field('content'); ?>
                    <div class="_12 _m4">
                        <img class="a-image -offers" src="<?php echo $image; ?>"/>
                        <h4 class="a-title -offers -white"><?php echo $title; ?></h4>
                        <div class="a-text -offers -white"><?php echo $text; ?></div>
                    </div>
                <?php endwhile; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
<?php if (get_field('show_top_cruises')):
    get_template_part('template-parts/layout/top', 'cruise');
endif;