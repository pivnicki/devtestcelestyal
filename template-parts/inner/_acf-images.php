<div class="m-images">
    <?php
    while (have_rows('items')) : the_row();
        $item = get_sub_field('item'); ?>

        <img src="<?= $item['url']; ?>" alt="<?= $item['title']; ?>">
    <?php
    endwhile; ?>
</div>