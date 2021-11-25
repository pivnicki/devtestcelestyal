<?php
/**
 * The template for displaying single custom post type
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package ftheme
 */

global $globalSite;
get_header();
$db_title = get_field('db_title'); ?>
    <div id="content" class="site-content">
        <?php
        $term = get_queried_object(); // get the current taxonomy term
        $header_image = get_field('header_image', $term);
        $header_title = get_field('header_title', $term);
        $image = get_ftheme_first([$header_image, get_the_post_thumbnail_url(), randomHeaderImage()]);
        $title = get_ftheme_first([$header_title, single_term_title('', false), get_the_title()]);
        $s_title = get_field('title',$term);
        $s_sub_title = get_field('subtitle',$term);
        $s_link = get_field('link',$term);
        $posts = get_field('excursions',false,false); ?>
        <section class="section header-section inner">
            <div class="header-slider">
                <div class="header-slide" style="background-image: url(<?php echo $image; ?>);">
                    <div class="wrapper">
                        <div class="wrap">
                            <div class="_12 _m8 title-wrap">
                                <h1 class="a-title -header -inner"><?php echo $title; ?></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <main id="main" class="page-main site-main" role="main">
            <section class="section inner-content">

                <div class="wrapper">
                    <?php the_breadcrumb(); ?>
                    <div class="wrap">
                        <h1 class="_12 a-title -inner-content">
                            <?php echo $s_title; ?>
                        </h1>
                    </div>
                    <div class="wrap">
                        <div class="_12 _m8 ofs_m2 a-text -center -more">
                            <p><?php echo $s_sub_title; ?></p>
                        </div>
                    </div>
                    <div class="wrap">
                        <div class="_12 -center ">
                            <p class=" a-text -center show"><?php _e('Read More','ftheme'); ?></p>
                            <?php if($s_link): ?>
                            <a href="<?php echo $s_link['url'] ?>" class="a-link inverse"><?= $s_link['title']; ?></a>
                            <?php endif; ?>
                        </div>
                    </div>
                        <?php if (have_rows('destination_repeater')): ?>
                        <?php $count = 1;?>
                            <?php while (have_rows('destination_repeater')) : the_row();?>
                            <?php $title = get_sub_field('title');
                                  $content = get_sub_field('content');?>
                    <div class="wrap m-cards -info-slider -dest <?php
                        switch ($count) {
                            case 2:
                            case 4:
                            case 6:
                                echo '-rev';
                        }?>">
                        <div class="_12 _m12 _xl8 edge js-infoSlider">
                        <?php while (have_rows('gallery_repeater')) : the_row();
                            $image = get_sub_field('image'); ?>
                            <img class="a-image -infoSlide js-infoSlide" src="<?php echo $image; ?>"/>
                        <?php
                        endwhile; ?>
                            <div class="m-nav -infoSlide">
                                <div class="left"><i class="fa fa-chevron-left"></i></div>
                                <div class="right"><i class="fa fa-chevron-right"></i></div>
                            </div>
                        </div>
                        <div class="_12 _m12 _xl4 -text">
                            <h2 class="a-title -blue -info-slider"><?php echo $title;?></h2>
                            <div class="a-text -desc -dest">
                                <p><?php echo $content; ?></p>
                            </div>
                        </div>
                    </div>
                        <?php $count++;
                            endwhile;
                        endif; ?>
                <?php
                $args = array(
                    'posts_per_page' => -1,
                    'post_type' => 'excursions',
                    'orderby' => 'ASC',
                    'post__in'			=> $posts,
                    'post_status'		=> 'publish',
                    'orderby'        	=> 'post__in',
                );

                if( $posts ):
                 $query = new WP_Query($args);
                 if( $query->post_count > 0) {
                 ?>
                    <section class="section">
                    <div class="wrap">
                        <h1 class="_12 a-title -section"><?php _e('Amazing excursions carefully curated','ftheme'); ?></h1>
                    </div>
                <div class="wrap js-excSlider m-cards">
                <?php while ($query->have_posts()): $query->the_post(); global $post;
                $subtitle = get_field('subtitle');
                $transport = get_field_object('transport');
                $e_time = get_field('time');?>
                <div class="_12 js-excSlide">
                    <div class="m-card excursion">
                        <a href="<?php  the_permalink(); ?>" class="-none">
                        <?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'full'); ?>
                        <div class="top" style="background-image: url('<?php echo $image[0]; ?>')">
                            <div class="a-text tag -excursion">
                                <?php
                                $post_tags = get_the_tags();
                                foreach ($post_tags as $tag) {
                                echo $tag->name;
                                } ?>
                            </div>
                             <div class="a-icon -excursion">
<!--                                <i class="--><?php
//                                    switch ($transport['value']) {
//                                        case 'car': echo 'fa fa-car';
//                                        break;
//                                        case 'bus': echo 'fa fa-bus';
//                                        break;
//                                        case 'walk': echo 'fa fa-walking';
//                                    }
//                                ?><!--"></i>-->
                                 <?php echo $e_time;?>
                            </div>
                        </div>
                    <div class="bottom">
                        <div class="a-subtitle -card -excursion"><?php echo $subtitle; ?></div>
                        <h3 class="a-title -card -excursion"><?php echo get_the_title();?></h3>
                        <a href="<?php  the_permalink(); ?>" class="a-link inverse -excursion"><?php _e('Learn More', 'ftheme'); ?></a>
                    </div>
                    </a>
                </div>
            </div>
            <?php
        endwhile;
        wp_reset_postdata(); ?>
            <div class="m-nav">
                <div class="left"><i class="fa fa-chevron-left"></i></div>
                <div class="right"><i class="fa fa-chevron-right"></i></div>
            </div>
            </section>
            <?php
                 } 
                endif; 
            ?>
            <?php
            get_template_part('template-parts/layout/top', 'cruise');
            // get_template_part('template-parts/layout/all', 'inclusive');
            ?>
        </main>
    </div>
<!--    </section>-->
<?php
special_offers();
get_footer();?>