<?php
global $globalSite;
$top_title = get_field('top_title', 'option');
$bottom_button = get_field('bottom_button', 'option');
$bottom_link = get_field('bottom_link');
$taxonomy = 'cruise_category';
$terms = get_terms($taxonomy);

$args = array(
    'posts_per_page' => -1,
    'post_type' => 'cruises',
    'orderby' => 'ASC',
    'tax_query' => array(
        'taxonomy' => 'cruise_category',
    )
);
$tags = get_tags($args);
$query = new WP_Query($args); ?>
<section class="section top_cruises">
    <div class="wrapper">
        <?php if ($top_title) : ?>
            <div class="wrap">
                <h1 class="_12 a-title -section"><?php echo $top_title; ?></h1>
            </div>
        <?php
        endif; ?>
        <div class="-country">
            <div id="excursion">
                <ul class="m-tabs filter-cruise">
<!--                    <li class="a-link tab active" data-category="all">All <i class="fa fa-chevron-down js-accTrigg"></i></li>-->
                    <li class="a-link tab active acc hide" data-category="all">Filter cruises by nights <i class="fa fa-chevron-down js-accTrigg"></i></li>
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
        <div class="wrap js-cardSlider m-cards cruise-slider">
            <?php while ($query->have_posts()): $query->the_post();
                global $post;
                $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'full');
                $price = get_field('price');
                $promotion = get_field('promotion');
                $nights = get_field('nights');
                $arrangements = get_field('arrangement');
                $airport = get_field('airport');
                $sailing = get_field('sailing');
                $book = get_field('book_now_link');

                $terms = get_the_terms($post->ID, 'cruise_category'); ?>

                <div class="_12 js-cardSlide" data-match="<?php
                foreach ($terms as $term) {
                    echo $term->slug;
                }
                ?>">
                    <div class="m-card top" style="background-image: url(<?php echo $image[0]; ?>)">
                        <div class="top">
                            <div class="price">
                                <div class="starting"><?php _e('Starting from', 'ftheme') ?></div>
                                <div class="amount"><?php echo $GLOBALS['currency'] . ' ' . $price; ?></div>
                                <div class="promotion"><?= $promotion; ?></div>
                            </div>
                            <div class="tags arrangement">
                                <?php
                                foreach ($arrangements as $arrangement): { ?>
                                    <img src="<?php
                                    switch ($arrangement) {
                                        case 'cruise':
                                            echo $globalSite['theme_url'] . '/bundles/images/directions_boat-white-18dp.svg';
                                            break;
                                        case 'hotel':
                                            echo $globalSite['theme_url'] . '/bundles/images/hotel-white-18dp.svg';
                                            break;
                                        case 'flight':
                                            echo $globalSite['theme_url'] . '/bundles/images/flight_takeoff-white-18dp (1).svg';
                                    }
                                    ?>">
                                <?php }
                                endforeach;
                                if (has_term('', 'cruise_category')) :
                                    foreach ($terms as $term): { ?>
                                        <span> <?php echo $term->name; ?></span>
                                    <?php }
                                    endforeach;
                                endif; ?>
                            </div>
                        </div>
                        <div class="bottom">
                            <p class="airport"><?= $airport; ?></p>
                            <div class="">
                                <span class="sailing"><?php _e('Sailing:', 'ftheme'); ?></span>
                                <span class="date"><?= $sailing; ?></span>
                            </div>
                            <h3 class="a-title -card top"><?php echo get_the_title(); ?></h3>
                            <div class="links">
                                <a href="<?php echo $book['url']; ?>"
                                   class="a-link -card -orange"><?php echo $book['title']; ?></a>
                                <a href="<?php the_permalink(); ?>"
                                   class="a-link -card -more"><?php _e('View Details', 'ftheme'); ?></a>
                            </div>
                        </div>
                    </div>
                </div>

            <?php
            endwhile;
            wp_reset_postdata(); ?>
            <div class="m-nav">
                <div class="left"><i class="fa fa-chevron-left"></i></div>
                <div class="right"><i class="fa fa-chevron-right"></i></div>
            </div>
        </div>
        <div class="wrap -rec">
            <div class="_12 f-center">
                <a href="<?php echo $bottom_button['url']; ?>"  class="a-link inverse"><?php echo $bottom_button['title']; ?></a>
            </div>
        </div>
    </div>
</section>
