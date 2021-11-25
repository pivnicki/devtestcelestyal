<section class="section  blue ship">
    <div class="wrapper">
        <div class="wrap ship-nav">
            <?php
            if (have_rows('nav_repeater')) : ?>
                <?php while (have_rows('nav_repeater')) : the_row();
                    $link = get_sub_field('page_link'); ?>
                    <a href="<?php echo $link['url']; ?>" class=""><?php echo $link['title']; ?></a>
                <?php
                endwhile;
            endif; ?>
        </div>
    </div>
</section>
<section class="section inner-content">
    <div class="wrapper">
        <?php the_breadcrumb(); ?>
        <?php
                $title = get_sub_field('title');
                $content = get_sub_field('content');
                $subtitle = get_sub_field('subtitle');?>
                <h2 class="_12 ofs_m1 _m10 a-title -inner-content"><?= $title; ?></h2>
                <?php if (have_rows('image_repeater')): ?>
                    <div class="wrap m-cards -info-slider -full">
                        <div class="_12 edge js-infoSlider">
                            <?php
                            while (have_rows('image_repeater')) : the_row();
                                $image = get_sub_field('image'); ?>
                                <img class="a-image -infoSlide js-infoSlide" src="<?php echo $image; ?>"/>
                            <?php
                            endwhile; ?>
                            <div class="m-nav -infoSlide">
                                <div class="left"><i class="fa fa-chevron-left"></i></div>
                                <div class="right"><i class="fa fa-chevron-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="wrap">
                        <div class="_12 _m4 pad">
                            <p class="a-subtitle -restaurant"><?php echo $subtitle; ?></p>
                        </div>
                        <div class="_12 _m8 pad">
                            <div class="a-text -staff"><?= $content; ?></div>
                        </div>
                    </div>
                <?php
        endif; ?>
    </div>
</section>
<section class="section inner-content">
    <div class="wrapper">

                <?php $title = get_sub_field('package_title'); ?>
                <h2 class="_12 ofs_m1 _m10 a-title -inner-content -single"><?= $title; ?></h2>
                <?php if (have_rows('package_repeater')) : ?>
                    <div class="wrap m-staff">
                        <?php $count = 1;?>
                        <?php while (have_rows('package_repeater')) : the_row();
                            $image = get_sub_field('image');
                            $title = get_sub_field('title');
                            $content= get_sub_field('content');?>
                            <div class="_12 m-single -staff <?php
                            switch ($count) {
                                case 1:
                                case 4:
                                case 5:
                                    echo '_m8';
                                    break;
                                default:
                                    echo '_m4';
                            } ?>">
                                <img class="a-image -staff" src="<?= $image; ?>"/>
                                <h4 class="a-title -staff"><?= $title; ?></h4>
                                <div class="a-text -staff"><?= $content; ?></div>
                            </div>
                            <?php
                            $count++;
                        endwhile; ?>
                    </div>
                <?php
        endif; ?>
    </div>
</section>