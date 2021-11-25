<?php
/* Template Name: Destinations Hub */
global $globalSite;
get_header();
$db_title = get_field('db_title');
$ptitle_lc = get_field('ptitle_lc');
$ptitle_rc = get_field('ptitle_rc');
$show_top_cruises = get_field('show_top_cruises');
$show_allinclusive = get_field('show_all_inclusive');
$reviews_title = get_field('reviews_title'); ?>
    <div id="content" class="site-content">
        <?php
        headerPage(); ?>
        <main id="main" class="page-main site-main" role="main">
            <section class="section inner-content">
                <div class="wrapper">
                    <?php the_breadcrumb(); ?>
                    <?php if ($db_title) : ?>
                    <div class="wrap">
                        <h1 class="_12 a-title -inner-content"><?php echo $db_title; ?></h1>
                    </div>
                    <div class="wrap">
                        <div class="_12 _m6 a-text -left"><?php echo $ptitle_lc; ?></div>
                        <div class="_12 _m6 a-text -right"><?php echo $ptitle_rc; ?></div>
                    </div>
                    <?php
                    endif;
                    if (have_rows('destinations_hub')): ?>
                        <div class="wrap m-cards -inner-content">
                            <?php
                            while (have_rows('destinations_hub')) : the_row();
                                $categories  = get_sub_field('destination_category');
                                if ($categories):
                                    foreach( $categories as $category ):
                                        $category_args = array(
                                            'post_type' => 'destinations',
                                            'tax_query' => array(
                                                array(
                                                    'taxonomy' => 'destination_category',
                                                    'field' => 'term_id',
                                                    'terms' => $category->term_id
                                                )
                                            )
                                        );
                                        $destinations = get_posts($category_args);
                                        $locations = [];
                                        foreach ( $destinations as $destination ) :
                                            setup_postdata($destination);
                                            $image = get_ftheme_first([get_the_post_thumbnail_url($destination), randomHeaderImage()]);
                                            $location_title = get_the_title($destination);
                                            array_push($locations, $location_title);
                                        endforeach;
                                        wp_reset_postdata(); ?>

                                        <a class="a-link -card _12" href="<?php echo get_term_link($category->slug, 'destination_category'); ?>">
                                            <div class="m-card destinations"
                                                 style="background-image: url(<?php echo $image; ?>)">
                                                <h3 class="a-title -card destinations"><?php echo $category->name; ?></h3>
                                                <div class="a-subtitle -card">
                                                    <?php
                                                    $i = 0;
                                                    $count = count($locations);
                                                    foreach($locations as $title):
                                                        if ($i++ < $count - 1) { $title .= ' - '; }
                                                        echo $title;
                                                    endforeach; ?>
                                                </div>
                                            </div>
                                        </a>
                                    <?php endforeach;
                                endif;
                            endwhile; ?>
                        </div>
                    <?php
                    endif; ?>
                </div>
            </section>
            <?php
            if ($show_allinclusive) :
                get_template_part('template-parts/layout/all', 'inclusive');
            endif;
            if ($show_top_cruises) :
                get_template_part('template-parts/layout/top', 'cruise');
            endif; ?>
            <section class="section review">
                <div class="wrapper">
                    <?php if ($reviews_title) : ?>
                        <div class="wrap">
                            <div class="_12 m-reviews">
                                <h1 class="a-title -section"><?php echo $reviews_title; ?></h1>
                                <img src="<?php echo $globalSite['theme_url'] . '/bundles/images/reviews-bar-feefo.jpg'; ?>"/>
                            </div>
                        </div>
                    <?php
                    endif; ?>
                </div>
            </section>
        </main>
    </div>
<?php
get_footer();