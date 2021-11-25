<?php
/* Template Name: Landing Summer */
global $globalSite;
get_header();


?>
    <div id="content" class="site-content">
        <?php
       // headerLandingPage(); ?>
        <main id="main" class="page-main site-main summer-landing-page" role="main">
            <section class="title-subsection">
                <?php 
                    $subheaderImage = get_field('sub-header_image');
                    $subheaderTitle = get_field('sub-header_title');
                    $subheaderText = get_field('sub-header_text');
                ?>
                <div class="wrapper">
                    <div class="wrap">
                        <div class="_12 _m6 _l5 ofs_l1 -center-content">
                            <img src="<?php echo $subheaderImage; ?>" alt="">
                        </div>
                        <div class="_12 _m6 _l5 title-subsection__content">
                            <h3 class="title-subsection__subtitle"><?php echo $subheaderTitle; ?></h3>
                            <p class="title-subsection__welcome-text"><?php echo $subheaderText; ?></p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="choose-adventure">
                <?php
                    $sectionTitle = get_field('section_title');
                ?>
                <div class="wrapper">
                    <div class="wrap">
                        <div class="_12 -section-title">
                            <h2><?php echo $sectionTitle; ?></h2>
                        </div>
                    </div>
                    <div class="wrap choose-adventure__blocks">
                        <?php if(have_rows('adventure_block')): 
                                while(have_rows('adventure_block')): the_row();
                                    $featured_image = get_sub_field('featured_image');
                                    $adventure_title = get_sub_field('adventure_title');
                                    $adventure_subtitle = get_sub_field('adventure_subtitle');
                                    $adventure_text = get_sub_field('adventure_text');
                                    $button_text = get_sub_field('button_text');
                                    $discover_link = get_sub_field('discover_link');
                                    $destination_name = get_sub_field('destination_name');
                        ?>
                        <div class="_12 _m6 _l3">
                            <div class="choose-adventure__destination">
                                <img src="<?php echo $featured_image; ?>" alt="" class="-destination-image">
                                <div class="choose-adventure__destination -content">
                                    <h3 class="destination-title"><?php echo $adventure_title; ?></h3>
                                    <p class="destination-subtitle"><?php echo $adventure_subtitle; ?></p>
                                    <div class="things-to-do">
                                        <?php echo $adventure_text; ?>
                                    </div>
                                    <button class="choose-button" data-destination="<?php echo $destination_name; ?>"><img src="<?php echo get_stylesheet_directory_uri(); ?>/src/images/checkmark.svg" alt=""><?php echo $adventure_title; ?></button>
                                    <?php if($discover_link): 
                                        $link_url = $discover_link['url'];
                                        $link_title = $discover_link['title'];
                                        $link_target = $discover_link['target'] ? $discover_link['target'] : '_self';    
                                    ?>
                                    <a href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>" class="discover" ><?php echo esc_html( $link_title ); ?></a>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                        <?php endwhile;
                            endif; ?>
                    </div>
                </div>
                <div class="wrapper">
                    <?php 
                        $stepSectionTitle = get_field('steps_section_title');
                        $stepSectionText = get_field('steps_block_text');
                    ?>
                    <div class="wrap">
                        <div class="_12 -section-title">
                            <h2><?php echo $stepSectionTitle; ?></h2>
                        </div>
                    </div>
                    <div class="wrap steps-section">
                        <?php if(have_rows('steps')):
                                while(have_rows('steps')): the_row();
                                    $stepImage = get_sub_field('step_image');
                                    $stepText = get_sub_field('step_text');
                        ?>
                        <div class="_12 _m4 _l3 steps-section__step">
                            <img src="<?php echo $stepImage; ?>" alt="">
                            <p><?php echo $stepText; ?></p>
                        </div>
                        
                        <?php 
                                endwhile;
                            endif;
                        ?>
                        <div class="_12 -disclaimer">
                            <?php echo $stepSectionText; ?>
                        </div>
                    </div>
                </div>
            </section>
            <div class="divider"></div>
            <section class="form-section">
            <?php 
                $aboveSelect = get_field('above_select_text');
                $belowSelect = get_field('below_select_text');
                $checkboxLabel = get_field('checkbox_label');
                $submitButton = get_field('submit_button_text');
            ?>
                <div class="wrapper">
                    <div class="wrap">
                        <div class="_12 _m6 ofs_m3">
                            <form action="" class="choose-form" id="choose-form">
                                <span class="subtitle"><?php echo $aboveSelect; ?></span>
                                <select name="destination" id="choose-day">
                                    <option value="<?php _e('Choose a different day', 'ftheme'); ?>" selected disabled></option>
                                    <option value="Athens"><?php _e('Athens', 'ftheme'); ?></option>
                                    <option value="Patmos"><?php _e('Patmos', 'ftheme'); ?></option>
                                    <option value="Rhodes"><?php _e('Rhodes', 'ftheme'); ?></option>
                                    <option value="Santorini"><?php _e('Santorini', 'ftheme'); ?></option>
                                    <option value="Mykonos"><?php _e('Mykonos', 'ftheme'); ?></option>
                                    <option value="Milos"><?php _e('Milos', 'ftheme'); ?></option>
                                    <option value="Crete"><?php _e('Crete', 'ftheme'); ?></option>
                                </select>
                                <span class="subtitle subtitle-bottom"><?php echo $belowSelect; ?></span>
                                <div class="form-block">
                                    <input type="text" name="firstname" id="first-name" placeholder="<?php _e('First name', 'ftheme'); ?>" required>
                                    <input type="text" name="lastname" id="last-name" placeholder="<?php _e('Last name', 'ftheme'); ?>" required>
                                </div>
                                <div class="form-block">
                                    <input type="email" name="email" id="email" placeholder="<?php _e('Email', 'ftheme'); ?>" required>
                                </div>
                                <div class="form-block checkbox-row">
                                    <input type="checkbox" name="enter" id="accept">
                                    <label for="accept"><?php echo $checkboxLabel; ?></label>
                                </div>
                                <button type="submit" value="SAVE MY FREE DAY" class="form-submit"><?php echo $submitButton; ?></button>
                            </form>
                            <?php 
                                $searchCruises = get_field('search_cruises_link');
                                if($searchCruises):
                                    $searchCruisesUrl = $searchCruises['url'];
                                    $searchCruisesTitle = $searchCruises['title'];
                                    $searchCruisesTarget = $searchCruises['target'] ? $searchCruises['target'] : '_self';
                            ?>
                            <a href="<?php echo esc_url( $searchCruisesUrl ); ?>" target="<?php echo esc_attr( $searchCruisesTarget ); ?>" class="cruise-search"><?php echo esc_html( $searchCruisesTitle ); ?></a>

                            <?php endif;
                                $resultTitle = get_field('result_title');
                                $resultSubtitle = get_field('result_subtitle');
                                $resultText = get_field('result_text');
                            ?>
                            <div id="result">
                                <h2 class="section-title"><?php echo $resultTitle; ?></h2>
                                <p class="subtitle"><?php echo $resultSubtitle; ?></p>
                                <p><?php echo $resultText; ?></p>
                                <?php 
                                    $searchDates = get_field('search_dates_button_link');
                                    if( $searchDates ): 
                                        $searchDatesUrl = $searchDates['url'];
                                        $searchDatesTitle = $searchDates['title'];
                                        $searchDatesTarget = $searchDates['target'] ? $searchDates['target'] : '_self';
                                ?>
                                <a class="search-dates" href="<?php echo esc_url( $searchDatesUrl ); ?>" target="<?php echo esc_attr( $searchDatesTarget ); ?>"><?php echo esc_html( $searchDatesTitle ); ?></a>
                                <?php 
                                    endif;
                                ?>

                                <?php
                                    $exploreCruise = get_field('explore_cruise_button_link');
                                    if( $exploreCruise ): 
                                        $exploreCruiseUrl = $exploreCruise['url'];
                                        $exploreCruiseTitle = $exploreCruise['title'];
                                        $exploreCruiseTarget = $exploreCruise['target'] ? $exploreCruise['target'] : '_self';
                                ?>
                                <a class="explore-cruise" href="<?php echo esc_url( $exploreCruiseUrl ); ?>" target="<?php echo esc_attr( $exploreCruiseTarget ); ?>"><?php echo esc_html( $exploreCruiseTitle ); ?></a>

                                <?php 
                                    endif;
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="new-horizon">
                <?php 
                    $horizonSectionTitle = get_field('new_horizon_section_title');
                    $aboveAmount = get_field('above_amount_text');
                    $amount = get_field('amount');
                    $subAmount = get_field('sub_amount_text');
                
                ?>
                <div class="wrapper">
                    <div class="wrap">
                        <div class="_12 -section-title">
                            <h2><?php echo $horizonSectionTitle; ?></h2>
                        </div>
                        <div class="_12 -section-title">
                            <span class="subtitle"><?php echo $aboveAmount; ?></span>
                            <h2 class="-large"><?php echo $amount; ?></h2>
                            <span class="subtitle"><?php echo $subAmount; ?></span>
                        </div>
                    </div>
                </div>
            </section>
            <section class="explore-aegean">
                <?php 
                    $cruiseSectionTitle = get_field('idyllic_cruise_section_title');
                    $cruiseAboveTitle = get_field('idyllic_cruise_section_above_title');
                    $cruiseBelowTitle = get_field('idyllic_cruise_section_below_title');
                    $mapImage = get_field('destinations_map');
                    $setSail = get_field('set_sail_button');
                ?>
                <div class="wrapper">
                    <div class="wrap">
                        <div class="_12 -section-title">
                            <span class="subtitle"><?php echo $cruiseAboveTitle ?></span>
                            <h2><?php echo $cruiseSectionTitle ?></h2>
                            <span class="subtitle"><?php echo $cruiseBelowTitle ?></span>
                        </div>
                    </div>
                    <div class="wrap locations">
                        <div class="_12 _m8 ofs_m2">
                            <div class="wrap">
                                <div class="_12 _m6">
                                    <ul>
                                    <?php 
                                        if(have_rows('destinations')):
                                            while(have_rows('destinations')): the_row();
                                            $destination = get_sub_field('destination');
                                    ?>
                                        <li><?php echo $destination; ?></li>
                                    <?php   endwhile;
                                        endif;
                                    ?>
                                    </ul>
                                </div>
                                <div class="_12 _m6">
                                    <img src="<?php echo $mapImage; ?>" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="wrap">
                        <div class="_12" style="text-align:center;">
                            <?php 
                                if($setSail):
                                    $setSail_url = $setSail['url'];
                                    $setSail_title = $setSail['title'];
                                    $setSail_target = $setSail['target'] ? $setSail['target'] : '_self';
                            ?>
                            <a class="set-sail-button" href="<?php echo esc_url( $setSail_url ); ?>" target="<?php echo esc_attr( $setSail_target ); ?>"><?php echo esc_html( $setSail_title ); ?></a>
                            <?php 
                                endif;
                            ?>
                        </div>
                    </div>
                </div>
            </section>
            <section class="whats-included">
                <?php 
                    $wiSectionTitle = get_field('wi_section_title');
                ?>
                <div class="wrapper">
                    <div class="wrap">
                        <div class="_12 -section-title">
                            <h2><?php echo $wiSectionTitle; ?></h2>
                        </div>
                    </div>
                    <div class="wrap">
                        <div class="_12 _m8 ofs_m2">
                            <div class="wrap icons">
                                <?php 
                                    if(have_rows('included_items')):
                                        while(have_rows('included_items')): the_row();
                                            $itemImage = get_sub_field('item_image');
                                            $itemText = get_sub_field('image_text');
                                ?>
                                <div class="_12 _m4 icon">
                                    <img src="<?php echo $itemImage; ?>" alt="">
                                    <div class="inc-item"><?php echo $itemText; ?></div>
                                </div>
                                <?php   endwhile;
                                    endif;
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <?php 
            special_offers();
            ?>
        </main>
    </div>
    <script>
        $(document).ready(function() {
            var chooseBtn = $('.choose-button');
            var destSelect = $('#choose-day');
            var selectStyled = $('.select-styled');
            var scrollOffset = $('.choose-form').offset().top;

            chooseBtn.click(function() {
                var dataAttr = $(this).data('destination');
                destSelect.val(dataAttr).trigger('change');
                console.log(destSelect.val());
                selectStyled.text(dataAttr);
                $('html, body').animate({
                    scrollTop: scrollOffset
                }, 1000);
            });
        })
    </script>

<?php
get_footer();

