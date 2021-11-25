<section class="section inner-content">
    <div class="wrapper">
        <h2 class="_12 ofs_m1 _m10 a-title -inner-content"><?= $title; ?></h2>
        <?php if (have_rows('occasions_repeater')) : ?>
            <div class="wrap m-staff">
                <?php while (have_rows('occasions_repeater')) : the_row();
                $subtitle = get_sub_field('subtitle');
                    $image = get_sub_field('image');
                    $title = get_sub_field('title');
                    $content= get_sub_field('content'); ?>
                    <div class="_12 _m4 m-single -staff">
                        <img class="a-image -staff" src="<?= $image; ?>"/>
                        <h4 class="a-title -staff"><?= $title; ?></h4>
                        <p class="a-text -location"><?= $subtitle; ?></p>
                        <div class="a-text -staff"><?= $content; ?>
                        </div>
                    </div>
                <?php
                endwhile; ?>
            </div>
        <?php
        endif; ?>
    </div>
</section>