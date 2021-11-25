<?php
/**
 * ftheme functions and definitions
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 * @package ftheme
 */

 

function replace_text($text) {
	$text = str_replace('paxserv@localhost ', 'paxserv@celestyal.com', $text); 
	return $text;
}
add_filter('the_content', 'replace_text');
if( !class_exists('acf') ) {

    add_action( 'admin_notices', function() {
        echo '<div class="error"><p>Advanced Custom Fields plugin is not activated. Make sure you activate plugin at <a href="' . esc_url( admin_url( 'plugins.php' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
    } );
}

/**
 * Include after_theme setup functions
 * This is main file for including functions and all other theme related files
 */
include ( get_template_directory() . '/lib/theme/_ftheme-setup.php');

/**
 * Include ftheme register functions
 * @link ./lib/register/index.php
 */
include( get_template_directory() . '/lib/register/index.php' );

/**
 * Include acf setup functions
 * Note: this should be only setup for backend, any functions for template usage
 * should be created inside ftheme/inc/_partials
 * @link ./lib/acf/index.php
 */
include( get_template_directory() . '/lib/acf/index.php' );

function getCountyCodeUsingGeolocation()
    {
        if (\function_exists('geoip_country_code_by_name')) {
            $clientIp = $_SERVER['REMOTE_ADDR'];

            if (filter_var($_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP)) {
                $clientIp = $_SERVER['HTTP_CLIENT_IP'];
            } elseif(filter_var($_SERVER['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP)) {
                $clientIp = $_SERVER['HTTP_X_FORWARDED_FOR'];
            }

            $country = strtoupper(geoip_country_code_by_name($clientIp));
            if ($country) {
                return $country;
            }
        }

        return false;
    }

// $con = getCountyCodeUsingGeolocation();
// switch ($con) {
    // case 'GB':
    // case 'UK':
    //     $GLOBALS['currency'] = '&pound;';
    //         wp_redirect( '/uk' ); exit;
    //     break;
//     case 'US':
//         $GLOBALS['currency'] = '$';
//             wp_redirect( '/us' ); exit;
//         break;
//     case 'CA':
//         $GLOBALS['currency'] = 'US$';
//         wp_redirect( '/ca' ); exit;
//         break;
//     case 'AU':
//         $GLOBALS['currency'] = 'AU$';
//             wp_redirect( '/au' ); exit;
//         break;
//         case 'NZ':
//             $GLOBALS['currency'] = 'NZ$';
//                 wp_redirect( '/nz' ); exit;
//             break;
// }

// $cont = getContinetCodeUsingGeolocation();
// switch ($cont) {
    // case 'EU':
    //     if (!array_key_exists('currency', $GLOBALS)) {
    //         $GLOBALS['currency'] = '&euro;';
    //         $GLOBALS['val'] = 'EUR';
    //     }

    // break;

//     case 'OC':
//         if (!array_key_exists('currency', $GLOBALS)) {
//             if ($con == 'AU') {
//                 $GLOBALS['currency'] = 'AU$';
//                 $GLOBALS['val'] = 'AU$';
//             } else if ($con == 'NZ') {
                
//                 $GLOBALS['currency'] = 'NZ$';
//                 $GLOBALS['val'] = 'NZ$';
//             }
           
//         }

//     break;
    
//     default:
//     //$GLOBALS['currency'] = 'US$';
//     $GLOBALS['val'] = 'USD';
    
//         break;
// }


// function getContinetCodeUsingGeolocation()
// {
//     if (\function_exists('geoip_continent_code_by_name')) {
//         $clientIp = $_SERVER['REMOTE_ADDR'];

//         if (filter_var($_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP)) {
//             $clientIp = $_SERVER['HTTP_CLIENT_IP'];
//         } elseif(filter_var($_SERVER['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP)) {
//             $clientIp = $_SERVER['HTTP_X_FORWARDED_FOR'];
//         }

//         $continet = strtoupper(geoip_continent_code_by_name($clientIp));
//         if ($continet) {
//             return $continet;
//         }
//     }

//     return false;
// }

function getContinetCodeUsingGeolocation()
{
    if (\function_exists('geoip_continent_code_by_name')) {
        $clientIp = $_SERVER['REMOTE_ADDR'];

        if (filter_var($_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP)) {
            $clientIp = $_SERVER['HTTP_CLIENT_IP'];
        } elseif(filter_var($_SERVER['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP)) {
            $clientIp = $_SERVER['HTTP_X_FORWARDED_FOR'];
        }

        $continet = strtoupper(geoip_continent_code_by_name($clientIp));
        if ($continet) {
            return $continet;
        }
    }

    return false;
}


function redirect_page() {

    if (isset($_SERVER['HTTPS']) &&
       ($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1) ||
       isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
       $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
       $protocol = 'https://';
       }
       else {
       $protocol = 'http://';
   }

   $currenturl = $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
   $currenturl_relative = wp_make_link_relative($currenturl);

   switch ($currenturl_relative) {
   
       case '/':
        $cont = getContinetCodeUsingGeolocation();
        $country = getCountyCodeUsingGeolocation();
        if ($cont == 'AF' || $cont == 'AS') {
           $urlto = home_url($path = '/', $scheme = 'https');
        }
        else if ($country == 'GB' || $country == 'JE' || $country == 'IM') {
            $urlto = 'https://celestyal.com/uk/';
        }
        else if ($country == 'US') {
            $urlto = 'https://celestyal.com/us/';
        }
        else if ($country == 'CA') {
            $urlto = 'https://celestyal.com/ca/';
        }
        else if ($country == 'AU' || $country == 'FJ') {
            $urlto = 'https://celestyal.com/au/';
        }
        else if ($country == 'NZ') {
            $urlto = 'https://celestyal.com/nz/';
        }
        else if ($country == 'DE' || $country == 'AT' || $country == 'CH' || $country == 'LI') {
            $urlto = 'https://celestyal.com/de/';
        }
        else if ($country == 'FR' || $country == 'LU' || $country == 'MC') {
            $urlto = 'https://celestyal.com/fr/';
        }
        else if ($country == 'ES' || $country == 'AD') {
            $urlto = 'https://celestyal.com/es/';
        }

        else if ($country == 'BG' || $country == 'RS' || $country == 'HR' || $country == 'BA' || $country == 'AL' || $country == 'ME' || $country == 'SI' || $country == 'MK' || $country == 'RO') {
            $urlto = 'https://celestyal.com/en-blk/';
        }
        else if ($country == 'GR' || $country == 'CY') {
            $urlto = 'https://celestyal.com/el/';
        }
        else if ($country == 'BR' || $country == 'AO' || $country == 'MZ' || $country == 'GW' || $country == 'CV') {
            $urlto = 'https://celestyal.com/pt-br/';
        }
        else if ($country == 'AR' || $country == 'UY' || $country == 'PY') {
            $urlto = 'https://celestyal.com/es-ar/';
        }
        else if ($country == 'CL' || $country == 'PE' || $country == 'BO') {
            $urlto = 'https://celestyal.com/es-cl/';
        }
        else if ($country == 'MX' || $country == 'GT' || $country == 'HN' || $country == 'BZ' || $country == 'CU' || $country == 'DO' || $country == 'HN' || $country == 'HT' || $country == 'PA' || $country == 'CR' || $country == 'NI') {
            $urlto = 'https://celestyal.com/es-mx/';
        }
        else if ($country == 'CO' || $country == 'VE' || $country == 'EC' || $country == 'GY') {
            $urlto = 'https://celestyal.com/es-co/';
        }
        else if ($country == 'BY' || $country == 'BE' || $country == 'CZ' || $country == 'DK' || $country == 'EE' || $country == 'FI' || $country == 'GE' || $country == 'GI' || $country == 'HU' || $country == 'IS' || $country == 'IE' || $country == 'IT' || $country == 'LV' || $country == 'LT' || $country == 'MT' || $country == 'MD' || $country == 'NL' || $country == 'NO') {
            $urlto = 'https://celestyal.com/en-eu/';
        }
        else {
            $urlto = home_url($path = '/', $scheme = 'https');
        }
           break;
       
       default:
           return;
   
   }
   
   if ($currenturl != $urlto)
       exit( wp_redirect( $urlto ) );


}
add_action( 'template_redirect', 'redirect_page' );

 
add_action('acf/submit_form', function($form, $post_id) {
    $fullname=get_field('tourist_name', $post_id).' '.get_field('tourist_surname', $post_id);
    wp_update_post(array(
      'ID' => $post_id,
      'post_title' => $fullname,
   ));
  }, 10, 2);
 

if ( 'POST' == $_SERVER['REQUEST_METHOD'] && !empty( $_POST['action'] ) && $_POST['action'] == "front_post") {

//store our post vars into variables for later use
//now would be a good time to run some basic error checking/validation
//to ensure that data for these values have been set
$title     = $_POST['title'];
$content   = $_POST['content'];
$tags   = $_POST['tag'];
$custom_field = $_POST['custom_1']; 
$post_type = 'traveler';


//the array of arguements to be inserted with wp_insert_post
$new_post = array(
'post_title'    => $title,
'post_content'  => $content,
'tags_input'  => $tags,
'post_status'   => 'publish',
'post_category' => array('0',$_POST['cat']),          
'post_type'     => $post_type 
);

//insert the the post into database by passing $new_post to wp_insert_post
//store our post ID in a variable $pid
//we now use $pid (post id) to help add out post meta data
 $pid=wp_insert_post($new_post);

//we now use $pid (post id) to help add out post meta data
add_post_meta($pid, 'cust_key', $custom_field);


}
 
 /* ---------------------------------------------------------------------------

* Set hreflang="x-default" according to Google content guidelines with WPML

* --------------------------------------------------------------------------- */

add_filter('wpml_alternate_hreflang', 'wps_head_hreflang_xdefault', 10, 2);

function wps_head_hreflang_xdefault($url, $lang_code) {

if($lang_code == apply_filters('wpml_default_language', NULL )) {

echo '<link rel="alternate" hreflang="x-default" href="' . $url . '" />';

}

return $url;

}

 
 /*
* Creating a function to create our CPT
*/
 
function cptui_register_my_cpts_press() {

	/**
	 * Post Type: Press.
	 */

	$labels = [
		"name" => __( "Press", "ftheme" ),
		"singular_name" => __( "Press", "ftheme" ),
		"menu_name" => __( "Press", "ftheme" ),
		"all_items" => __( "All Press", "ftheme" ),
		"add_new" => __( "Add new", "ftheme" ),
		"add_new_item" => __( "Add new Press", "ftheme" ),
		"edit_item" => __( "Edit Press", "ftheme" ),
		"new_item" => __( "New Press", "ftheme" ),
		"view_item" => __( "View Press", "ftheme" ),
		"view_items" => __( "View Press", "ftheme" ),
		"search_items" => __( "Search Press", "ftheme" ),
		"not_found" => __( "No Press found", "ftheme" ),
		"not_found_in_trash" => __( "No Press found in trash", "ftheme" ),
		"parent" => __( "Parent Press:", "ftheme" ),
		"featured_image" => __( "Featured image for this Press", "ftheme" ),
		"set_featured_image" => __( "Set featured image for this Press", "ftheme" ),
		"remove_featured_image" => __( "Remove featured image for this Press", "ftheme" ),
		"use_featured_image" => __( "Use as featured image for this Press", "ftheme" ),
		"archives" => __( "Press archives", "ftheme" ),
		"insert_into_item" => __( "Insert into Press", "ftheme" ),
		"uploaded_to_this_item" => __( "Upload to this Press", "ftheme" ),
		"filter_items_list" => __( "Filter Press list", "ftheme" ),
		"items_list_navigation" => __( "Press list navigation", "ftheme" ),
		"items_list" => __( "Press list", "ftheme" ),
		"attributes" => __( "Press attributes", "ftheme" ),
		"name_admin_bar" => __( "Press", "ftheme" ),
		"item_published" => __( "Press published", "ftheme" ),
		"item_published_privately" => __( "Press published privately.", "ftheme" ),
		"item_reverted_to_draft" => __( "Press reverted to draft.", "ftheme" ),
		"item_scheduled" => __( "Press scheduled", "ftheme" ),
		"item_updated" => __( "Press updated.", "ftheme" ),
		"parent_item_colon" => __( "Parent Press:", "ftheme" ),
	];

	$args = [
		"label" => __( "Press", "ftheme" ),
		"labels" => $labels,
		"description" => "",
		"public" => true,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => true,
		"rest_base" => "",
		"rest_controller_class" => "WP_REST_Posts_Controller",
		"has_archive" => "press",
		"show_in_menu" => true,
		"show_in_nav_menus" => true,
		"delete_with_user" => false,
		"exclude_from_search" => false,
		"capability_type" => "post",
		"map_meta_cap" => true,
		"hierarchical" => false,
		"rewrite" => [ "slug" => "press", "with_front" => true ],
		"query_var" => true,
		"menu_position" => 9,
		"menu_icon" => "dashicons-media-spreadsheet",
		"supports" => [ "title", "editor", "thumbnail", "custom-fields" ],
		"show_in_graphql" => false,
	];

	register_post_type( "press", $args );
}

add_action( 'init', 'cptui_register_my_cpts_press' );


function cptui_register_my_taxes_press_category() {

	/**
	 * Taxonomy: Press Categories.
	 */

	$labels = [
		"name" => __( "Press Categories", "ftheme" ),
		"singular_name" => __( "Press Category", "ftheme" ),
		"menu_name" => __( "Press Categories", "ftheme" ),
		"all_items" => __( "All Press Categories", "ftheme" ),
		"edit_item" => __( "Edit Press Category", "ftheme" ),
		"view_item" => __( "View Press Category", "ftheme" ),
		"update_item" => __( "Update Press Category name", "ftheme" ),
		"add_new_item" => __( "Add new Press Category", "ftheme" ),
		"new_item_name" => __( "New Press Category name", "ftheme" ),
		"parent_item" => __( "Parent Press Category", "ftheme" ),
		"parent_item_colon" => __( "Parent Press Category:", "ftheme" ),
		"search_items" => __( "Search Press Categories", "ftheme" ),
		"popular_items" => __( "Popular Press Categories", "ftheme" ),
		"separate_items_with_commas" => __( "Separate Press Categories with commas", "ftheme" ),
		"add_or_remove_items" => __( "Add or remove Press Categories", "ftheme" ),
		"choose_from_most_used" => __( "Choose from the most used Press Categories", "ftheme" ),
		"not_found" => __( "No Press Categories found", "ftheme" ),
		"no_terms" => __( "No Press Categories", "ftheme" ),
		"items_list_navigation" => __( "Press Categories list navigation", "ftheme" ),
		"items_list" => __( "Press Categories list", "ftheme" ),
		"back_to_items" => __( "Back to Press Categories", "ftheme" ),
	];

	
	$args = [
		"label" => __( "Press Categories", "ftheme" ),
		"labels" => $labels,
		"public" => true,
		"publicly_queryable" => true,
		"hierarchical" => true,
		"show_ui" => true,
		"show_in_menu" => true,
		"show_in_nav_menus" => true,
		"query_var" => true,
		"rewrite" => [ 'slug' => 'media', 'with_front' => true,  'hierarchical' => true, ],
		"show_admin_column" => false,
		"show_in_rest" => true,
		"show_tagcloud" => true,
		"rest_base" => "press_category",
		"rest_controller_class" => "WP_REST_Terms_Controller",
		"show_in_quick_edit" => true,
		"show_in_graphql" => false,
	];
	register_taxonomy( "press_category", [ "press" ], $args );
}
add_action( 'init', 'cptui_register_my_taxes_press_category' );
