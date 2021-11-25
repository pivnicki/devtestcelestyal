<?php
/**
 * The template for displaying custom post type category page
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#custom-taxonomies
 *
 * @package ftheme
 */

global $globalSite;
get_header();
$db_title = get_field('db_title'); ?>
    <div id="content" class="site-content">
        <?php
        $term = get_queried_object(); // get the current taxonomy term
        $c_title = get_field('title',$term);
        $c_subtitle = get_field('subtitle',$term);
        $c_link = get_field('link',$term);
        $related_title = get_field('related_title',$term);
        $related_subtitle = get_field('related_subtitle',$term);
        $before_title = get_field('before_title',$term);
        $before_left_title = get_field('before_left_title',$term);
        $before_left_content = get_field('before_left_content',$term);
        $before_left_link = get_field('before_left_link',$term);
        $before_right_title = get_field('before_right_title',$term);
        $before_right_content = get_field('before_right_content',$term);
        $before_right_link = get_field('before_right_link',$term);
        $header_image = get_field('header_image', $term);
        $header_title = get_field('header_title', $term);
        $offers_title = get_field('offers_title', $term);
        $offers_link = get_field('offers_link', $term);
        $image = get_ftheme_first([$header_image, get_the_post_thumbnail_url(), randomHeaderImage()]);
        $title = get_ftheme_first([$header_title, single_term_title('', false), get_the_title()]); ?>

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
                            <?php echo $c_title; ?>
                        </h1>
                    </div>
                    <div class="wrap">
                        <div class="_12 _m8 ofs_m2 a-text -center -more">
                            <p><?php echo $c_subtitle;?></p>
                        </div>
                    </div>
                    <div class="wrap">
                        <div class="_12 -center ">
                            <p class=" a-text -center show"><?php _e('Read More','ftheme'); ?></p>
                            <?php if($c_link): ?>
                                <a href="<?php echo $c_link['url'] ?>" class="a-link inverse"><?= $c_link['title']; ?></a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </section>
            <section class="section blue">
                <div class="wrapper">
                    <div class="wrap">
                        <h1 class="_12 a-title -inner-content -white"><?php echo $offers_title; ?></h1>
                    </div>
                    <?php if (have_rows('offers_repeater', $term)) : ?>
                        <div class="wrap js-cardSlider m-cards cruise-slider offer">
                            <?php while (have_rows('offers_repeater', $term)) : the_row();
                                $image = get_sub_field('image', $term);
                                $title = get_sub_field('title', $term);
                                $text = get_sub_field('text', $term); ?>
                                <div class="_12 js-cardSlide">
                                    <img class="a-image -offers" src="<?php echo $image; ?>"/>
                                    <h4 class="a-title -offers -white"><?php echo $title; ?></h4>
                                    <div class="a-text -offers -white"><?php echo $text; ?></div>
                                </div>
                            <?php endwhile; ?>
                        </div>
                    <?php endif; ?>
                    <div class="wrap -rec">
                        <div class="_12 -center">
                            <a href="<?php echo $offers_link['url']; ?>" class="a-link inverse-white"><?php echo $offers_link['title']; ?></a>
                        </div>
                    </div>
                </div>
            </section>
            <section class="section related-posts">
                <div class="wrapper">
                    <div class="wrap">
                        <h1 class="_12 a-title -inner-content">
                            <?php echo $related_title; ?>
                        </h1>
                    </div>
                    <div class="wrap">
                        <div class="_12 _m8 ofs_m2 a-text -center">
                            <?php echo $related_subtitle;?>
                        </div>
                    </div>
                    <?php if (is_tax('destination_category','mediterranean')): ?>
                        <div class="wrap m-cards">
                            <?php
                            $args = array(
                                'taxonomy' => 'destination_category',
                                'orderby' => 'name',
                                'order'   => 'ASC',
                            );
                            $cats = get_categories($args);
                            foreach($cats as $cat) {
                                $f_image = get_field('featured_image',$cat); ?>
                                <div class="_12 _m4">
                                <div class="m-card destinations" style="background-image: url('<?php echo $f_image; ?>')">
                                    <h3 class="a-title -card destinations"><?php echo $cat->name;?></h3>
                                    <a href="<?php echo get_category_link( $cat->term_id ) ?>" class="a-link -card -learn">
                                    <?php _e('Learn More', 'ftheme'); ?> </a>
                                </a>
                                </div>
                                </div>
                                    <?php
                            }
                            ?>
                        </div>
                    <?php endif; ?>
                    <div class="wrap cat m-cards">
                        <?php $args = array(
                            'posts_per_page' => -1,
                            'post_type' => 'destinations',
                            'orderby' => 'ASC',
                            'tax_query' => array(
                                array(
                                    'taxonomy' => 'destination_category',
                                    'field' => 'slug',
                                    'terms' => $term
                                ),
                            ),
                        );

                        $query = new WP_Query($args);
                        while ($query->have_posts()): $query->the_post(); global $post; ?>
                        <div class="_12 _m4 cat-mob">
                            <div class="m-card destinations"
                                <?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'full'); ?>
                                 style="background-image: url('<?php echo $image[0]; ?>')">
                                <div class="a-subtitle -card">
                                    <?php
                                    $taxonomy = 'destination_category';
                                    $terms = wp_get_post_terms($post->ID,$taxonomy);
                                    foreach ( $terms as $term ) { ?>
                                    <?php echo $term->name; ?>
                                    <?php  }?>
                                </div>
                                <h3 class="a-title -card destinations"><?php echo get_the_title();?></h3>
                                <a href="<?php the_permalink(); ?>" class="a-link -card -learn"><?php _e('Learn More', 'ftheme'); ?></a>
                            </div>
                        </div>
                            <?php
                            //$count++;
                        endwhile;
                        wp_reset_postdata(); ?>
                        <div class="m-nav">
                            <div class="left"><i class="fa fa-chevron-left"></i></div>
                            <div class="right"><i class="fa fa-chevron-right"></i></div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="section gray">
                <div class="wrapper">
                    <div class="wrap">
                        <h1 class="_12 a-title -inner-content">
                           <?php echo $before_title; ?>
                        </h1>
                    </div>
                    <div class="wrap">
                        <div class="_12 _m8">
                            <h4 class="a-title -blue"><?php echo $before_left_title; ?></h4>
                            <div class="a-text">
                                <?php echo $before_left_content; ?>
                            </div>
                            <a class="a-link -mb3 -underline -gray" href="<?php echo $before_left_link['url'] ?>"><?php echo $before_left_link['title'] ?></a>
                        </div>
                        <div class="_12 _m4">
                            <h4 class="a-title -blue"><?php echo $before_right_title; ?></h4>
                            <div class="a-text">
                                <?php echo $before_right_content; ?>
                            </div>
                            <a class="a-link -mb3 -underline -gray" href="<?php echo $before_right_link['url'] ?>"><?php echo $before_right_link['title'] ?></a>
                        </div>
                    </div>
                </div>
            </section>

            <?php
            get_template_part('template-parts/layout/top', 'cruise');
            get_template_part('template-parts/layout/all', 'inclusive');
            ?>
        </main>
    </div>
<?php
special_offers();
get_footer();