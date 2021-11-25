<?php
/**
 * Include all _acf functions regarding back-end
 *
 * @package ftheme
 */

/**
 * Include custom ACF fields in back end
 */
include( get_template_directory() . '/lib/acf/_acf-custom-fields.php' );

/**
 * Include ACF options page register function
 */
include( get_template_directory() . '/lib/acf/_acf-register-options.php' );