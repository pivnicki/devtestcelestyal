<?php
global $globalSite;
$all_inclusive_title = get_field('titleh','option');
$bottom_button_inc = get_field('linkh','option');?>
<section class="section all-inclusive">
    <div class="wrapper">
        <?php if ($all_inclusive_title) : ?>
            <div class="wrap">
                <h1 class="_12 a-title -section"><?php echo $all_inclusive_title; ?></h1>
            </div>
        <?php
        endif;
        if (have_rows('all_inclusive_repeaterh','option')): ?>
            <div class="wrap m-cards">
                <?php
                $count = 1;
                while (have_rows('all_inclusive_repeaterh','option')): the_row();
                    $title = get_sub_field('title');
                    $image = get_sub_field('image');
                    $link = get_sub_field('link');?>
                    <a href="<?php echo $link['url']; ?>" class="a-link -card _12 <?php if ($count == 1) echo '_m8'; else echo '_m4'; ?>">
                        <div class="m-card inclusive"
                             style="background-image: url(<?php echo $image; ?>)">
                            <h3 class="a-title -card inclusive"><?php echo $title; ?></h3>
                        </div>
                    </a>
                    <?php
                    $count++;
                endwhile;
                ?>
            </div>
        <?php
        endif; ?>

            <div class="wrap">
                <div class="_12 f-center">
                    <a class="a-link inverse -center" href="<?php echo $bottom_button_inc['url']; ?>"><?php echo $bottom_button_inc['title']; ?></a>
                </div>
            </div>

    </div>
</section>