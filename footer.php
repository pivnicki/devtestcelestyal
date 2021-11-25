<?php
/**
 * @package ftheme
 */
global $globalSite;
$first_title = get_field('first_title', '``');
$second_title = get_field('second_title', 'option');
$third_title = get_field('third_title', 'option');
$fourth_title = get_field('fourth_title', 'option');
$fifth_title = get_field('fifth_title', 'option');
$copy = get_field('copyright_text', 'option');
$phone = get_field('phone_number', 'option');
$logo = get_field('abta_logo', 'option');
$logo2 = get_field('abta_logo2', 'option');
$n_shortcode = get_field('n_shortcode', 'option');
?>
<footer id="colophon" class="site-footer" role="contentinfo">
    <div class="wrapper">
        <div class="wrap">
            <div class="_12 _s6 m-footer-list js-accordion">
                <h3 class="a-title -footer"><?php if ($first_title) echo $first_title; else _e('Browse', 'ftheme'); ?><i class="fa fa-chevron-down js-accTrigg"></i></h3>
                <?php if (have_rows('browse_repeater', 'option')) :?>
                    <ul class="list-wrap js-accList">
                        <?php while (have_rows('browse_repeater', 'option')) : the_row();
                            $browse_item = get_sub_field('browse_item', 'option');
                            $browse_item_title = $browse_item['title'];
                            $browse_item_url = $browse_item['url']; ?>

                            <li class="a-listItem"><a href="<?php echo $browse_item_url; ?>"><?php echo $browse_item_title; ?></a></li>
                        <?php endwhile; ?>
                    </ul>
                <?php endif; ?>
            </div>
            <div class="_12 _s6 m-footer-list js-accordion">
                <h3 class="a-title -footer"><?php if ($second_title) echo $second_title; else _e('Destinations', 'celestyal'); ?><i class="fa fa-chevron-down js-accTrigg"></i></h3>
                <?php if (have_rows('cruise_repeater', 'option')) :?>
                    <ul class="list-wrap js-accList">
                        <?php while (have_rows('cruise_repeater', 'option')) : the_row();
                            $cruise_item = get_sub_field('cruise_item', 'option');
                            $cruise_item_title = $cruise_item['title'];
                            $cruise_item_url = $cruise_item['url']; ?>

                            <li class="a-listItem"><a href="<?php echo $cruise_item_url; ?>"><?php echo $cruise_item_title; ?></a></li>
                        <?php endwhile; ?>
                    </ul>
                <?php endif; ?>
            </div>
            <div class="_12 _s6 m-footer-list js-accordion">
                <h3 class="a-title -footer"><?php if ($third_title) echo $third_title; else _e('About Celestyal', 'celestyal'); ?><i class="fa fa-chevron-down js-accTrigg"></i></h3>
                <?php if (have_rows('about_repeater', 'option')) :?>
                    <ul class="list-wrap js-accList">
                        <?php while (have_rows('about_repeater', 'option')) : the_row();
                            $about_item = get_sub_field('about_item', 'option');
                            $about_item_title = $about_item['title'];
                            $about_item_url = $about_item['url']; ?>

                                <li class="a-listItem"><a href="<?php echo $about_item_url; ?>"><?php echo $about_item_title; ?></a></li>
                        <?php endwhile; ?>
                    </ul>
                <?php endif; ?>
            </div>
            <div class="_12 _s6 m-footer-list js-accordion">
                <h3 class="a-title -footer"><?php if ($fourth_title) echo $fourth_title; else _e('Travel Agents', 'celestyal'); ?><i class="fa fa-chevron-down js-accTrigg"></i></h3>
                <?php if (have_rows('travel_agents_repeater', 'option')) :?>
                    <ul class="list-wrap js-accList">
                        <?php while (have_rows('travel_agents_repeater', 'option')) : the_row();
                            $travel_agents_item = get_sub_field('travel_agents_item', 'option');
                            $travel_agents_item_title = $travel_agents_item['title'];
                            $travel_agents_item_url = $travel_agents_item['url']; ?>

                            <li class="a-listItem"><a href="<?php echo $travel_agents_item_url; ?>"><?php echo $travel_agents_item_title; ?></a></li>
                        <?php endwhile; ?>
                    </ul>
                <?php endif; ?>
            </div>
            <div class="_12 _s6 m-footer-list">
                <h3 class="a-title -footer"><?php if ($fifth_title) echo $fifth_title; else _e('Subscribe to our newsletter', 'celestyal'); ?></h3>
                <div class="m-newsletter -footer">
                    <?php// if ($n_shortcode) echo do_shortcode($n_shortcode); ?>
                    <a href="https://celestyal.radar.ms/newsletter-signup.svy" class="a-link blue"><?php _e('Subscribe','ftheme'); ?></a>
                </div>
            </div>
        </div>
        <div class="wrap">
            <div class="_12 _s6">
                <div class="copy">
                    <?php if ($copy) echo $copy; else echo 'Celestyal Cruises © 2020 - <a href="/conditions-of-carriage/" target="_blank">Terms & Conditions</a>'; ?>
                </div>
            </div>
            <div class="_12 _s6">
                <div class="tel">
                    <a href="tel:<?php if ($phone) echo $phone; else echo '216 400 9999'; ?>"><?php _e('Call ', 'ftheme'); if ($phone) echo $phone; else echo '216 400 9999'; ?></a>
                </div>
            </div>
        </div>
    </div>

    <div class="bottom">
        <div class="wrapper">
            <div class="wrap">
                <div class="_12 _s6 bottom-logo">
                    <img src="<?php if($logo) echo $logo; else echo $globalSite['theme_url'] . '/bundles/images/abta-logo.png'?>">
                    <img src="<?php if($logo2) echo $logo2; else echo $globalSite['theme_url'] . '/bundles/images/abta-logo.png'?>">
                </div>
                <div class="_12 _s6 footer-social">
                    <div class="icons"><span><?php _e('Follow us on: ', 'ftheme' ); ?></span><?php ftheme_social_network(); ?></div>
                </div>
            </div>
        </div>
    </div>

     
</footer>
</div>
<?php wp_footer(); ?>
</body>
</html>
