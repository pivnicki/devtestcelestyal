<?php

function special_offers($display = true)
{
    if (!$display) return;

    $brochure_image = get_field('brochure_image', 'option');
    $brochure_title = get_field('brochure_title', 'option');
    $brochure_paragraph = get_field('brochure_paragraph', 'option');
    $brochure_link = get_field('brochure_link', 'option');
    $special_offers_title = get_field('special_offers_title', 'option'); ?>

    <section class="m-special-offers">
        <div class="wrapper">
            <div class="wrap">
                <div class="_12 _l6">
                    <div class="m-special-offers__brochure">
                        <img src="<?= $brochure_image['url']; ?>" alt="<?= $brochure_image['title']; ?>">
                        <div>
                            <h4><?= $brochure_title ?></h4>
                            <p><?= $brochure_paragraph ?></p>
                            <a href="<?php if($brochure_link): echo $brochure_link['url']; else: echo '#'; endif; ?>" class="a-link download"><?php if($brochure_link): echo $brochure_link['title']; else: echo 'Download'; endif; ?></a>
                        </div>
                    </div>
                </div>
                <div class="_12  _l6">
                    <div class="m-special-offers__form">
                        <h4><?= $special_offers_title ?></h4>
                        <!-- <php  do_shortcode('[contact-form-7 id="311" title="Special Offers"]'); ?> -->
                        <a href="https://celestyal.radar.ms/newsletter-signup.svy" class="a-link blue sign"><?php _e('Sign Up','ftheme'); ?></a>
                        <?php
//                        <div class="custom">
//                            <form id="brochure" class="form">
//                                <input type="text" name="cel_api_cel_brochure_full_name" class="a-input -offers" placeholder="Name" required/>
//                                <input type="email" name="cel_api_cel_brochure_email" class="a-input -offers" placeholder="Email" required/>
//                                <button type="submit" class="a-link blue submit -offers">Sign Up</button>
//                            </form>
//                            <div id="result"></div>
//                        </div>
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </section>

<?php
}
