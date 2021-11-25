<?php
global $globalSite;
$our_destinations_title = get_field('our_destinations_title', 'option'); ?>
<section class="section top-destinations">
    <div class="wrapper">
        <?php if ($our_destinations_title) : ?>
            <div class="wrap">
                <h1 class="_12 a-title -section"><?php echo $our_destinations_title; ?></h1>
            </div>
        <?php
        endif;
        if (have_rows('our_destinations', 'option')): ?>
        <div class="wrap js-cardSlider m-cards">
            <?php $args = array(
                'posts_per_page' => -1,
                'post_type' => 'destinations',
                'orderby' => 'ASC'
            );

            $query = new WP_Query($args);
            while ($query->have_posts()): $query->the_post(); global $post; ?>
                <div class="_12 _m4 js-cardSlide">
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
                        <a href="<?php echo the_permalink(); ?>" class="a-link -card -learn"><?php _e('Learn More', 'ftheme'); ?></a>
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
        <?php
        endif; ?>
</section>