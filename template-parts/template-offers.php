<?php
/* Template Name: Offers Page */
get_header();
$page_title = get_field('page_title');
$page_subtitle = get_field('page_subtitle');?>

    <div id="content" class="site-content">
        <main id="main" class="" role="main">
            <section class="section">
                <div class="wrapper">
                    <?php the_breadcrumb(); ?>

                    <div class="wrap">
                        <?php if ($page_title) : ?>
                            <h2 class="_12 a-title -inner-content"><?= $page_title; ?></h2>
                        <?php endif; ?>
                        <?php if ($page_subtitle) : ?>
                            <div class="_12 ofs_m1 _m10 a-subtitle -inner-content"><?= $page_subtitle; ?></div>
                        <?php endif; ?>
                    </div>

                    <div class="page-content">
                        <div class="wrap">
                            <div class="_12 -login">
                                <?php
                                $redirect_to = '';
                                ?>
                                <form name="loginform" class="-book" id="loginform" action="<?php echo site_url( '/wp-login.php' ); ?>" method="post">
                                    <label>E-MAIL</label>
                                    <input id="user_login" type="text" size="20" value="" name="log">
                                    <label>PASSWORD</label>
                                    <input id="user_pass" type="password" size="20" value="" name="pwd">
                                    <div class="">
                                        <input id="rememberme" type="checkbox" value="forever" name="rememberme">
                                        <span>Stay Signed In</span>
                                        <a href="#" class="a-link">Forgot password?</a>
                                    </div>
                                    <p><input id="wp-submit" class="submit" type="submit" value="Sign In" name="wp-submit"></p>
                                    <input type="hidden" value="<?php echo esc_attr( $redirect_to ); ?>" name="redirect_to">
                                    <input type="hidden" value="1" name="testcookie">
                                    <div class="-center"><a class="a-text -account">Create an account</a></div>
                                </form>
                            </div>
                            <div class="_12 -manage">
                                <?php if (have_rows('content')) : ?>
                                    <?php while (have_rows('content')) : the_row();
                                        if (get_row_layout() == 'offers_2_columns') :
                                            include(get_template_directory() . '/template-parts/inner/_acf-offer.php');
                                        endif;
                                    endwhile;
                                endif; ?>
                            </div>
                        </div>
                </div>
            </section>
            <?php
            special_offers(); ?>
        </main>
    </div>
<?php
get_footer();
