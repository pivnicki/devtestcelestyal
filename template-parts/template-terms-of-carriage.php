<?php
/* Template Name: Terms Of Carriage */
get_header();
$page_title = get_field('page_title');
$page_subtitle = get_field('page_subtitle');?>
    <div id="content" class="site-content">
        <?php if(!is_page('Manage My Booking')):
            headerPage();
        endif; ?>
        <main id="main" class="" role="main">
            <section class="section inner-page">
                <div class="wrapper">
                    <?php the_breadcrumb(); ?>

                    <div class="wrap">
                        <?php if ($page_title) : ?>
                            <h2 class="_12 a-title -inner-content -guide"><?= $page_title; ?></h2>
                        <?php endif; ?>

                    </div>

                    <div class="page-content">
                        <div class="wrap">
                            <div class="_l9">
                                <?php if ($page_subtitle) : ?>
                                    <h2 class="a-text"><?= $page_subtitle; ?></h2>
                                <?php endif; ?>
                                <?php if (have_rows('content')) : ?>
                                    <?php while (have_rows('content')) : the_row();
                                        if (get_row_layout() == 'accordions') :
                                            include(get_template_directory() . '/template-parts/inner/_acf-accordion.php');
                                        elseif (get_row_layout() == 'wysiwyg') :
                                            include(get_template_directory() . '/template-parts/inner/_acf-wysiwyg.php');
                                        elseif (get_row_layout() == 'gdpr_policies') :
                                            include(get_template_directory() . '/template-parts/inner/_acf-gdpr.php');
                                        elseif (get_row_layout() == 'carriage') :
                                            include(get_template_directory() . '/template-parts/inner/_acf-carriage.php');
                                        endif;
                                    endwhile;
                                endif; ?>
                            </div>
                            <div class="_l3">
                                <nav class="side-navigation" role="navigation">
                                    <?php //do_action('wpml_add_language_selector'); ?>
                                    <?php wp_nav_menu(array('menu' => 'Carriage menu', 'menu_class' => 'menu side-menu')); ?>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <?php
            if (get_field('show_top_cruises')):
                get_template_part('template-parts/layout/top', 'cruise');
            elseif (get_field('show_all_inclusive')):
                get_template_part('template-parts/layout/all', 'inclusive-text');
            endif;?>
        </main>
    </div>
<?php
get_footer();
