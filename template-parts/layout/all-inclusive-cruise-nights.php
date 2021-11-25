<?php
global $globalSite;
$all_inclusive_title = get_field('title_nights','option');?>

<section class="section inner-content ice-blue">
    <div class="wrapper">
        <div class="wrap">
            <h2 class="_12 ofs_m1 _m10 a-title -inner-content"><?= $all_inclusive_title; ?></h2>
            </div>
            <?php if (have_rows('all_inclusive_nights','option')) : ?>
                <div class="wrap m-staff">
                    <?php $count = 1;?>
                    <?php while (have_rows('all_inclusive_nights','option')) : the_row();
                        $image = get_sub_field('image');
                        $title = get_sub_field('title');
                        $content= get_sub_field('content');
                        $link= get_sub_field('link');?>
                        <div class="_12 m-single -staff <?php
                        switch ($count) {
                            case 1:
                                echo '_m8';
                                break;
                            default:
                                echo '_m4';
                        } ?>">
                            <img class="a-image -staff" src="<?= $image; ?>"/>
                            <h4 class="a-title -staff"><?= $title; ?></h4>
                            <div class="a-text -staff"><?= $content; ?></div>
                            <a href="<?php echo $link['url']; ?>" class="a-link inverse -excursion"><?php echo $link['title']; ?></a>
                        </div>
                        <?php
                        $count++;
                    endwhile; ?>
                </div>
            <?php
            endif; ?>
        </div>
    </div>
</section>