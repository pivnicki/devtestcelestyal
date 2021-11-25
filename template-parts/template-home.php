<?php
/* Template Name: Home */
global $globalSite;
get_header();
$show_top_cruises = get_field('show_top_cruises');
$show_destinations = get_field('show_destinations');
$show_allinclusive = get_field('show_all_inclusive');
$newsletter_title = get_field('newsletter_title');
$newsletter_shortcode = get_field('newsletter_shortcode');
$reviews_title = get_field('reviews_title');
$instagram_title = get_field('instagram_title');
$instagram_shortcode = get_field('instagram_shortcode');
$all_inclusive_title = get_field('all_inclusive_title');
$bottom_button_inc = get_field('all_inclusive_link');
//var destination;
//var departure;
//var duration;
?>
    <div id="content" class="site-content">
        <?php
        headerHomePage(); ?>
        <main id="main" class="page-main site-main" role="main">
            <section class="section filter desk">
                <div class="wrapper">
                    <div class="wrap m-filters">
                        <div class="filter">
                            <label for="destination-select"><?php _e('Destination', 'ftheme' ); ?></label>
                            <select id="destination-select">
                                <option class="hidden"><?php _e( 'Select', 'ftheme'); ?></option>
                                <option rel="filter" id="destination" value="Greece & Greek Islands"><?php _e( 'Greece & Greek Islands', 'ftheme' ); ?></option>
                                <option rel="filter" id="destination" value="Egypt"><?php _e( 'Egypt', 'ftheme' ); ?></option>
                                <option rel="filter" id="destination" value="Israel"><?php _e( 'Israel', 'ftheme' ); ?></option>
                                <option rel="filter" id="destination" value="Cyprus"><?php _e( 'Cyprus', 'ftheme' ); ?></option>
                                <option rel="filter" id="destination" value="Turkey"><?php _e( 'Turkey', 'ftheme' ); ?></option>
                            </select>
                        </div>
                        <div class="filter departure">
                            <label for="departure-select"><?php _e( 'Departure Month', 'ftheme' ); ?></label>
                            <select id="departure-select" class="header">
                                <option class="hidden"><?php _e( 'Select', 'ftheme' ); ?></option>
                            </select>
                        </div>
                        <div class="filter">
                            <label for="duration-select"><?php _e( 'Duration', 'ftheme' ); ?></label>
                            <select id="duration-select" class="header">
                                <option class="hidden"><?php _e( 'Select', 'ftheme' ); ?></option>
                            </select>
                        </div>
                        <div class="filter button">
                            <a id="search-filter" class="a-link filter" href="#" target="_blank"><?php _e( 'Search', 'ftheme' ); ?></a>
                        </div>
                    </div>
                </div>
            </section>
            <section class="section filter mob">
                <div class="wrapper">
                    <div class="wrap">
                        <h1 class="_12 a-title -section"><?php _e('find a cruise','ftheme'); ?></h1>
                    </div>
                    <div class="wrap">
                        <div class="_12 filter">
                            <select id="destination-select">
                                <option class="hidden"><?php _e( 'Select Destination', 'ftheme' ); ?></option>
                                <option rel="filter" id="destination" value="Greece & Greek Islands"><?php _e( 'Greece & Greek Islands', 'ftheme' ); ?></option>
                                <option rel="filter" id="destination" value="Egypt"><?php _e( 'Egypt', 'ftheme' ); ?></option>
                                <option rel="filter" id="destination" value="Israel"><?php _e( 'Israel', 'ftheme' ); ?></option>
                                <option rel="filter" id="destination" value="Cyprus"><?php _e( 'Cyprus', 'ftheme' ); ?></option>
                                <option rel="filter" id="destination" value="Turkey"><?php _e( 'Turkey', 'ftheme' ); ?></option>
                            </select>
                        </div>
                        <div class="_12 filter departure">
                            <select id="departure-select" class="header">
                                <option class="hidden"><?php _e( 'Departure Month', 'ftheme' ); ?></option>
                            </select>
                        </div>
                        <div class="_12 filter">
                            <select id="duration-select" class="header">
                                <option class="hidden"><?php _e( 'Select Nights', 'ftheme' ); ?></option>
                            </select>
                        </div>
                        <div class="_12 filter button">
                            <a id="search-filter" class="a-link filter" href="#" target="_blank"><?php _e( 'Search', 'ftheme' ); ?></a>
                        </div>
                    </div>
                </div>
            </section>
            <?php
            if ($show_top_cruises) :
                get_template_part('template-parts/layout/top', 'cruise');
            endif; ?>
            <section class="section newsletter">
                <div class="wrapper">
                    <?php if ($newsletter_title) : ?>
                        <div class="wrap">
                            <h1 class="_12 a-title -section"><?php echo $newsletter_title; ?></h1>
                        </div>
                    <?php endif; ?>
                    <div class="wrap m-newsletter">
                        <form id="brochure" class="_12 form">
                            <div class="input-wrap">
                                <input type="text" name="cel_api_cel_brochure_full_name" class="a-input -newsletter" placeholder="<?php _e('Full Name','ftheme'); ?>" required/>
                            </div>
                            <div class="input-wrap">
                                <input type="email" name="cel_api_cel_brochure_email" class="a-input -newsletter" placeholder="<?php _e('Email','ftheme'); ?>" required/>
                            </div>
                            <div class="input-wrap">
                                <select id="country" name="cel_api_cel_brochure_country_code">
                                    <option value="" disabled selected><?php _e( 'Select Country', 'ftheme' ); ?></option>
                                    <option value=".com - Int" title="Country"><?php _e( 'International/Rest of World', 'ftheme' ); ?></option>
                                    <option value="AUS" title="Country"><?php _e( 'AUS', 'ftheme' ); ?></option>
                                    <option value="France" title="Country"><?php _e( 'France', 'ftheme' ); ?></option>
                                    <option value="Germany" title="Country"><?php _e( 'Germany', 'ftheme' ); ?></option>
                                    <option value="Greece" title="Country"><?php _e( 'Greece', 'ftheme' ); ?></option>
                                    <option value="Latin" title="Country"><?php _e( 'Latin America', 'ftheme' ); ?></option>
                                    <option value="pt-br" title="Country"><?php _e( 'Brazil', 'ftheme' ); ?></option>
                                    <option value="Spain" title="Country"><?php _e( 'Spain', 'ftheme' ); ?></option>
                                    <option value="UK" title="Country"><?php _e( 'UK', 'ftheme' ); ?></option>
                                    <option value="USA" title="Country"><?php _e( 'USA', 'ftheme' ); ?></option>
                                </select>
                            </div>
                            <div class="input-wrap">
                                <button type="submit" class="a-link blue -newsletter" value="Sign Up"><?php _e( 'Send', 'ftheme' ); ?></button>
                            </div>
                        </form>
                        <div id="result"></div>
                    </div>
                </div>
            </section>
            <?php
            if ($show_destinations) :
                get_template_part('template-parts/layout/our', 'destinations');
            endif; ?>
            <?php
            if ($show_allinclusive) :
                get_template_part('template-parts/layout/all', 'inclusive');
            endif; ?>
            <section class="section gray">
                <div class="wrapper">
                    <div class="wrap">
                        <h1 class="_12 a-title -section"><?php _e('Latest Awards & Recognitions','ftheme');?></h1>
                    </div>
                    <div class="wrap -center ">
                        <?php $args = array(
                            'posts_per_page' => 4,
                            'post_type' => 'award',
                            'orderby' => 'ASC',
                        );

                        $query = new WP_Query($args);
                        while ($query->have_posts()): $query->the_post(); global $post; ?>
                            <div class="_12 _m3 -saward">
                                    <?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'full'); ?>
                                <img src="<?php echo $image[0]; ?>" alt="">
                            </div>
                        <?php
                        endwhile;
                        wp_reset_postdata(); ?>
                    </div>
                    <div class="wrap -rec">
                        <div class="_12 f-center">
                            <a class="a-link inverse -center" href="/our-awards"><?php _e('See Awards & Recognitions','ftheme'); ?></a>
                        </div>
                    </div>
                </div>
            </section>
            <section class="section instagram">
                <div class="wrapper">
                    <?php if ($instagram_title) : ?>
                        <div class="wrap">
                            <h1 class="_12 a-title -section"><?php echo $instagram_title; ?></h1>
                        </div>
                    <?php
                    endif; ?>
                    <div class="wrap">
                        <?php
                        if ($instagram_shortcode):
                            echo do_shortcode($instagram_shortcode);
                        else:
                            echo do_shortcode('[instagram-feed user="smashballoon"]');
                        endif;
                        ?>
                    </div>
                </div>
            </section>
        </main>
    </div>
<?php
get_footer();

