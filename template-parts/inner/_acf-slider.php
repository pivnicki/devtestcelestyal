<?php if (have_rows('image_repeater')): ?>
    <div class="wrap m-cards -info-slider -full">
        <div class="_12 edge js-infoSlider">
            <?php
            while (have_rows('image_repeater')) : the_row();
            $image = get_sub_field('image'); ?>
                <img class="a-image -infoSlide js-infoSlide" src="<?php echo $image; ?>"/>
            <?php
            endwhile; ?>
            <div class="m-nav -infoSlide">
                <div class="left"><i class="fa fa-chevron-left"></i></div>
                <div class="right"><i class="fa fa-chevron-right"></i></div>
            </div>
        </div>
    </div>
<?php endif; ?>