<div class="bf-images">
    <?php
    while (have_rows('images_repeater')) : the_row();
        $img = get_sub_field('image'); ?>
        <div class="">
        </div>
       <img src="<?php echo $img; ?>" alt="">
    <?php
    endwhile; ?>
</div>
