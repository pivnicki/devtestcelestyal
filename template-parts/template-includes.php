<?php
/* Template Name: Includes */
get_header();
$page_title = get_field('page_title');
$page_subtitle = get_field('page_subtitle');
?>
    <div id="content" class="site-content">
        <?php headerPage(); ?>
        <main id="main" class="page-main site-main" role="main">
            <section class="section inner-content">
                <div class="wrapper">
                    <?php the_breadcrumb(); ?>
                    <div class="wrap">
                        <?php if ($page_title) : ?>
                            <h2 class="_12 ofs_m1 _m10 a-title -inner-content"><?= $page_title; ?></h2>
                        <?php endif; ?>
                        <?php if ($page_subtitle) : ?>
                            <div class="_12 ofs_m1 _m10 a-subtitle -inner-content"><?= $page_subtitle; ?></div>
                        <?php endif; ?>
                    </div>
                    <div class="page-content">
                        <div class="wrap m-staff">
                            <?php if (have_rows('content')) : ?>
                                <?php while (have_rows('content')) : the_row();
                                    if (get_row_layout() == 'packages') : ?>
                                        <?php include(get_template_directory() . '/template-parts/inner/_acf-hub.php');
                                    elseif (get_row_layout() == 'meals') : ?>
                                        <?php include(get_template_directory() . '/template-parts/inner/_acf-meals.php');?>
                                    <?php
                                    elseif (get_row_layout() == 'entertainments') : ?>
                                        <?php include(get_template_directory() . '/template-parts/inner/_acf-entertainment.php');?>
                                    <?php
                                    elseif (get_row_layout() == 'drinks') : ?>
                                        <?php include(get_template_directory() . '/template-parts/inner/_acf-drinks.php');?>
                                    <?php
                                    endif;
                                endwhile;
                            endif; ?>
                        </div>
                    </div>
                </div>
            </section>
            <?php
                if (is_page('select-shore-excursions')):
                get_template_part('template-parts/layout/excursions');
                endif;
            if (get_field('show_top_cruises')):
                get_template_part('template-parts/layout/top', 'cruise');
            endif;
            special_offers(); ?>
        </main>
    </div>
<?php
get_footer();

