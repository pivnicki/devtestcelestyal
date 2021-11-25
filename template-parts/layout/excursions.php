<?php
$taxonomy = 'excursion_category';
$terms = get_terms( array(
    'taxonomy' => $taxonomy,
    'parent' => 0
) );
$subtitle = get_field('subtitle');
$transport = get_sub_field('transport'); ?>
<?php
$args = array(
    'posts_per_page' => -1,
    'post_type' => 'excursions',
    'orderby' => 'ASC',
    'post_status' => 'publish',
    'tax_query' => array(
        'taxonomy' => 'excursion_category',
    )
);
$query = new WP_Query($args);

//if( $query->post_count > 0) {
?>
<section class="section excursions _12">
    <div class="wrapper">
        <div class="wrap">
            <h1 class="_12 a-title -section"><?php _e('Amazing excursions carefully curated','ftheme'); ?></h1>
        </div>
        <div class="-country ">
            <span class="a-text -filt"><?php _e('Filter by Country:','ftheme'); ?></span>
            <div id="excursion">
                <?php ?>
                <ul class="m-tabs filter filter-cruise">

                        <!-- <li class="a-link tab active" data-category="all">All</li> -->
                        <li class="a-link tab active acc hide" data-category="all"><?php _e('Filter by country','ftheme');?><i class="fa fa-chevron-down js-accTrigg"></i></li>
                        <?php $i=0;
                    foreach ($terms as $index=>$term) { ?>
                        <?php if ($i == 0): ?>
                            <li class="a-link tab active" data-category="all"><?php _e( 'All', 'ftheme' ); ?></li>
                            <?php endif;?>
                        <li class="a-link tab" data-category="<?php echo $term->slug ?>"><?php echo $term->name; ?></li>
                        <?php $i++;
                     } ?>

                </ul>
            </div>
        </div>
        <div class="wrap js-cardSlider m-cards item-slider dot">

            <?php while ($query->have_posts()): $query->the_post(); global $post;
                $subtitle = get_field('subtitle');
                $transport = get_field_object('transport');
                $terms = get_the_terms( $post->ID, 'excursion_category' );
                $term = array_shift($terms);
                $e_time = get_field('time');
                ?>
                <div class="_s12 js-cardSlide" data-match="<?php echo $term->slug; ?>">
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
                            <?php echo $e_time;?>
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
        </div>
    </div>
    </div>
</section>

<?php // } ?>