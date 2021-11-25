<?php
/**
 * This functions are dependency functions for the theme
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */

function ftheme_setup() {
    /**
     * Make theme available for translation.
     * Translations can be filed in the /languages/ directory.
     * If you're building a theme based on ftheme, use a find and replace
     * to change 'ftheme' to the name of your theme in all the template files.
     */
    load_theme_textdomain( 'ftheme', get_template_directory() . '/languages' );

    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );

    /**
     * Let WordPress manage the document title.
     * By adding theme support, we declare that this theme does not use a
     * hard-coded <title> tag in the document head, and expect WordPress to
     * provide it for us.
     */
    add_theme_support( 'title-tag' );

    /**
     * Enable support for Post Thumbnails on posts and pages.
     *
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support( 'post-thumbnails' );

    /**
     * Register nav menus
     * @uses register_nav_menu() 	Add support for navigation menus.
     *
     * @see ftheme_menus()
     */
    add_action( 'init', 'ftheme_menus' );

    /**
     * Switch default core markup for search form, comment form, and comments
     * to output valid HTML5.
     */
    add_theme_support( 'html5', array(
        'aside',
        'image',
        'video',
        'quote',
        'link',
        'gallery',
        'status',
        'audio',
        'chat',
    ) );

    /**
     * Add theme support for selective refresh for widgets.
     */
    add_theme_support( 'customize-selective-refresh-widgets' );
}

add_action( 'after_setup_theme', 'ftheme_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
add_action( 'after_setup_theme', function () {
    $GLOBALS['content_width'] = apply_filters( 'ftheme_content_width', 640 );
}, 0 );

//include (get_template_directory() . '/lib/register/_register-menus.php');

/**
 * Add a pingback url auto-discovery header for singularly identifiable articles.
 */
function ftheme_pingback_header() {
    if ( is_singular() && pings_open() ) {
        echo '<link rel="pingback" href="', bloginfo( 'pingback_url' ), '">';
    }
}
add_action( 'wp_head', 'ftheme_pingback_header' );

/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package ftheme
 */

if ( ! function_exists( 'ftheme_posted_on' ) ) :
    /**
     * Prints HTML with meta information for the current post-date/time and author.
     */
    function ftheme_posted_on() {
        $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
        if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
            $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
        }

        $time_string = sprintf( $time_string,
            esc_attr( get_the_date( 'c' ) ),
            esc_html( get_the_date() ),
            esc_attr( get_the_modified_date( 'c' ) ),
            esc_html( get_the_modified_date() )
        );

        $posted_on = sprintf(
            esc_html_x( 'Posted on %s', 'post date', 'ftheme' ),
            '<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
        );

        $byline = sprintf(
            esc_html_x( 'by %s', 'post author', 'ftheme' ),
            '<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
        );

        echo '<span class="posted-on">' . $posted_on . '</span><span class="byline"> ' . $byline . '</span>'; // WPCS: XSS OK.

    }
endif;

if ( ! function_exists( 'ftheme_entry_footer' ) ) :
    /**
     * Prints HTML with meta information for the categories, tags and comments.
     */
    function ftheme_entry_footer() {
        // Hide category and tag text for pages.
        if ( 'post' === get_post_type() ) {
            /* translators: used between list items, there is a space after the comma */
            $categories_list = get_the_category_list( esc_html__( ', ', 'ftheme' ) );
            if ( $categories_list ) {
                /* translators: 1: list of categories. */
                printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', 'ftheme' ) . '</span>', $categories_list ); // WPCS: XSS OK.
            }

            /* translators: used between list items, there is a space after the comma */
            $tags_list = get_the_tag_list( '', esc_html_x( ', ', 'list item separator', 'ftheme' ) );
            if ( $tags_list ) {
                /* translators: 1: list of tags. */
                printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', 'ftheme' ) . '</span>', $tags_list ); // WPCS: XSS OK.
            }
        }

        if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
            echo '<span class="comments-link">';
            comments_popup_link(
                sprintf(
                    wp_kses(
                    /* translators: %s: post title */
                        __( 'Leave a Comment<span class="screen-reader-text"> on %s</span>', 'ftheme' ),
                        array(
                            'span' => array(
                                'class' => array(),
                            ),
                        )
                    ),
                    get_the_title()
                )
            );
            echo '</span>';
        }

        edit_post_link(
            sprintf(
                wp_kses(
                /* translators: %s: Name of current post. Only visible to screen readers */
                    __( 'Edit <span class="screen-reader-text">%s</span>', 'ftheme' ),
                    array(
                        'span' => array(
                            'class' => array(),
                        ),
                    )
                ),
                get_the_title()
            ),
            '<span class="edit-link">',
            '</span>'
        );
    }
endif;
/**
 * Class WPSE_78121_Sublevel_Walker
 * Custom navigation walker to add sub trigger button
 */
class FSD_Custom_Nav_Walker extends Walker_Nav_Menu
{
    function start_lvl( &$output, $depth = 0, $args = array() ) {
        $indent = str_repeat("\t", $depth);
        if ($depth == 0) {
            $output .= "\n$indent<div class='sub-menu-d-wrapper'><div class='sub-menu-trigger'></div><div class='submenu-wrap'><ul class='sub-menu'>\n";
        } else {
            $output .= "\n$indent<div class='sub-menu-trigger'></div><div class='submenu-wrap'><ul class='sub-menu'>\n";
        }
    }
    function end_lvl( &$output, $depth = 0, $args = array() ) {
        $indent = str_repeat("\t", $depth);
        if ($depth == 0) {
            $output .= "$indent</ul></div></div>\n";
        } else {
            $output .= "$indent</ul></div>\n";
        }
    }
}
/**
 * Custom function that enables new walker class on all menus
 * @param $args
 * @return array
 */
function custom_walker( $args ) {
    //TODO Fix error when no primary menu is selected
    return array_merge( $args, array(
        'walker' => new FSD_Custom_Nav_Walker(),
    ) );
}
add_filter( 'wp_nav_menu_args', 'custom_walker' );
/**
 * Returns true if a blog has more than 1 category.
 *
 * @return bool
 */
function ftheme_categorized_blog() {
    if ( false === ( $all_the_cool_cats = get_transient( 'ftheme_categories' ) ) ) {
        // Create an array of all the categories that are attached to posts.
        $all_the_cool_cats = get_categories( array(
            'fields'     => 'ids',
            'hide_empty' => 1,
            // We only need to know if there is more than one category.
            'number'     => 2,
        ) );

        // Count the number of categories that are attached to the posts.
        $all_the_cool_cats = count( $all_the_cool_cats );

        set_transient( 'ftheme_categories', $all_the_cool_cats );
    }

    if ( $all_the_cool_cats > 1 ) {
        // This blog has more than 1 category so ftheme_categorized_blog should return true.
        return true;
    } else {
        // This blog has only 1 category so ftheme_categorized_blog should return false.
        return false;
    }
}

/**
 * Flush out the transients used in ftheme_categorized_blog.
 */
function ftheme_category_transient_flusher() {
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    // Like, beat it. Dig?
    delete_transient( 'ftheme_categories' );
}
add_action( 'edit_category', 'ftheme_category_transient_flusher' );
add_action( 'save_post',     'ftheme_category_transient_flusher' );

/**
 * Global variables
 * The most used WordPress core functions.
 * @example echo $globalSite['theme_url']
 */
function fsd_global_site() {
    $site = array(
        'home' 					=> esc_url( home_url( '/' ) ),
        'name'					=> get_bloginfo( 'name' ),
        'description'			=> get_bloginfo( 'description' ),
        'language'				=> get_bloginfo( 'language' ),
        // this is the only way to get title for blog page ( index.php )
        'blog' 					=> get_option( 'page_for_posts', true ),
        'posts_per_page'        => get_option( 'posts_per_page' ),

        'wpurl'					=> get_bloginfo( 'wpurl' ),
        'url'					=> get_bloginfo( 'url' ),
        'rss_url'				=> get_bloginfo( 'rss_url' ),
        'rss2_url'				=> get_bloginfo( 'rss2_url' ),

        'template_url' 			=> get_bloginfo( 'template_url' ),
        'stylesheet_url'		=> get_bloginfo( 'stylesheet_url' ),
        'stylesheet_directory'	=> get_bloginfo( 'stylesheet_directory' ),
        'theme_url' 			=> get_template_directory_uri(),
        // this is array, path is $globalSite['upload_dir']['baseurl'] . '/';
        'upload_dir' 			=> wp_upload_dir(),

        'admin' 				=> admin_url(),
        'admin_email'			=> get_bloginfo( 'admin_email' ),
        'admin_profile' 		=> admin_url( 'profile.php' ),

        'version' 				=> get_bloginfo( 'version' )
    );
    return apply_filters( 'fsd_global_site_filter', $site );
}
$globalSite = fsd_global_site();
global $globalSite;

function wpse_5308_post_type_link( $link, $post ) {
    if ( $post->post_type === 'cruises' ) {
        if ( $terms = get_the_terms( $post->ID, 'cruise_category' ) )
            $link = str_replace( '%cruise_category%', current( $terms )->slug, $link );
        else
            $link = str_replace( '%cruise_category%', 'uncategorized', $link );
    }
    if ( $post->post_type === 'destinations' ) {
        if ( $terms = get_the_terms( $post->ID, 'destination_category' ) )
            $link = str_replace( '%destination_category%', current( $terms )->slug, $link );
        else
            $link = str_replace( '%destination_category%', 'uncategorized', $link );
    }
    if ( $post->post_type === 'excursions' ) {
        if ( $terms = get_the_terms( $post->ID, 'excursion_category' ) )
            $link = str_replace( '%excursion_category%', current( $terms )->slug, $link );
        else
            $link = str_replace( '%excursion_category%', 'uncategorized', $link );
    }

    return $link;
}

add_filter( 'post_type_link', 'wpse_5308_post_type_link', 10, 2 );

/**
 * Load WooCommerce compatibility file.
 * TODO: This is new _u option, so it is not tested and shouldn't be used in production
 */
if ( class_exists( 'WooCommerce' ) ) {
    require get_template_directory() . '/lib/woocommerce/woocommerce.php';
}

/**
 * Include enqueue scripts and styles for ftheme
 */
include ( get_template_directory() . '/lib/theme/_ftheme-enqueue.php' );

/**
 * Include meta functions (like custom excerpt, custom navigations, etc...
 */
include ( get_template_directory() . '/lib/theme/_ftheme-meta-functions.php' );

/**
 * Include breadcrumbs function
 */
include ( get_template_directory() . '/lib/theme/_ftheme-breadcrumbs.php' );

/**
 * All shortcode functions
 */
include ( get_template_directory() . '/inc/shortcodes.php');

/**
 * Include ajax function
 */
include ( get_template_directory() . '/lib/theme/_ftheme-ajax.php' );

