<?php
add_action('wp_ajax_award_show_more', 'award_show_more');
add_action('wp_ajax_nopriv_award_show_more', 'award_show_more');

function award_show_more() {
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'award_field_nonce')) {
        exit;
    }
    if (!isset($_POST['post_id']) || !isset($_POST['offset'])) {
        return;
    }
    $show = 8;
    $start = $_POST['offset'];
    $end = $start + $show;
    $post_id = $_POST['post_id'];

    ob_start();

    if (have_rows('single_award', $post_id)) :
        $count = 0;

        while (have_rows('single_award', $post_id)) : the_row();
            $image = get_sub_field('image');
            $title = get_sub_field('title');
            $rows[] = $title;
            $total = count($rows);

            if ($count < $start) :
                $count++;
                continue;
            endif; ?>

            <div class="_12 _s6 _m3 m-awardSingle">
                <img src="<?php echo $image; ?>" class="a-image -award"/>
                <h5 class="a-title -award"><?php echo $title; ?></h5>
            </div>

            <?php
            $count++;
            if ($count == $end) :
                break;
            endif;
        endwhile;


    endif;

    $content = ob_get_clean();

    $more = false;
    if ($total > $count) {
        $more = true;
    }

    echo json_encode(array('content' => $content, 'more' => $more, 'offset' => $end));

    exit;
}