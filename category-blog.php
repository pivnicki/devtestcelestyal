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
    headerPage(); ?>
    <main id="main" class="page-main site-main" role="main">
        <?php
        $paged = (get_query_var('page')) ? get_query_var('page') : 1;
        $args = array(
            'posts_per_page' => 7,
            'post_type' => 'post',
            'category_name' => 'blog',
            'paged' => $paged
        );
        $query = new WP_Query($args); ?>
        <section class="section">
        <div class="wrapper">
            <?php the_breadcrumb(); ?>
            <div class="wrap">
                <h2 class="_12 a-title -inner-content"><?php _e(' Celestyal\'s Picks: Our favourite blog posts','ftheme'); ?></h2>
            </div>
            <div class="wrap blog">
            <?php
            $count = 0;
            while ($query->have_posts()): $query->the_post(); ?>
                <div class="_12  <?php if ($count == 0) echo '_m12'; else echo '_m4'; ?>">
                    <a href="<?php the_permalink() ?>"><?php the_post_thumbnail('full', array('class' => 'a-image')); ?></a>
                    <p class="a-text -offers -date"><?php echo get_the_date('d M Y'); ?></p>
                    <?php the_title('<h4 class="a-title -left">', '</h4>'); ?>
                </div>
            <?php
            $count++;
            endwhile;
            wp_reset_postdata(); ?>
        </div>
        <div class="-center">
            <?php if ($query->max_num_pages > 1) { ?>
                <a class="a-link inverse blog-post">Load More Entries</a>
            <?php } ?>
        </div>
        </section>
    </main>
</div>
<?php
special_offers();
get_footer();