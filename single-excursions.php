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
        $e_content = get_field('excursion_content',$term);
        $e_time = get_field('time',$term);
        $e_type = get_field('type_of_tour',$term);
        $e_accessibility = get_field('accessibility',$term);
        $e_children_price = get_field('children_price',$term);
        $e_adult_price = get_field('adult_price',$term);
        $e_gallery_subtitle = get_field('gallery_subtitle',$term);
        $e_gallery_content = get_field('gallery_content',$term);
       // $posts = get_field('excursions',80); ?>

        <section class="section header-section inner">
            <div class="header-slider">
                <div class="header-slide" style="background-image: url(<?php echo $image; ?>);">
                </div>
            </div>
        </section>
        <main id="main" class="page-main site-main" role="main">
            <section class="section inner-content">
                <div class="wrapper">
                    <?php the_breadcrumb(); ?>
                    <div class="wrap">
                        <h1 class="_12 a-title -inner-content"><?php echo the_title(); ?></h1>
                    </div>
                    <div class="wrap -exc">
                        <div class="_12 _m8 a-text">
                            <p><?php echo $e_content;?></p>
                        </div>
                        <div class="_12 _m4 -inf">
                            <div class="m-excursion-info">
                                <div class="top">
                                    <div class="row">
                                        <div class="a-icon"><img src="<?php echo $globalSite['theme_url'] . '/bundles/images/time.png'; ?>" alt=""></div>
                                        <div class="a-text">
                                            <p><?php echo $e_time; ?></p>
                                        </div>
                                    </div>
<!--                                    <div class="row">-->
<!--                                        <div class="a-icon">-->
<!--                                            <i class="--><?php
//                                            switch ($e_type) {
//                                                case 'car': echo 'fa fa-car';
//                                                    break;
////                                                case 'bus': echo 'fa fa-bus';
////                                                    break;
//                                                case 'walk': echo 'fa fa-walking';
//                                            }
//                                            ?><!--"></i>-->
<!--                                        </div>-->
<!--                                        <div class="a-text">-->
<!--                                            <p>--><?php
//                                                switch ($e_type) {
//                                                    case 'car': echo 'Car Tour Sightseeing';
//                                                        break;
////                                                    case 'bus': echo 'Bus Tour Sightseeing';
////                                                        break;
//                                                    case 'walk': echo 'Walk Tour Sightseeing';
//                                                }?>
<!--                                            </p>-->
<!--                                        </div>-->
<!--                                    </div>-->
                                    <div class="row">
                                        <div class="a-icon"><img src="<?php echo $globalSite['theme_url'] . '/bundles/images/accessibility.png'; ?>"</i></div>
                                        <div class="a-text">
                                            <p><?php echo $e_accessibility; ?></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div class="price">
                                        <div class="amount"><?php echo $GLOBALS['currency'] . ' ' . $e_children_price; ?></div>
                                        <div class="group">Children</div>
                                    </div>
                                    <div class="price">
                                        <div class="amount"><?php echo $GLOBALS['currency'] . ' ' .  $e_adult_price; ?></div>
                                        <div class="group">Adults</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="wrap m-cards -info-slider -full">
                        <div class="_12 edge js-infoSlider">
                            <?php while (have_rows('gallery')) : the_row();
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
                        <div class="_12 _m12 a-text">
                            <h4 class="a-title -blue"><?php echo $e_gallery_subtitle; ?></h4>
                            <div class="a-text">
                                <p><?php echo $e_gallery_content; ?></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <?php
            $taxonomy = 'excursion_category';
            $terms = get_terms( array(
                'taxonomy' => $taxonomy,
                'parent' => 0
            ) );
            $subtitle = get_field('subtitle');
            $transport = get_sub_field('transport');
            $included = get_field_object('includedoptional');?>
            <?php
            $args = array(
                'posts_per_page' => -1,
                'post_type' => 'excursions',
                'orderby' => 'ASC',
                'tax_query' => array(
                    'taxonomy' => 'excursion_category',
                )

            );
            // $args = array(
            //     'posts_per_page' => -1,
            //     'post_type' => 'excursions',
            //     'orderby' => 'ASC',
            //     'post__in'			=> $posts,
            //     'post_status'		=> 'any',
            //     'orderby'        	=> 'post__in',
            // );
            // // if( $posts ):
            $query = new WP_Query($args);?>
            <section class="section excursions _12">
                <div class="wrapper">
                    <div class="wrap">
                        <h1 class="_12 a-title -section"><?php _e('Related Amazing excursions','ftheme'); ?></h1>
                        <?php //var_dump($posts); ?>
                    </div>
                    <div class="-country ">
                        <div id="excursion">
                            <?php ?>
                            <ul class="m-tabs filter-included">
                                <?php foreach( $included['choices'] as $value => $label ): ?>
                                    <li class="a-link tab included" data-category="<?php echo $label; ?>"><?php echo $label .' '. 'Excursions'; ?></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    </div>
                    <div class="wrap js-cardSlider m-cards include-slider">
                        <?php while ($query->have_posts()): $query->the_post(); global $post;
                            $subtitle = get_field('subtitle');
                            $transport = get_field_object('transport');
                            $terms = get_the_terms( $post->ID, 'excursion_category' );
                            $optional = get_field('includedoptional',$post->ID);
                            $e_time = get_field('time');
                            $term = array_shift($terms);
                            ?>
                            <div class="_s12 js-cardSlide" data-match="<?php echo $optional; ?>">
                                <div class="m-card excursion">
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
                                            <span><?php echo $e_time; ?></span>
                                        </div>
                                    </div>
                                    <div class="bottom">
                                        <div class="a-subtitle -card -excursion"><?php echo $subtitle; ?></div>
                                        <h3 class="a-title -card -excursion"><?php echo get_the_title();?></h3>
                                        <a href="<?php echo the_permalink(); ?>" class="a-link inverse -excursion"><?php _e('Learn More', 'ftheme'); ?></a>
                                    </div>
                                </div>
                            </div>
                            <div class="m-nav">
                                <div class="left"><i class="fa fa-chevron-left"></i></div>
                                <div class="right"><i class="fa fa-chevron-right"></i></div>
                            </div>
                        <?php
                        endwhile;
                        wp_reset_postdata(); ?>
                         <?php //endif; ?>
                    </div>
                </div>
    </div>
    </section>


            <?php
            //get_template_part('template-parts/layout/excursions');
            get_template_part('template-parts/layout/top', 'cruise');
           // get_template_part('template-parts/layout/all', 'inclusive');
            ?>
        </main>
    </div>
<?php
special_offers();
get_footer();