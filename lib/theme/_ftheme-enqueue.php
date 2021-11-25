<?php
/**
 * Enqueue newer jquery on pages (not admin panel and in DEBUG mode)
 */

if ( !is_admin() && WP_DEBUG === true ) add_action( 'wp_enqueue_scripts', function () {
    wp_deregister_script('jquery');
    wp_register_script('jquery', get_template_directory_uri() . '/src/scripts/src/jquery.js', false, null);
    wp_enqueue_script('jquery');

}, 11 );

/**
 * Enqueue scripts and styles.
 *
 * All scripts should be pulled inside src folder by running command gulp scripts:dep
 *
 * Use globalSite['home'] . '/bower_components...' to get bower components
 * Use themeRoot() . '/...' to get local sources
 */

add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style( 'ftheme-style', get_stylesheet_uri() );

    if(is_category( 'blog' )) {
        wp_enqueue_script( 'loadmore', get_template_directory_uri() . '/src/scripts/src/loadmore.js', array('jquery'), true );
    }

    if( WP_DEBUG === true ) {
        wp_enqueue_script( 'ftheme-slick', get_template_directory_uri() . '/src/scripts/src/slick.js', array('jquery'), true );
        wp_enqueue_script( 'ftheme-fbox', get_template_directory_uri() . '/src/scripts/src/fancy-box.js', array('jquery'), true );
        wp_enqueue_script( 'actual', get_template_directory_uri() . '/src/scripts/src/jquery.actual.min.js', array('jquery'), true );
        wp_enqueue_script( 'ajax', get_template_directory_uri() . '/src/scripts/src/brochure-ajax.js', array('jquery'), true );
        wp_enqueue_script( 'ftheme-script', get_template_directory_uri() . '/src/scripts/src/script.js', array('jquery'), true );

    } else {
        wp_enqueue_script( 'ajax', get_template_directory_uri() . '/src/scripts/src/brochure-ajax.js', array('jquery'), true );
        wp_enqueue_script( 'ftheme-script-min', get_template_directory_uri() . '/bundles/scripts/scripts.min.js', false, true );
    }

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
} );