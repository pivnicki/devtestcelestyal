<?php
/* Template Name: Cruise Pages */
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
                </div>
            </section>
                <div class="page-content">
                        <?php if (have_rows('content')) : ?>
                            <?php while (have_rows('content')) : the_row();
                                if (get_row_layout() == 'christmas') : ?>
                                    <?php include(get_template_directory() . '/template-parts/inner/_acf-cruise-christmas.php');
                                elseif (get_row_layout() == 'christmas_slider') : ?>
                                    <?php include(get_template_directory() . '/template-parts/inner/_acf-christmas-slider.php');?>
                                <?php
                                elseif (get_row_layout() == 'all_inclusive') : ?>
                                    <?php include(get_template_directory() . '/template-parts/inner/_acf-christmas-inclusive.php');?>
                                <?php
                                elseif (get_row_layout() == 'drinks') : ?>
                                    <?php include(get_template_directory() . '/template-parts/inner/_acf-drinks.php');?>
                                <?php
                                endif;
                            endwhile;
                        endif; ?>
                </div>
        </main>
        <?php special_offers(); ?>
    </div>
<?php
get_footer();

