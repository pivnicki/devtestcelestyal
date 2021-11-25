<?php
$awards_title = get_sub_field('awards_title'); ?>

<h2 class="_12 a-title -section"><?php echo $awards_title; ?></h2>

<?php if (have_rows('single_award')) : ?>
    <div class="wrap awardsWrap">
    <?php
    $number = 8;
    $count = 0;
    $rows = [];
    while (have_rows('single_award')) : the_row();
        $image = get_sub_field('image');
        $title = get_sub_field('title');
        $year = get_sub_field('year');
        $rows[] = $title;
        $total = count($rows); ?>

        <div class="_12 _s6 _m3 m-awardSingle">
            <img src="<?php echo $image; ?>" class="a-image -award"/>
            <h5 class="a-title -award"><?php echo $title; ?></h5>
        </div>

        <?php
        $count++;
        if ($count == $number) :
            break;
        endif;
    endwhile; ?>
    </div>
    <div class="_12 loadmoreWrap -center">
        <a class="a-link inverse show-more-link" href="javascript: award_show_more();" style="<?php if ($total < $number) echo 'display:none;'; ?>">Load More Awards</a>
    </div>
<?php
endif;
?>

<script type="text/javascript">
    var award_field_post_id = <?php echo $post->ID; ?>;
    var award_field_offset = <?php echo $number; ?>;
    var award_field_nonce = '<?php echo wp_create_nonce('award_field_nonce'); ?>';
    var award_ajax_url = '<?php echo admin_url('admin-ajax.php'); ?>';
    var award_more = true;

    function award_show_more() {

        jQuery.post(
            award_ajax_url, {
                'action': 'award_show_more',
                'post_id': award_field_post_id,
                'offset': award_field_offset,
                'nonce': award_field_nonce
            },
            function (json) {
                jQuery('.awardsWrap').append(json['content']);
                award_field_offset = json['offset'];

                if (!json['more']) {
                    jQuery('.show-more-link').css('display', 'none');
                }
            },
            'json'
        );
    }
</script>