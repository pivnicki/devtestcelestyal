<?php
/**
 * File for registering options page in back end
 * @link https://www.advancedcustomfields.com/resources/options-page/
 */
if( function_exists('acf_add_options_page') ) {

	acf_add_options_page(array(
		'page_title' 	=> 'Theme General Settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Top Cruise Settings',
		'menu_title'	=> 'Top Cruise',
		'parent_slug'	=> 'theme-general-settings',
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Our Destinations Settings',
		'menu_title'	=> 'Our Destinations',
		'parent_slug'	=> 'theme-general-settings',
	));

    acf_add_options_sub_page(array(
        'page_title' 	=> 'Our Excursions Settings',
        'menu_title'	=> 'Our Excursions',
        'parent_slug'	=> 'theme-general-settings',
    ));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'All Inclusive Crusing Settings',
		'menu_title'	=> 'All Inclusive Crusing',
		'parent_slug'	=> 'theme-general-settings',
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Theme Footer Settings',
		'menu_title'	=> 'Footer',
		'parent_slug'	=> 'theme-general-settings',
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Theme Social Settings',
		'menu_title'	=> 'Social Networks',
		'parent_slug'	=> 'theme-general-settings',
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Special Offers',
		'menu_title'	=> 'Special Offers',
		'parent_slug'	=> 'theme-general-settings',
	));

    acf_add_options_sub_page(array(
        'page_title' 	=> 'All Inclusive',
        'menu_title'	=> 'All Inclusive',
        'parent_slug'	=> 'theme-general-settings',
    ));

    acf_add_options_sub_page(array(
        'page_title' 	=> 'All Inclusive Cruise Nights',
        'menu_title'	=> 'All Inclusive Cruise Nights',
        'parent_slug'	=> 'theme-general-settings',
    ));
}