<?php
global $globalSite;
$all_inclusive_title = get_field('all_inclusive_title', 'option');
$bottom_button_inc = get_field('bottom_button_inc', 'option'); ?>
<section class="section all-inclusive">
    <div class="wrapper">
        <?php if ($all_inclusive_title) : ?>
            <div class="wrap">
                <h1 class="_12 a-title -section"><?php echo $all_inclusive_title; ?></h1>
            </div>
        <?php
        endif; ?>
            <div class="wrap m-cards">
                <a href="#" class="a-link -card -text _12 _m8">
                    <div class="m-card inclusive -text"
                         style="background-image: url(<?php echo $globalSite['theme_url'] . '/bundles/images/celestyal-olympia.jpg'; ?>)">
                    </div>
                    <h3 class="a-title -card inclusive -text">Celestyal Olympia</h3>
                    <div class="a-text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis libero eget nisi sagittis semper. Integer tincidunt pharetra ex iaculis vehicula. Curabitur eu orci volutpat, tempus enim sit amet, luctus velit. Quisque ut urna elit. Duis eget faucibus augue.</p>
                        <p>Praesent hendrerit purus quis luctus fermentum. Ut ultrices imperdiet eros sed malesuada. Ut tempor iaculis pharetra.</p>
                    </div>
                </a>
                <a href="#" class="a-link -card -text _12 _m4">
                    <div class="m-card inclusive -text"
                         style="background-image: url(<?php echo $globalSite['theme_url'] . '/bundles/images/drink-packages.jpg'; ?>)">
                    </div>
                    <h3 class="a-title -card inclusive -text">Drinks Package</h3>
                    <div class="a-text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis libero eget nisi sagittis semper. Integer tincidunt pharetra ex iaculis vehicula. Curabitur eu orci volutpat, tempus enim sit amet, luctus velit.</p>
                    </div>
                </a>
                <a href="#" class="a-link -card -text _12 _m4">
                    <div class="m-card inclusive -text"
                         style="background-image: url(<?php echo $globalSite['theme_url'] . '/bundles/images/drink-packages.jpg'; ?>)">
                    </div>
                    <h3 class="a-title -card inclusive -text">Culinary Delights</h3>
                    <div class="a-text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis libero eget nisi sagittis semper. Integer tincidunt pharetra ex iaculis vehicula. Curabitur eu orci volutpat, tempus enim sit amet, luctus velit.</p>
                    </div>
                </a>
                <a href="#" class="a-link -card -text _12 _m8">
                    <div class="m-card inclusive -text"
                         style="background-image: url(<?php echo $globalSite['theme_url'] . '/bundles/images/celestyal-olympia.jpg'; ?>)">
                        </div>
                    <h3 class="a-title -card inclusive -text">Port, Service Charges & Gratuities Included</h3>
                    <div class="a-text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis libero eget nisi sagittis semper. Integer tincidunt pharetra ex iaculis vehicula. Curabitur eu orci volutpat, tempus enim sit amet, luctus velit. Quisque ut urna elit. Duis eget faucibus augue.</p>
                        <p>Praesent hendrerit purus quis luctus fermentum. Ut ultrices imperdiet eros sed malesuada. Ut tempor iaculis pharetra.</p>
                    </div>
                </a>
            </div>
        <?php
        if ($bottom_button_inc) : ?>
        <div class="wrap">
            <div class="_12 f-center">
                <a class="a-link inverse -center" href="<?php echo $bottom_button_inc['url']; ?>"><?php echo $bottom_button_inc['title']; ?></a>
            </div>
        </div>
        <?php
        endif; ?>
    </div>
</section>