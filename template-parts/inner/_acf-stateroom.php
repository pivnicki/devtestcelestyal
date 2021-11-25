
<?php
$title = get_sub_field('title');
$content = get_sub_field('content');
$package_title = get_sub_field('package_title');
$suites_title = get_sub_field('suites_title');
?>
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
            <h2 class="_12 ofs_m1 _m10 a-title -inner-content"><?= $title; ?></h2>
        <div class="wrap m-cards">
                <?php
                    $content = get_sub_field('content');?>
                        <div class="_12 -info-slider -full">
                            <div class="edge js-infoSlider">
                                <?php
                                while (have_rows('slider_repeater')) : the_row();
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
                    <div class="_12 ofs_m1 _m10 a-subtitle -overview -inner-content"><?= $content; ?></div>
        </div>
    </div>
</section>
<section class="section inner-content js-suiteWrap">
    <div class="wrapper">
        <div class="wrap">
            <h1 class="_12 a-title -section"><?php echo $suites_title; ?></h1>
        </div>
        <?php if (have_rows('tab_repeater')) :  $c=1; $i=1; ?>
            <div class="wrap">
                <ul class="m-tabs js-suites">
                    <?php while (have_rows('tab_repeater')) : the_row();
                        $tab_title = get_sub_field('tab_title'); ?>
                        <li><a href="#" data-id="tab<?php echo $c; ?>" class="a-link tab"><?php echo $tab_title; ?></a></li>
                    <?php
                    $c++;
                    endwhile; ?>
                </ul>
            </div>
            <?php while (have_rows('tab_repeater')) : the_row();
                $tab_title = get_sub_field('tab_title'); ?>
                <div class="wrap m-suites js-parentContent" data-id="tab<?php echo $i; ?>C">
                    <div class="_12 _m4 suites">
                        <h1 class="a-title -suit"><?php echo $tab_title; ?></h1>
                        <ul class="s-tabs js-suitesChild">
                            <?php
                            $k=1;
                            while (have_rows('content_repeater')) : the_row();
                            $tab_short_title = get_sub_field('tab_short_title'); ?>
                                <li><a href="#" data-trig="tab<?php echo $i . $k; ?>" class="a-link tab"><?php echo $tab_short_title; ?></a></li>
                            <?php
                            $k++;
                            endwhile; ?>
                        </ul>
                        <?php
                        $j=1;
                        while (have_rows('content_repeater')) : the_row();
                            $tab_long_title = get_sub_field('tab_long_title');
                            $text = get_sub_field('text');
                            $view = get_sub_field('view');
                            $persons = get_sub_field('persons');
                            $side_elevation = get_sub_field('side_elevation'); ?>
                            <div data-trig="tab<?php echo $i . $j; ?>C" class="js-childContent">
                                <div class="wrap">
                                    <h1 class="_12 a-title -suit"><?php echo $tab_long_title; ?></h1>
                                </div>
                                <div class="wrap">
                                    <div class="_12 a-text -location -scr"><?php echo $text; ?></div>
                                </div>
                                <div class="wrap">
                                    <div class="_12 _m5 a-text -side">
                                        <span> <img src="<?php echo $globalSite['theme_url'] . '/bundles/images/sea-view.png'; ?>" alt=""></span>
                                        <span class="a-text -suites"><?php echo $view; ?></span>
                                    </div>
                                    <div class="_12 _m7 a-text -side">
                                        <span> <img src="<?php echo $globalSite['theme_url'] . '/bundles/images/persons.png'; ?>" alt=""></span>
                                        <span class="a-text -suites"><?php echo $persons; ?></span>
                                    </div>
                                </div>
                                <div class="wrap">
                                    <p class="_12 a-text -side"><?php _e('Side Elevation', 'ftheme'); ?></p>
                                </div>
                                <div class="wrap">
                                    <div class="_12"><img src="<?php echo $side_elevation['url']; ?>" alt="<?php echo $side_elevation['title']; ?>"></div>
                                </div>
                            </div>
                        <?php
                        $j++;
                        endwhile; ?>
                    </div>
                    <div class="_12 _m8 edge cover">
                        <?php
                        $l=1;
                        while (have_rows('content_repeater')) : the_row();
                        $suite_image = get_sub_field('suite_image'); ?>
                            <img data-trig="tab<?php echo $i . $l; ?>C" class="a-image -suite js-childImage" src="<?php echo $suite_image['url']; ?>" alt="<?php echo $suite_image['title']; ?>">
                        <?php
                        $l++;
                        endwhile; ?>
                    </div>
                </div>
            <?php
            $i++;
            endwhile; ?>
        <?php endif; ?>
    </div>
</section>
<section class="section inner-content">
    <div class="wrapper">
                <h2 class="_12 ofs_m1 _m10 a-title -section"><?= $package_title; ?></h2>
                <?php if (have_rows('package_repeater')) : ?>
                    <div class="wrap m-staff">
                        <?php
                        $count = 1;
                        while (have_rows('package_repeater')) : the_row();
                            $image = get_sub_field('image');
                            $title = get_sub_field('title');
                            $content= get_sub_field('content');?>
                            <div class="_12 _m4 m-single -staff">
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