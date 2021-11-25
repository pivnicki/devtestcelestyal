<?php
/**
 * Custom function for the breadcrumbs
 */

function the_breadcrumb($class = NULL) {
    // Settings
    $separator = ' / ';
    $home_title         = 'Home';

    // Get the query & post information
    global $post;

    if (!is_front_page()) {

        // Start the breadcrumb with a link to your homepage
        echo '<div class="wrap">';
        echo '<div class="_12 m-breadcrumbs ' . $class . '">';
        echo '<a href="' . get_home_url() . '" title="' . $home_title . '">' . $home_title . '</a>' . $separator;

        if ( is_archive() && !is_tax() && !is_category() && !is_tag() ) {

            echo post_type_archive_title();

        } else if ( is_archive() && is_tax() && !is_category() && !is_tag() ) {

            // If post is a custom post type
            $post_type = get_post_type();

            // If it is a custom post type display name and link
            if($post_type != 'post') {

                $post_type_object = get_post_type_object($post_type);
                $post_type_archive = get_post_type_archive_link($post_type);

                echo '<a class="bread-cat bread-custom-post-type-' . $post_type . '" href="" title="' . $post_type_object->labels->name . '">' . $post_type_object->labels->name . '</a>' . $separator;

            }

            $custom_tax_name = get_queried_object()->name;
            echo '<span class="item-current item-archive">' . $custom_tax_name . '</span>';

        } else if ( is_single() ) {

            // If post is a custom post type
            $post_type = get_post_type();

            // If it is a custom post type display name and link
            if($post_type != 'post') {

                $post_type_object = get_post_type_object($post_type);
                $post_type_archive = get_post_type_archive_link($post_type);

                echo '<span class="item-cat item-custom-post-type-' . $post_type . '"><a class="bread-cat bread-custom-post-type-' . $post_type . '" href="" title="' . $post_type_object->labels->name . '">' . $post_type_object->labels->name . '</a></span>';
                echo '<span class="separator"> ' . $separator . ' </span>';

            }

            // Get post category info
            $category = get_the_category();

            if(!empty($category)) {

//                var_dump($category);

                // Get last category post is in
//                $last_category = end(array_values($category));
                $array = array_values($category);
                $last_category = end($array);

                // Get parent any categories and create array
                $get_cat_parents = rtrim(get_category_parents($last_category->term_id, true, ','),',');
                $cat_parents = explode(',',$get_cat_parents);

                // Loop through parent categories and store in variable $cat_display
                $cat_display = '';
                foreach($cat_parents as $parents) {
                    $cat_display .= '<span class="item-cat">'.$parents.'</span>';
                    $cat_display .= '<span class="separator"> ' . $separator . ' </span>';
                }
            }

            $terms = get_the_terms( $post->ID, 'destination_category' );

            if ($terms){

                $cat_display = '';
                foreach($terms as $term) {
                    echo '<span class="item-cat"><a href="' . get_term_link($term->slug, 'destination_category') . '" class="bread-cat bread-custom-post-type-product" title="' . $term->name . '">' . $term->name .'</a></span>';
                    echo '<span class="separator"> ' . $separator . ' </span>';
                }
            }

            // Check if the post is in a category
            if(!empty($last_category)) {

                echo $cat_display;
                echo '<span class="item-current item-' . $post->ID . '">' . get_the_title() . '</span>';

                // Else if post is in a custom taxonomy
            } else if(!empty($cat_id)) {

                echo '<span class="item-cat item-cat-' . $cat_id . ' item-cat-' . $cat_nicename . '"><a class="bread-cat bread-cat-' . $cat_id . ' bread-cat-' . $cat_nicename . '" href="' . $cat_link . '" title="' . $cat_name . '">' . $cat_name . '</a></span>';
                echo '<span class="separator"> ' . $separator . ' </span>';
                echo '<span class="item-current item-' . $post->ID . '">' . get_the_title() . '</span>';

            } else {

                echo '<span class="item-current item-' . $post->ID . '">' . get_the_title() . '</span>';

            }

        } else if ( is_category() ) {

            // Category page
            echo '<span class="item-current item-cat">' . single_cat_title('', false) . '</span>';

        } else if ( is_home() ) {

            // Main Post page
            $title = get_queried_object()->post_title;
            echo '<span class="item-current item-cat">' . $title . '</span>';

        } else if ( is_page() ) {

            // Standard page
            if( $post->post_parent ){

                // If child page, get parents
                $anc = get_post_ancestors( $post->ID );

                // Get parents in the right order
                $anc = array_reverse($anc);

                // Parent page loop
                if ( !isset( $parents ) ) $parents = null;
                foreach ( $anc as $ancestor ) {
                    $parents .= '<span class="item-parent item-parent-' . $ancestor . '"><a class="bread-parent bread-parent-' . $ancestor . '" href="' . get_permalink($ancestor) . '" title="' . get_the_title($ancestor) . '">' . get_the_title($ancestor) . '</a></span>';
                    $parents .= '<span class="separator separator-' . $ancestor . '"> ' . $separator . ' </span>';
                }

                // Display parent pages
                echo $parents;

                // Current page
                echo '<span class="item-current item-' . $post->ID . '">' . get_the_title() . '</span>';

            } else {

                // Just display current page if not parents
                echo '<span class="item-current item-' . $post->ID . '">' . get_the_title() . '</span>';

            }

        } else if ( is_tag() ) {

            // Tag page

            // Get tag information
            $term_id        = get_query_var('tag_id');
            $taxonomy       = 'post_tag';
            $args           = 'include=' . $term_id;
            $terms          = get_terms( $taxonomy, $args );
            $get_term_id    = $terms[0]->term_id;
            $get_term_slug  = $terms[0]->slug;
            $get_term_name  = $terms[0]->name;

            // Display the tag name
            echo '<span class="item-current item-tag-' . $get_term_id . ' item-tag-' . $get_term_slug . '">' . $get_term_name . '</span>';

        } elseif ( is_day() ) {

            // Day archive

            // Year link
            echo '<span class="item-year item-year-' . get_the_time('Y') . '"><a class="bread-year bread-year-' . get_the_time('Y') . '" href="' . get_year_link( get_the_time('Y') ) . '" title="' . get_the_time('Y') . '">' . get_the_time('Y') . ' Archives</a></span>';
            echo '<span class="separator separator-' . get_the_time('Y') . '"> ' . $separator . ' </span>';

            // Month link
            echo '<span class="item-month item-month-' . get_the_time('m') . '"><a class="bread-month bread-month-' . get_the_time('m') . '" href="' . get_month_link( get_the_time('Y'), get_the_time('m') ) . '" title="' . get_the_time('M') . '">' . get_the_time('M') . ' Archives</a></span>';
            echo '<span class="separator separator-' . get_the_time('m') . '"> ' . $separator . ' </span>';

            // Day display
            echo '<span class="item-current item-' . get_the_time('j') . '">' . get_the_time('jS') . ' ' . get_the_time('M') . ' Archives</span>';

        } else if ( is_month() ) {

            // Month Archive

            // Year link
            echo '<span class="item-year item-year-' . get_the_time('Y') . '"><a class="bread-year bread-year-' . get_the_time('Y') . '" href="' . get_year_link( get_the_time('Y') ) . '" title="' . get_the_time('Y') . '">' . get_the_time('Y') . ' Archives</a></span>';
            echo '<span class="separator separator-' . get_the_time('Y') . '"> ' . $separator . ' </span>';

            // Month display
            echo '<span class="item-month item-month-' . get_the_time('m') . '">' . get_the_time('M') . ' Archives</span>';

        } else if ( is_year() ) {

            // Display year archive
            echo '<span class="item-current item-current-' . get_the_time('Y') . '">' . get_the_time('Y') . ' Archives</span>';

        } else if ( is_author() ) {

            // Auhor archive

            // Get the author information
            global $author;
            $userdata = get_userdata( $author );

            // Display author name
            echo '<span class="item-current item-current-' . $userdata->user_nicename . '">' . 'Author: ' . $userdata->display_name . '</span>';

        } else if ( get_query_var('paged') ) {

            // Paginated archives
            echo '<span class="item-current item-current-' . get_query_var('paged') . '">'.__('Page') . ' ' . get_query_var('paged') . '</span>';

        } else if ( is_search() ) {

            // Search results page
            echo '<span class="item-current item-current-' . get_search_query() . '">Search results for: ' . get_search_query() . '</span>';

        } elseif ( is_404() ) {

            // 404 page
            echo '<span>' . 'Error 404' . '</span>';
        }
        echo '</div>';
        echo '</div>';
    }
}