<?php
/* Template Name: Contact  */
global $globalSite;
get_header();
$page_title = get_field('page_title');
$page_subtitle = get_field('page_subtitle');
$form = get_field('form');
$guide = get_field('guide'); ?>

    <div id="content" class="site-content">
        <?php
        headerPage(); ?>
        <main id="main" class="page-main site-main" role="main">
            <section class="section inner-content">
                <div class="wrapper">
                    <?php the_breadcrumb(); ?>
                    <div class="-help">
                        <?php if ($page_title) : ?>
                            <h2 class="_12 ofs_m1 _m10 a-title -inner-content"><?= $page_title; ?></h2>
                        <?php endif; ?>
                        <?php if ($page_subtitle) : ?>
                            <div class="_12 ofs_m1 _m10 a-subtitle -inner-content"><?= $page_subtitle; ?></div>
                        <?php endif; ?>
                    </div>
                    <div class="wrap">
                        <div class="_12 _m6 ofs_m3 m-contact">
                            <?php
                            if (is_page('Contact')):
                                if ($form):
                                    echo do_shortcode($form);
                                else:
                                    echo do_shortcode('[contact-form-7 id="10393" title="Contact Form 1"]');
                                endif;
                            endif;
                            if (is_page('Get Your Free Cruise Guide') || is_page('Obtenir votre guide de croisiere gratuit') || is_page( 'ERHALTEN SIE IHRE GRATIS BROSCHÜRE' )
                                || is_page('Αποκτήστε τον δωρεάν οδηγό κρουαζιέρας σας') || is_page('Obtenha seu guia de cruzeiro grátis') || is_page('Obtenga su guía de crucero gratis')): ?>
                                <!-- // if ($guide):
                                //     echo do_shortcode($guide); 
                                // endif; -->
                                <section>
                <div class="wrapper">
                    <div class="wrap">
                        <form id="brochure" class="_12 form">
                        <label for=""><?php _e('FULL NAME*','ftheme'); ?></label>
                            <div class="input-wrap">
                                <input type="text" name="cel_api_cel_brochure_full_name" class="a-input -newsletter" required/>
                            </div>
                            <label for=""><?php _e('CONTACT EMAIL*','ftheme'); ?></label>
                            <div class="input-wrap">
                                <input type="email" name="cel_api_cel_brochure_email" class="a-input -newsletter" required/>
                            </div>
                            <label for=""><?php _e('COUNTRY*','ftheme'); ?></label>
                            <div class="input-wrap">
                                <select id="country" name="cel_api_cel_brochure_country_code">
                                    <option value="" disabled selected><?php _e('Select Country','ftheme');?></option>
                                    <option value=".com - Int" title="Country"><?php _e('International/Rest of World','ftheme');?></option>
                                    <option value="AUS" title="Country"><?php _e('AUS','ftheme');?></option>
                                    <option value="France" title="Country"><?php _e('France','ftheme');?></option>
                                    <option value="Germany" title="Country"><?php _e('Germany','ftheme');?></option>
                                    <option value="Greece" title="Country"><?php _e('Greece','ftheme');?></option>
                                    <option value="Latin" title="Country"><?php _e('Latin America','ftheme');?></option>
                                    <option value="pt-br" title="Country"><?php _e('Brazil','ftheme');?></option>
                                    <option value="Spain" title="Country"><?php _e('Spain','ftheme');?></option>
                                    <option value="UK" title="Country"><?php _e('UK','ftheme');?></option>
                                    <option value="USA" title="Country"><?php _e('USA','ftheme');?></option>
                                </select>
                            </div>
                            <div class="input-wrap">
                            <span class="-special"><?php _e("WE DON'T WANT YOU TO MISS OUT ON OUR SPECIAL CRUISE OFFERS, PROMOTIONS, NEWS AND GUIDES THAT WE THINK WILL BE OF INTEREST TO YOU. REMEMBER, YOU CAN OPT-OUT AT ANY TIME. *",'ftheme');?></span>
                            </div>
                            <div class="input-wrap">
                                <input type="checkbox"><span class="offer"><?php _e('I want to receive special offers or promotions from Celestyal Cruises by Email, Text Message, Phone or Post.','ftheme');?></span>
                            </div>
                            <p class="-terms">
                                <a href="/terms-of-use/"><?php _e('Terms and Conditions');?></a> | <a href="/privacy-policy/"><?php _e('Privacy policy','ftheme');?></a>
                            </p>
                            <div class="input-wrap">
                                <button type="submit" class="a-link blue -newsletter" value="Sign Up"><?php _e('Send','ftheme');?></button>
                            </div>
                        </form>
                        <!-- <div id="result"></div> -->
                    </div>
                </div>
            </section>
                            <?php endif;

                            if( is_page('travel-agents-registration') ) {
                                if( $form ) {
                                    echo do_shortcode( $form );
                                } else {
                                    echo do_shortcode('[contact-form-7 id="14269" title="Travel Agents Registration"]');
                                }
                            }

                            if(!$guide):
                            ?>
                                <!-- <section>
                                   <div class="wrapper">
                                   <div class="wrap">
                                       <form id="brochure" class="_12 form">
                                       <label for=""><?php// _e('FULL NAME*','theme'); ?></label>
                                           <div class="input-wrap">
                                               <input type="text" name="cel_api_cel_brochure_full_name" class="a-input -newsletter" required/>
                                           </div>
                                           <label for=""><?php// _e('CONTACT EMAIL*','theme'); ?></label>
                                           <div class="input-wrap">
                                               <input type="email" name="cel_api_cel_brochure_email" class="a-input -newsletter" required/>
                                           </div>
                                           <label for=""><?php// _e('COUNTRY*','theme'); ?></label>
                                           <div class="input-wrap">
                                               <select id="country" name="cel_api_cel_brochure_country_code">
                                                   <option value="" disabled selected>Select Country</option>
                                                   <option value=".com - Int" title="Country">International/Rest of World</option>
                                                   <option value="AUS" title="Country">AUS</option>
                                                   <option value="France" title="Country">France</option>
                                                   <option value="Germany" title="Country">Germany</option>
                                                   <option value="Greece" title="Country">Greece</option>
                                                   <option value="Latin" title="Country">Latin America</option>
                                                   <option value="pt-br" title="Country">Brazil</option>
                                                   <option value="Spain" title="Country">Spain</option>
                                                   <option value="UK" title="Country">UK</option>
                                                   <option value="USA" title="Country">USA</option>
                                               </select>
                                           </div>
                                           <div class="input-wrap">
                                           <span class="-special">WE DON'T WANT YOU TO MISS OUT ON OUR SPECIAL CRUISE OFFERS, PROMOTIONS, NEWS AND GUIDES THAT WE THINK WILL BE OF INTEREST TO YOU. REMEMBER, YOU CAN OPT-OUT AT ANY TIME. *</span>
                                           </div>
                                           <div class="input-wrap">
                                               <input type="checkbox"><span class="offer"> I want to receive special offers or promotions from Celestyal Cruises by Email, Text Message, Phone or Post.</span>
                                           </div>
                                           <p class="-terms">
                                               <a href="/terms-of-use/">Terms and Conditions</a> | <a href="/privacy-policy/">Privacy policy</a>
                                           </p>
                                           <div class="input-wrap">
                                               <button type="submit" class="a-link blue -newsletter" value="Sign Up">Send</button>
                                           </div>
                                       </form>
                                       <div id="result"></div>
                                   </div>
                                    </div>
                                </section> -->
                            <?php endif;
                                if (is_page('Retrieve Agency Logins')):
                                    echo do_shortcode('[contact-form-7 id="7556" title="Agency"]');
                                endif;
                                if (is_page('recuperer-les-identifiants-dagence')):
                                    echo do_shortcode($guide);
                                endif;
                                if (is_page('Ταξιδιωτικό Πρακτορείο Ανάκτηση Σύνδεσης')):
                                    echo do_shortcode($guide);
                                endif; 
                                if (is_page('Recuperar inicios de sesión de agencia')):
                                    echo do_shortcode($guide);
                                endif;
                                if (is_page('Agentur-Logins abrufen')):
                                    echo do_shortcode($guide);
                                endif;
                            ?>
                            <div class="-touch">
                                <h2 class="_12 ofs_m1 _m10 a-title -inner-content"> <?php _e('Thank you for getting in touch!', 'ftheme'); ?></h2>

                                <div class="a-text -center">
                                    <p id="company"> <?php  _e('We appreciate you contacting us / [Your Name] .','ftheme');?> <br/>
                                    <?php _e(' One of our colleagues will get back in touch with you soon!','theme'); ?></p>
                                    <p><?php _e('Have a great day!','ftheme'); ?></p>
                                </div>
                            </div>
                            <div class="form-g">
                                <h2 class="_12 ofs_m1 _m10 a-title -inner-content"> <?php _e('THANK YOU. YOUR REQUESTED BROCHURE HAS BEEN SENT TO YOUR EMAIL ACCOUNT
', 'ftheme'); ?></h2>
                            </div>
                        </div>
                    </div>
                    <?php if(is_page('Contact')): ?>
                    <div class="page-content">
                        <div class="wrap">
                            <?php include(get_template_directory() . '/template-parts/inner/_acf-contact.php'); ?>
                        </div>
                    </div>
                    <?php  endif; ?>
                </div>
            </section>
            <?php
            if (get_field('show_destinations')) :
                get_template_part('template-parts/layout/our', 'destinations');
            endif;
            if (get_field('show_all_inclusive')):
                get_template_part('template-parts/layout/all', 'inclusive-text');
            endif;
            if (get_field('show_top_cruises')):
                get_template_part('template-parts/layout/top', 'cruise');
            endif;
            special_offers(); ?>
        </main>
    </div>
<?php
get_footer();