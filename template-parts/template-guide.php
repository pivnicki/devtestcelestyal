<?php
/* Template Name: Free Guide  */
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
                        <h2 class="_12 ofs_m1 _m10 a-title -inner-content">GET YOUR FREE CRUISE GUIDE</h2>
                        <div class="_12 ofs_m1 _m10 a-subtitle -inner-content -center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed ultrices orci, eu dignissim nisi. Mauris nec risus auctor, porta enim id, malesuada turpis.</div>
                    </div>
                    <div class="wrap">
                        <div class=" _12 _m6 ofs_m3 m-contact">
                            <form id="brochure" class="form">
                                <div class="input-wrap">
                                    <label>FULL NAME *</label>
                                    <input type="text" name="cel_api_cel_brochure_full_name" class="a-input -newsletter" placeholder="Full Name" required/>
                                </div>
                                <div class="input-wrap">
                                    <label>CONTACT EMAIL *</label>
                                    <input type="email" name="cel_api_cel_brochure_email" class="a-input -newsletter" placeholder="Email" required/>
                                </div>
                                <div class="input-wrap">
                                    <label>COUNTRY *</label>
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
                                    <label>Brochure Type*</label>
                                    <select id="brochure-type">
                                        <option value="" disabled selected>Select Type</option>
                                    </select>
                                </div>
                                <div class="input-wrap">
                                    <span class="-special">WE DON'T WANT YOU TO MISS OUT ON OUR SPECIAL CRUISE OFFERS, PROMOTIONS, NEWS AND GUIDES THAT WE THINK WILL BE OF INTEREST TO YOU. REMEMBER, YOU CAN OPT-OUT AT ANY TIME. *</span>
                                </div>
                                <div class="input-wrap">
                                    <input type="checkbox" name="checkbox" value="I want to receive special offers or promotions from Celestyal Cruises by Email, Text Message, Phone or Post.">
                                    <span class="wpcf7-list-item-label">I want to receive special offers or promotions from Celestyal Cruises by Email, Text Message, Phone or Post.</span>
                                </div>
                                <p class="-terms">
                                    <a href="#">Terms and Conditions</a> | <a href="#">Privacy policy</a>
                                </p>
                                <div class="input-wrap">
                                    <button type="submit" class="a-link blue -newsletter" value="Sign Up">Sign Up</button>
                                </div>
                            </form>
                            <div id="result"></div>
                            <div class="-touch">
                                <h2 class="_12 ofs_m1 _m10 a-title -inner-content"> <?php _e('Thank you for getting in touch!', 'ftheme'); ?></h2>

                                <div class="a-text -center">
                                    <p id="company"> <?php  _e('>We appreciate you contacting us / [Your Name] .','ftheme');?> <br/>
                                    <?php _e(' One of our colleagues will get back in touch with you soon!','theme'); ?></p>
                                    <p><?php _e('Have a great day!','ftheme'); ?></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
<?php
get_footer();