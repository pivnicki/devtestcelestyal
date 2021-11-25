<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package ftheme
 */

get_header();
global $globalSite;?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<section class="section forofor">
				<div class="page-content">
                    <div class="wrapper">
                        <div class="wrap">
                            <div class="_12">
                                <h2 class="_12 a-title -section"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'ftheme' ); ?></h2>
                                <p class="_12 a-text -center"><?php esc_html_e( 'It looks like nothing was found at this location.', 'ftheme' ); ?></p>
                                <div class="_12 f-center">
                                <a class="a-link inverse -center" href="/">Go Back To Home</a>
                                </div>
                            </div>
                        </div>
                    </div>

				</div><!-- .page-content -->
			</section><!-- .error-404 -->

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
