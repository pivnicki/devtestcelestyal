<?php
/**
 * @package ftheme
 */
 include_once('functions.php');
 $con = getCountyCodeUsingGeolocation();

//  if ($con == 'GB' || $con == 'UK') {
//     wp_redirect('https://www.celestyal.com/el/', 301); exit;
//     exit();
// }

// if ($con == 'GR') {
//     header('Location: https://www.celestyal.com/el');
//     exit();
// }

// if ($con == 'FRA') {
//     header('Location: https://www.celestyal.com/fr');
//     exit();
// }

// if ($con == 'DE') {
//     header('Location: https://www.celestyal.com/de');
//     exit();
// }

// if ($con == 'RS') {
//     // ob_start();
//     wp_redirect('https://www.celestyal.com/es-ar/', 301); exit;
//     // ob_end_flush();
//     // die();
// }

// if ($con == 'RS') {
//     // ob_start();
//     header('Location: https://www.celestyal.com/fr/');
//     // ob_end_flush();
//     die();
// }

// if ($con == 'AT') {
//     wp_redirect('https://www.celestyal.com/de/', 301); exit;
//     exit();
// }

// if ($con == 'RS') {
//     wp_redirect('https://www.celestyal.com/de/', 301); exit;
//     exit();
// }

// if ($con == 'DE') {
//     wp_redirect('https://www.celestyal.com/de/', 301); exit;
//     exit();
// }

// if ($con == 'GR') {
//     wp_redirect('https://www.celestyal.com/el/', 301); exit;
//     exit();
// }



global $globalSite;
$site_logo = get_field('site_logo', 'option');
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    
    <?php wp_head(); ?>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-19215297-1"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-19215297-1');
    </script>

    <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W42ZCTW');</script>
<!-- End Google Tag Manager -->
</head>

<script>
    var currency = "<?php echo $GLOBALS['val']; ?>";
</script>

<body <?php body_class(); ?>>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W42ZCTW"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<div id="page" class="site">
    <div class="m-overlay"></div>
    <header id="masthead" class="site-header" role="banner">
        <div class="wrapper">
            <a href="<?php _e( home_url( '/' ) ); ?>" id="brand" class="site-logo">
                <img src="<?php
                if ($site_logo): echo $site_logo;
                else: echo $globalSite['theme_url'] . '/bundles/images/celestyal-color-white.svg';
                endif; ?>" alt="Celestyal Cruises">
            </a>
            <div class="right">
                <div class="mobile">
                    <a class="phone" href="tel:2164009999"><i class="fa fa-phone"></i></a>
                    <button id="menu-button" class="site-menu-button v1" data-menu-trigger>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <nav class="top-navigation" role="navigation">
                    <?php// do_action('wpml_add_language_selector'); ?>
                    <?php wp_nav_menu( array( 'menu' => 'Top Menu', 'menu_class' => 'menu top-menu', 'container_class' => 'menu-top-menu-container') ); ?>
                    <button class="js-trigger search-trigger"><i class="fa fa-search"></i></button>
                </nav>
                <nav id="site-navigation" class="site-navigation" role="navigation">
                    <div class="mobile-menu">
                        <div class="mobile-search-form">
                            <form role="search" class="header-form search-form" action="http://book.celestyal.com/search/cruise">
                                <input type="search"  class="a-input search" placeholder="Type search term here" value="" name="s">
                                <button onclick="location.href='http://book.celestyal.com/search/cruise';" class="submit"></button>
                                <i class="fa fa-search"></i>
                            </form>
                        </div>
                        <?php wp_nav_menu( array( 'theme_location' => 'menu-1', 'menu_id' => 'primary-menu' ) ); ?>
                    </div>
                    <div class="desktop-menu">
                        <?php wp_nav_menu( array( 'theme_location' => 'menu-1', 'menu_id' => 'primary-menu' ) ); ?>
                    </div>
                </nav>
            </div>
        </div>
        <div class="header-search-form">
            <form role="search" class="header-form search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get">
                <input type="search" class="a-input search" placeholder="Search website..." value="" name="s">
            </form>
        </div>
    </header>