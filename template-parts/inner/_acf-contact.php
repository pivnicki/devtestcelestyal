<?php
$title = get_field('title');?>
<h2 class="_s12 ofs_m1 _m10 a-title -inner-content"><?= $title; ?></h2>
<div class="_12 _l8">
    <div class="wrap">
    <?php if (have_rows('contact_left')): ?>
        <?php while (have_rows('contact_left')) : the_row();
            $country = get_sub_field('country');
            $description = get_sub_field('description'); ?>
        <div class="_12 _s6 -locations">
            <h5 class="a-text -contact"><?= $country; ?></h5>
            <div class="a-text -location"><?= $description; ?></div>
        </div>
    <?php endwhile; ?>
<?php endif; ?>
    </div>
</div>
<div class="_12 _l4">
    <div class="-press">
    <?php if (have_rows('contact_right')): ?>
        <?php while (have_rows('contact_right')) : the_row();
            $title = get_sub_field('title');
            $description = get_sub_field('description'); ?>
            <h5 class="a-text -contact"><?= $title; ?></h5>
            <div class="a-text -location"><?= $description; ?></div>
        <?php endwhile; ?>
    <?php endif; ?>
    </div>
</div>