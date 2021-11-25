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
$show_allinclusive = get_field('show_all_inclusive');
$db_title = get_field('db_title');
$title = get_field('title');
$content = get_field('content');
$link = get_field('link');
$map_image = get_field('map_image');
$glance = get_field('glance_title');
$posts = get_field('excursions',false,false);
$optional = get_field('optional_excursions',false,false);
 
$test=get_theme_file_path( 'test.json' );
				$meta = file_get_contents($test);
				$array = json_decode($meta, true);
				echo $array[0]["post_title"]."<br>";
                echo $array[0]["title"]."<br>";
				echo  $title=$array[0]["header_subtitle"]."<br>";
				echo $header_subtitle= $array[0]["content"]."<br>";
				echo $array[1]["title"]."<br>";
				 $post_id = get_the_ID();
 
update_field( 'header_title', $array[0]["header_title"], $post_id );
update_field( 'header_subtitle', $array[0]["header_subtitle"], $post_id ); 
update_field( 'title', $array[0]["header_title"], $post_id ); 
update_field( 'content', $array[0]["content"], $post_id ); 
  			/*	foreach ($array as $key1 => $value1) {
  				echo	$array[$key1];
  				} */
// 				https://www.opentechguides.com/how-to/article/php/93/parse-json.html
				echo "<pre>";
				 var_dump($array);
				echo "</pre>";
  

?>
    <div id="content" class="site-content">
        <?php
        headerPage(); ?>
        <main id="main" class="page-main site-main" role="main">
            <section class="section inner-content">
                <div class="wrapper">
                    <?php the_breadcrumb(); ?>
                    <div class="wrap">
                        <h1 class="_12 a-title -inner-content"><?php echo $title; ?></h1>
                    </div>
                    <div class="wrap">
                        <div class="_12 _l7 a-text">
                            <p><?php echo $content; ?></p>
                            <a href="<?php echo $link['url'].'?sid=42076&language=en&currency=USD' ?>" class="a-link inverse">
                                <?php echo $link['title'] ?>
                            </a>
                        </div>
                        <div class="_12 _l5">
                            <div class="m-cruise-map">
                                <img src="<?php echo $map_image; ?>" width="440px" height="330px" alt="Map image"/>
                                <?php
                                if (have_rows('cruise_itinerary')) : $c=1; ?>
                                    <div class="icons ">
                                        <?php while (have_rows('cruise_itinerary')) : the_row();
                                            $icon_top = get_sub_field('icon_position_top');
                                            $icon_left = get_sub_field('icon_position_left');
                                            $location = get_sub_field('location'); ?>
                                            <div class="icon <?php echo $c==1 ? 'active' : '' ;?>" data-category="<?php echo $c;?>" style="top:<?= $icon_top; ?>px; left:<?= $icon_left; ?>px;">
                                                <span class="number"><?= $c; ?></span>
                                                <span class="location"><?= $location; ?></span>
                                            </div>
                                        <?php
                                        $c++;
                                        endwhile; ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="section itinerary blue">
                <div class="wrapper">
                    <div class="wrap">
                        <h1 class="_12 a-title -inner-content -white"><?php _e( 'Cruise itinerary', 'ftheme' ); ?></h1>
                        <a href="" class="a-link inverse-white -right pop"><i class="fa fa-bars"></i> <?php _e( 'At-a-Glance Itinerary', 'ftheme' ); ?></a>
                    </div>
                    <div class="wrap">
                        <div class="_12 m-days-slider js-oneHalf map-slider">
                        <?php
                        $counter = 1;
                        if (have_rows('cruise_itinerary')) : ?>
                            <?php while (have_rows('cruise_itinerary')) : the_row();
                                $image = get_sub_field('image');
                                $day = get_sub_field('day');
                                $depart = get_sub_field('depart');
                                $location = get_sub_field('location');
                                $location_new = explode(" ", $location);
                                $content = get_sub_field('content');
                                $icon_top = get_sub_field('icon_position_top');
                                $icon_left = get_sub_field('icon_position_left');
                                $location_map = get_sub_field('location');?>
                            <div class="js-slide"  data-match="<?php echo $counter; ?>">
                                <div class="slide">
                                    <div class="half">
                                        <img class="day-image" src="<?php echo $image;?>"/>
                                    </div>
                                    <div class="half">
                                        <div class="top">
                                            <div class="day"><?php echo $day; ?></div>
                                            <div class="depart"><?php echo $depart; ?></div>
                                        </div>
                                        <div class="text-wrap">
                                            <div class="itinerary-location">
                                            <h4 class="a-title -day"><?php echo $location_new[0]; ?></h4>
                                            <h4 class="a-title -day"><?php echo $location_new[1]; ?></h4>
                                            </div>
                                            <div class="a-text -day">
                                                <?php echo $content; ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <?php $counter++;
                                 endwhile;
                            endif; ?>
                            <div class="m-nav it">
                                <div class="left"><i class="fa fa-chevron-left"></i></div>
                                <div class="right"><i class="fa fa-chevron-right"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="modal-overlay">
                <div class="modal">
                    <h2 class="a-title -kit -details"><?php echo $glance; ?></h2>
                    <a class="close-modal">
                        <span><?php _e( 'Close', 'ftheme' ); ?></span>
                        <svg viewBox="0 0 20 20">
                            <path fill="#004776" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                        </svg>
                    </a>
                    <div class="modal-content">
                        <table>
                            <tr>
                                <th class="a-text -follow"><?php _e( 'DATE', 'ftheme' ); ?></th>
                                <th class="a-text -follow"><?php _e( 'PORT/CITY', 'ftheme' ); ?></th>
                                <th class="a-text -follow"><?php _e( 'ARRIVE', 'ftheme' ); ?></th>
                                <th class="a-text -follow"><?php _e( 'DEPART', 'ftheme' ); ?></th>
                            </tr>
                            <?php
                            $already_shown = array();
                            if (have_rows('glance_itinerary')) : ?>
                                <?php while (have_rows('glance_itinerary')) : the_row();
                                    $date = get_sub_field('date');
                                    $port_city = get_sub_field('portcity');
                                    $depart = get_sub_field('depart');
                                    $arrive = get_sub_field('arrive'); ?>
                                    <tr class="modal-info">
                                        <th class="a-text -location">
                                            <?php echo $date;?>
                                        </th>
                                        <th class="a-text -location">
                                            <?php echo $port_city;?>
                                        </th>
                                        <th class="a-text -location">
                                            <?php echo $arrive;?>
                                        </th>
                                        <th class="a-text -location">
                                            <?php echo $depart;?>
                                        </th>
                                    </tr>
                                <?php endwhile;
                            endif;?>
                        </table>
                    </div>
                </div>
            </div>
            <?php
            //get_template_part('template-parts/layout/excursions');

            $taxonomy = 'excursion_category';
            $terms = get_terms($taxonomy); // Get all terms of a taxonomy
            $subtitle = get_field('subtitle');
            $transport = get_sub_field('transport');
            $field = get_field_object('field_5ee89bf212568');
            $choices = $field['choices'];

            $args = array(
                'posts_per_page' => -1,
                'post_type' => 'excursions',
                'orderby' => 'ASC',
                'post__in'			=> $posts,
                'post_status'		=> 'publish',
                'orderby'        	=> 'post__in',
            );
            $query = new WP_Query($args);

            if( $query->post_count > 0) {
           ?>
            <section class="section excursions _12">
                <div class="wrapper">
                    <div class="wrap">
                        <h1 class="_12 a-title -section"><?php _e('Amazing excursions carefully curated','ftheme'); ?></h1>
                    </div>
                    <div class="-country ">
                        <div id="excursion">
                            <ul class="m-tabs incl">
                                <?php
                                $counter = 1;
                                foreach($choices as $choice): ?>
                                   <li id="<?php echo $counter; ?>" class="a-link tab" data-category="<?php echo $choice; ?>"><?php echo $choice .' '. 'Excursions' ?></li>
                                <?php
                                $counter++;
                                endforeach;
                                 if(is_page('offshore-excursions')):?>
                                    <li class="a-link tab active" data-category="all"><?php _e( 'All', 'ftheme' ); ?></li>
                                    <?php foreach ( $terms as $term ) { ?>
                                        <li class="a-link tab" data-category="<?php echo $term->slug ?>"><?php echo $term->name; ?></li>
                                    <?php  }
                                endif; ?>
                            </ul>
                        </div>
                    </div>
                    <div class="wrap js-cardSlider m-cards include-slider fs-cr">
                        <?php while ($query->have_posts()): $query->the_post(); global $post;
                            $subtitle = get_field('subtitle');
                            $transport = get_field_object('transport');
                            $terms = get_the_terms( $post->ID, 'excursion_category' );
                            $term = array_shift($terms);
                            $field = get_field_object('includedoptional');
                            $choices = $field['value'];
                            $e_time = get_field('time');?>
                            <div class="_s12 js-cardSlide" data-match="<?php echo $choices; ?>">
                                <div class="m-card excursion">
                                    <?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'full'); ?>
                                    <div class="top" style="background-image: url('<?php echo $image[0]; ?>')">
                                        <div class="a-text tag -excursion">
                                            <?php
                                            $post_tags = get_the_tags();
                                            foreach ($post_tags as $tag) echo $tag->name; ?>
                                        </div>
                                        <div class="a-icon -excursion">
<!--                                            <i class="--><?php
//                                            switch ($transport['value']) {
//                                                case 'car': echo 'fa fa-car';
//                                                    break;
//                                                case 'bus': echo 'fa fa-bus';
//                                                    break;
//                                                case 'walk': echo 'fa fa-walking';
//                                            }
//                                            ?><!--"></i>-->
                                            <?php echo $e_time;?>
                                        </div>
                                    </div>
                                    <div class="bottom">
                                        <div class="a-subtitle -card -excursion"><?php echo $subtitle; ?></div>
                                        <h3 class="a-title -card -excursion"><?php echo get_the_title();?></h3>
                                        <a href="<?php echo the_permalink(); ?>" class="a-link inverse -crb -excursion"><?php _e('Learn More', 'ftheme'); ?></a>
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
                    <?php $args = array(
                'posts_per_page' => -1,
                'post_type' => 'excursions',
                'orderby' => 'ASC',
                'post__in'			=> $optional,
                'post_status'		=> 'publish',
                'orderby'        	=> 'post__in',
            );
            $query = new WP_Query($args);
           ?>
                    <div class="wrap js-cardSlider m-cards include-slider nd-cr">
                        <?php while ($query->have_posts()): $query->the_post(); global $post;
                            $subtitle = get_field('subtitle');
                            $transport = get_field_object('transport');
                            $terms = get_the_terms( $post->ID, 'excursion_category' );
                            $term = array_shift($terms);
                            $field = get_field_object('includedoptional');
                            $choices = $field['value'];
                            $e_time = get_field('time');?>
                            <div class="_s12 js-cardSlide" data-match="<?php echo $choices; ?>">
                                <div class="m-card excursion">
                                    <?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'full'); ?>
                                    <div class="top" style="background-image: url('<?php echo $image[0]; ?>')">
                                        <div class="a-text tag -excursion">
                                            <?php
                                            $post_tags = get_the_tags();
                                            foreach ($post_tags as $tag) echo $tag->name; ?>
                                        </div>
                                        <div class="a-icon -excursion">
<!--                                            <i class="--><?php
//                                            switch ($transport['value']) {
//                                                case 'car': echo 'fa fa-car';
//                                                    break;
//                                                case 'bus': echo 'fa fa-bus';
//                                                    break;
//                                                case 'walk': echo 'fa fa-walking';
//                                            }
//                                            ?><!--"></i>-->
                                            <?php echo $e_time;?>
                                        </div>
                                    </div>
                                    <div class="bottom">
                                        <div class="a-subtitle -card -excursion"><?php echo $subtitle; ?></div>
                                        <h3 class="a-title -card -excursion"><?php echo get_the_title();?></h3>
                                        <a href="<?php echo the_permalink(); ?>" class="a-link inverse -crb -excursion"><?php _e('Learn More', 'ftheme'); ?></a>
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
    
    </section>
                    
    
            <section>
                <div class="wrapper">
                        <div id="excursion">
                            <ul class="m-tabs filter-included">
                                <?php
                                foreach($choices as $choice): ?>
                                   <li class="a-link tab" data-category="<?php echo $choice; ?>"><?php echo $choice .' '. 'Excursions' ?></li>
                                <?php
                                endforeach;
                                 ?>
                            </ul>
                        </div>
                   
    </section>
    <?php  } ?>
    </main>    
    
    <?php
            get_template_part('template-parts/layout/top', 'cruise');
            get_template_part('template-parts/layout/all', 'inclusive-cruise-nights');?>
            <?php special_offers(); ?>
        
    </div>
<?php
get_footer();