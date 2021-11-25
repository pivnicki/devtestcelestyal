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
<section class="section inner-content blue">
    <div class="wrapper">
        <?php the_breadcrumb('white'); ?>
        <div class="wrap m-staff">
            <?php
            $title = get_sub_field('title');
            $content = get_sub_field('content');
            $video = get_sub_field('video');
            if ($video) {
                if (preg_match('/src="(.+?)"/', $video, $matches)) {
                    $src = $matches[1];
                    $params = array(
                        'controls' => 0,
                        'hd' => 1,
                        'fs' => 0,
                        'rel' => 0,
                        'modestbranding' => 0,
                        'autoplay' => 0,
                        'showinfo' => 0,
                        'title' => 0,
                    );

                    $new_src = add_query_arg($params, $src);

                    $video = str_replace($src, $new_src, $video);
                    $attributes = 'frameborder="0"';
                    $video = str_replace('></iframe>', ' ' . $attributes . '></iframe>', $video);
                }
            }
            $url_link = get_sub_field('link'); ?>
            <h2 class="_12 ofs_m1 _m10 a-title -inner-content -white"><?= $title; ?></h2>
            <div class="_12 _m6 m-single">
                <div class="a-text -white"><?php echo $content ?></div>
                <a href="<?php echo $url_link['url']; ?>" class="a-link -card -learn"><?php echo $url_link['title']; ?></a>
            </div>
            <div class="_12 _m6 m-single a-video">
                <?php echo $video; ?>
            </div>
        </div>
    </div>
</section>
<section class="section inner-content ">
    <div class="wrapper">
        <div class="wrap m-cards">
            <?php $slider_title = get_sub_field('slider_title');
            $slider_content = get_sub_field('slider_content');?>
            <h2 class="_12 ofs_m1 _m10 a-title -inner-content"><?= $slider_title; ?></h2>
                <div class="_12 -info-slider -full">
                    <div class="edge js-infoSlider">
                        <?php
                        while (have_rows('slider_repeater')) : the_row();
                            $image = get_sub_field('slider_image'); ?>
                            <img class="a-image -infoSlide js-infoSlide" src="<?php echo $image; ?>"/>
                        <?php
                        endwhile; ?>
                        <div class="m-nav -infoSlide">
                            <div class="left"><i class="fa fa-chevron-left"></i></div>
                            <div class="right"><i class="fa fa-chevron-right"></i></div>
                        </div>
                    </div>
                </div>
            <div class="_12 ofs_m1 _m10 a-subtitle -overview -inner-content"><?= $slider_content; ?></div>
        </div>
    </div>
</section>
<section class="section inner-content ice-blue">
    <div class="wrapper">
        <div class="wrap">
                    <?php $places_title = get_sub_field('places_title'); ?>
                    <h2 class="_12 ofs_m1 _m10 a-title -inner-content -over"><?= $places_title; ?></h2>
        </div>
                    <?php if (have_rows('places_repeater')) : ?>
                        <div class="wrap m-staff">
                            <?php $count = 1;?>
                            <?php while (have_rows('places_repeater')) : the_row();
                                $image = get_sub_field('image');
                                $title = get_sub_field('title');
                                $content= get_sub_field('content');
                                $link= get_sub_field('link');?>
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
                                    <a href="<?php echo $link['url']; ?>" class="a-link inverse -excursion"><?php echo $link['title']; ?></a>
                                </div>
                                <?php
                                $count++;
                            endwhile; ?>
                        </div>
                    <?php
                    endif; ?>
        </div>
    </div>
</section>