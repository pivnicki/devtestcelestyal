<?php
$title = get_sub_field('title'); ?>

<div class="m-list">
    <h6><?= $title; ?></h6>
    <?php while (have_rows('items')) : the_row();
        $column_1 = get_sub_field('column_1');
        $column_2 = get_sub_field('column_2'); ?>

        <div>
            <p><?= $column_1; ?></p>
            <p><?= $column_2; ?></p>
        </div>

    <?php endwhile; ?>
</div>
