<?php
/* Template Name: Our Ships */
get_header();
?>

    <div id="content" class="site-content">
        <?php headerPage(); ?>
        <main id="main" class="page-main site-main" role="main">
                    <?php if (have_rows('content')) : ?>
                        <?php while (have_rows('content')) : the_row();
                            if (get_row_layout() == 'overview') : ?>
                                <?php include(get_template_directory() . '/template-parts/inner/_acf-overview.php'); ?>
                            <?php
                            elseif (get_row_layout() == 'staterooms') : ?>
                                <?php include(get_template_directory() . '/template-parts/inner/_acf-stateroom.php'); ?>
                            <?php
                            elseif (get_row_layout() == 'restaurants') : ?>
                                <?php include(get_template_directory() . '/template-parts/inner/_acf-restaurants.php'); ?>
                            <?php
                            elseif (get_row_layout() == 'bars') : ?>
                                <?php include(get_template_directory() . '/template-parts/inner/_acf-bars.php'); ?>
                            <?php
                            elseif (get_row_layout() == 'spa') : ?>
                                <?php include(get_template_directory() . '/template-parts/inner/_acf-spa.php'); ?>
                            <?php
                            elseif (get_row_layout() == 'services') : ?>
                                <?php include(get_template_directory() . '/template-parts/inner/_acf-services.php'); ?>
                            <?php
                            elseif (get_row_layout() == 'deck') : ?>
                                <?php include(get_template_directory() . '/template-parts/inner/_acf-deck.php'); ?>
                            <?php
                           endif;
                        endwhile;
                    endif; ?>
                    <?php
                    if (get_field('show_top_cruises')):
                    get_template_part('template-parts/layout/top', 'cruise');
                    endif;
             special_offers(); ?>
        </main>
    </div>
<?php
get_footer();

