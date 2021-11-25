<?php
/**
 * The template for displaying archive pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package ftheme
 */

get_header(); ?>
<div id="content" class="site-content">
    <?php
    the_breadcrumb();?>

    <main id="main" class="page-main site-main" role="main">
        <?php
        $paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : '1';
        $args = array(
            'posts_per_page' => 9,
            'post_type' => 'post',
            'category_name' => 'press-releases',
            'paged' => $paged
        );

        $query = new WP_Query($args);
        $current_cat = get_category( get_query_var( 'cat' ), false ); ?>

        <div class="wrapper">
            <h2 class="a-title -section"><?php echo $current_cat->name; ?></h2>
            <div class="wrap">
                <div class="_l9">
                    <div class="wrap">
                        <?php
                        $count = 0;
                        while( $query->have_posts()): $query->the_post();?>

                            <div class="_12 _m4">
                                <a href="<?php the_permalink() ?>"><?php the_post_thumbnail('medium',array('class' => 'a-image')); ?></a>
                                <p class="a-text -offers -date"><?php echo get_the_date( 'd M Y' );?></p>
                                <?php the_title( '<h4 class="a-title -left">', '</h4>' );?>
                            </div>

                        <?php
                        $count++;
                        endwhile;
                        wp_reset_postdata(); ?>
                    </div>
                </div>
                <div class="_l3">
                    <div class="wrap">
                        <nav class="side-navigation" role="navigation">
                            <?php do_action('wpml_add_language_selector'); ?>
                            <?php wp_nav_menu(array('menu' => 'Press Menu', 'menu_class' => 'menu side-menu')); ?>
                        </nav>
                    </div>
                    <p class="a-text -follow">Follow Us</p>
                    <ul class="social">
                        <?php
                        while( have_rows('socials', 'options') ): the_row();
                            $social = get_sub_field('social');
                            $face = get_sub_field('face');
                            $twit = get_sub_field('twit');
                            $you = get_sub_field('you');
                            $insta = get_sub_field('insta');
                            $pint = get_sub_field('pint');?>

                            <?php
                            if ($social == 'Facebook'): ?>
                                <li>
                                    <a href="<?php echo $face; ?>" target="_blank">
                                        <img src="<?php echo $globalSite['theme_url'] . '/bundles/images/facebook.png'; ?>" alt="">
                                    </a>
                                </li>
                            <?php
                            endif;
                            if ($social == 'Twitter'): ?>
                                <li>
                                    <a href="<?php echo $twit; ?>" target="_blank">
                                        <img src="<?php echo $globalSite['theme_url'] . '/bundles/images/twitter.png'; ?>" alt="">
                                    </a>
                                </li>
                            <?php
                            endif;
                            if ($social == 'Youtube'): ?>
                                <li>
                                    <a href="<?php echo $you; ?>" target="_blank">
                                        <img src="<?php echo $globalSite['theme_url'] . '/bundles/images/youtube.png'; ?>" alt="">
                                    </a>
                                </li>
                            <?php
                            endif;
                            if ($social == 'Instagram'): ?>
                                <li>
                                    <a href="<?php echo $insta; ?>" target="_blank">
                                        <img src="<?php echo $globalSite['theme_url'] . '/bundles/images/instagram.png'; ?>" alt="">
                                    </a>
                                </li>
                            <?php
                            endif;
                            if ($social == 'Pinterest'): ?>
                                <li>
                                    <a href="<?php echo $pint; ?>" target="_blank">
                                        <img src="<?php echo $globalSite['theme_url'] . '/bundles/images/pinterest.png'; ?>" alt="">
                                    </a>
                                </li>
                            <?php
                            endif;
                        endwhile; ?>
                    </ul>
                </div>
            </div>
            <div class="wrap">
                <div class="_12 f-center">
                    <?php echo paginate_links( array(
                        'prev_text'    =>  __('&lt;'),
                        'next_text'    => __('&gt;'),
                    ) );
                    ?>
                </div>
            </div>
        </div>
    </main>
</div>
<?php
get_footer();