<?php
/**
 * Header for pages
 * Custom header image functionality
 * @package WordPress
 */

/**
 * @return mixed|string in case there is a image array in field, returns random image from it, otherwise returns random.jpg from images
 *
 */
function randomHeaderImage() {

    $images = array();

    if( have_rows('imgs', 'options') ):
        while( have_rows('imgs', 'options')): the_row();
            $image = get_sub_field('img');

            array_push($images, $image);
        endwhile;
        $random_counter = rand(0, count($images)-1);

    endif;
    if( !empty($images) ) return $images[$random_counter];
    else return get_template_directory_uri() . '/src/images/random.jpg';
}

/**
 * Custom header for home page
 * Change name of images that show up by default if nothing is selected (from random.jpg)
 */
function headerHomePage() { ?>
    <section class="section header-section">
        <?php if( have_rows('header_slider') ): ?>
            <div class="header-slider js-headerSlider">
                <?php while ( have_rows('header_slider') ) : the_row();
                    $header_image = get_sub_field('header_image');
                    $image = get_ftheme_first([$header_image, get_the_post_thumbnail_url(), randomHeaderImage()]);
                    $header_title = get_sub_field('header_title');
                    $title = get_ftheme_first([$header_title, get_the_title(), get_the_archive_title()]);
                    $header_subtitle = get_sub_field('header_subtitle');
                    $header_link = get_sub_field('header_link');
                    $header_link_title = $header_link['title'];
                    $header_link_url = $header_link['url']; ?>
                    <div class="header-slide js-headerSlide" style="background-image: url(<?php echo $image; ?>);">
                        <div class="wrapper">
                            <div class="a-subtitle -header"><?php echo $header_subtitle; ?></div>
                            <h1 class="a-title -header"><?php echo $title; ?></h1>
                            <a href="<?php echo $header_link_url?>" class="a-link -header"><?php echo $header_link_title; ?></a>
                        </div>
                    </div>
                <?php endwhile; ?>
            </div>
        <?php endif; ?>
    </section>
<?php
}

/**
 * Custom header for all other pages
 * Change name of images that show up by default if nothing is selected (from random.jpg)
 */
function headerPage() {
    $header_image = get_field('header_image');
    $header_title = get_field('header_title');
    $header_subtitle = get_field('header_subtitle');
    $image = get_ftheme_first([$header_image, get_the_post_thumbnail_url(), randomHeaderImage()]);
    $title = get_ftheme_first([$header_title, single_term_title('', false), get_the_title()]); ?>

    <section class="section header-section inner">
        <div class="header-slider">
            <div class="header-slide" style="background-image: url(<?php echo $image; ?>);">
                <div class="wrapper">
                    <div class="wrap">
                        <div class="_12 _m8 title-wrap">
                            <h1 class="a-title -header -inner"><?php echo $title; ?></h1>
                            <div class="a-subtitle -header -inner"><?php echo $header_subtitle; ?></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php
}
