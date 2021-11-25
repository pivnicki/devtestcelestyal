<?php
/* Template Name: Inner Full Width */
get_header();
$page_title = get_field('page_title');
$em_video = get_field('em_video');
$page_subtitle = get_field('page_subtitle');
if ($em_video) {
    if (preg_match('/src="(.+?)"/', $em_video, $matches)) {
        $src = $matches[1];
        $params = array(
            'controls' => 0,
            'hd' => 1,
            'fs' => 0,
            'rel' => 0,
            'modestbranding' => 0,
            'autoplay' => 0,
            'showinfo' => 0,
            'title' => 0,
        );

        $new_src = add_query_arg($params, $src);

        $em_video = str_replace($src, $new_src, $em_video);
        $attributes = 'frameborder="0"';
        $em_video = str_replace('></iframe>', ' ' . $attributes . '></iframe>', $em_video);
    }
} ?>

    <div id="content" class="site-content">
        <?php headerPage(); ?>
        <main id="main" class="inner-page -about" role="main">
            <section class="section">
                <div class="wrapper">
                    <?php the_breadcrumb(); ?>

                    <div class="wrap">
                        <?php if ($page_title) : ?>
                            <h2 class="_12 ofs_m1 _m10 a-title -inner-content"><?= $page_title; ?></h2>
                        <?php endif; ?>
                        <?php if ($em_video) : ?>
                            <div class="_12 ofs_m1 _m10 a-video -inner-content"><?= $em_video; ?></div>
                        <?php endif; ?>
                        <?php if ($page_subtitle) : ?>
                            <div class="_12 ofs_m1 _m10 a-subtitle -inner-content"><?= $page_subtitle; ?></div>
                        <?php endif; ?>
                    </div>
                    <div class="page-content">
                        <div class="wrap">
                            <?php if (have_rows('content')) : ?>
                                <?php while (have_rows('content')) : the_row();
                                    if (get_row_layout() == 'accordions') : ?>
                                        <div class="_12 ofs_m1 _m10">
                                            <?php include(get_template_directory() . '/template-parts/inner/_acf-accordion.php'); ?>
                                        </div>
                                    <?php
                                    elseif (get_row_layout() == 'wysiwyg') : ?>
                                        <div class="_12 ofs_m1 _m10">
                                            <?php include(get_template_directory() . '/template-parts/inner/_acf-wysiwyg.php'); ?>
                                        </div>
                                    <?php
                                    elseif (get_row_layout() == 'images') : ?>
                                        <div class="_12 ofs_m1 _m10">
                                            <?php include(get_template_directory() . '/template-parts/inner/_acf-images.php'); ?>
                                        </div>
                                    <?php
                                    elseif (get_row_layout() == 'list') : ?>
                                        <div class="_12 ofs_m1 _m10">
                                            <?php include(get_template_directory() . '/template-parts/inner/_acf-list.php'); ?>
                                        </div>
                                    <?php
                                    elseif (get_row_layout() == 'gallery') : ?>
                                        <div class="_12">
                                            <?php include(get_template_directory() . '/template-parts/inner/_acf-slider.php'); ?>
                                        </div>
                                    <?php
                                    elseif (get_row_layout() == 'brochure') : ?>
                                        <?php include(get_template_directory() . '/template-parts/inner/_acf-brochure.php'); ?>
                                    <?php
                                    elseif (get_row_layout() == 'awards') : ?>
                                        <?php include(get_template_directory() . '/template-parts/inner/_acf-awards.php'); ?>
                                    <?php
                                     elseif (get_row_layout() == 'ships') : ?>
                                        <?php include(get_template_directory() . '/template-parts/inner/_acf-ships.php'); ?>
                                    <?php
                                    elseif (get_row_layout() == 'video') : ?>
                                        <div class="_12 ofs_m1 _m10">
                                            <?php include(get_template_directory() . '/template-parts/inner/_acf-video.php'); ?>
                                        </div>
                                    <?php
                                    elseif (get_row_layout() == 'blue_cards') :
                                        include(get_template_directory() . '/template-parts/inner/_acf-blue-cards.php'); ?>
                                    <?php
                                    elseif (get_row_layout() == 'staff') : ?>
                                        <?php include(get_template_directory() . '/template-parts/inner/_acf-staff.php'); ?>
                                    <?php
                                    elseif (get_row_layout() == 'occasions') :
                                        include(get_template_directory() . '/template-parts/inner/_acf-occasions.php'); ?>
                                    <?php
                                    elseif (get_row_layout() == 'occasions_acordion') :
                                        include(get_template_directory() . '/template-parts/inner/_acf-occasions-accordion.php');?>
                                    <?php
                                    elseif (get_row_layout() == 'occasions_birthday_accordion') :
                                        include(get_template_directory() . '/template-parts/inner/_acf-occasions-birthday.php'); ?>
                                    <?php
                                    elseif (get_row_layout() == 'occasions_wedding_accordion') :
                                        include(get_template_directory() . '/template-parts/inner/_acf-occasions-wedding.php');?>
                                    <?php 
                                    elseif (get_row_layout() == 'bf_images') : ?>
                                    <div class="_12 ofs_m1 _m10">
                                        <?php include(get_template_directory() . '/template-parts/inner/_acf-bf-images.php'); ?>
                                    </div>
                                    <?php 
                                    endif; ?>
                                <?php
                                endwhile;
                            endif; ?>
                        </div>
                    </div>
                </div>
                <?php if (get_field('show_form')): ?>
                <div class="wrapper">
                    <div class="wrap">
                        <div class="_12 _m6 ofs_m3 m-contact">
                        <?php echo do_shortcode( '[contact-form-7 id="9604" title="Experience"]');?>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
            </section>
            <?php
            if (get_field('show_all_inclusive')):
                get_template_part('template-parts/layout/all', 'inclusive');
            endif;
            if (get_field('show_top_cruises')):
                get_template_part('template-parts/layout/top', 'cruise');
            endif;
            special_offers(); ?>
        </main>
    </div>
<?php
get_footer();
