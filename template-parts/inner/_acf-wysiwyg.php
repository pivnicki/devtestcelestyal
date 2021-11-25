<?php
$connect = get_sub_field('connect');
$connect_text = get_sub_field('connect_text'); ?>

<div class="m-wysiwyg<?= $connect ? ' -connect' : ''; ?><?= $connect_text ? ' -connect-text' : ''; ?>">
    <?php the_sub_field('content'); ?>
</div>