<?php
$title = get_sub_field('title');
$subtitle = get_sub_field('subtitle');
$link = get_sub_field('link');

if (have_rows('staff_repeater')) : ?>
    <div class="wrap m-staff">
        <?php $count = 1;?>
        <?php while (have_rows('staff_repeater')) : the_row();
            $image = get_sub_field('image');
            $name = get_sub_field('name');
            $description= get_sub_field('description'); ?>
            <div class="_12 m-single -staff <?php if ($count == 4) echo '_m8'; else echo '_m4'; ?>">
                <img class="a-image -staff" src="<?= $image; ?>"/>
                <h4 class="a-title -staff"><?= $name; ?></h4>
                <div class="a-text -staff"><?= $description; ?>
                </div>
            </div>
        <?php
        $count++;
        endwhile; ?>
    </div>
<?php
endif; ?>

<div class="section awards">
    <div class="-center">
        <h2 class="_12 ofs_m2 _m8 a-title -inner-content -white"><?= $title?></h2>
        <p class="_12 ofs_m1 _m10 a-text"><?= $subtitle?></p>
        <a href="<?php echo $link['url']; ?>" class="a-link blue"><?php echo $link['title']; ?></a>
    </div>
</div>