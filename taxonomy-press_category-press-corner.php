<?php
get_header();
?>

<div id="content" class="site-content">
    <div class="wrapper ">
        <section class="section">
        <?php
            $queried_object = get_queried_object();
            $current_cat = $queried_object->name;
            the_breadcrumb();?>
            <h2 class="a-title -section"><?php echo $current_cat; ?></h2>
        </section>
    </div>
	 <div class="wrapper">
	<div class="wrap">
                    <p class="_l12 _m6 -center   -inner-content">
						Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum

					</p>
                </div>
		 </div>
        <main id="main" class="page-main site-main" role="main"> 
           <section class="promise">
            <div class="wrapper">
                <div class="wrap">
                    <h2 class="_12 a-title -inner-content -white">
						Celestyal Cruise Press Corner
					</h2>
                </div>
				
                <div class="wrap">                        
                <div class="_12 _m6">
                        
                        <h4 class="a-title -center">Company Information</h4>
                        <div class="a-text -offers -white -center">Useful information about the company </div>
					<div class="_12 -center">
                        <a href="https://dev-celestyal-staging.pantheonsite.io/media/company-information/" class="a-link -card -orange">Read More</a>
                    </div>
                    </div>

                 <div class="_12 _m6">
                        
                        <h4 class="a-title -center">Press Releases</h4>
                        <div class="a-text -offers -white -center">See all the latest press releases for your region </div>
					 <div class="_12 -center">
                        <a href="https://dev-celestyal-staging.pantheonsite.io/media/press-releases/" class="a-link -card -orange">Read More</a>
                    </div>
                    </div>
                  </div>
			   </div>
				<!--new section -->
		</section>		
			   <section class="promise">
				 <div class="wrapper">  
                <div class="wrap">    
                 <div class="_12 _m6">
                        
                        <h4 class="a-title -center">Gallery</h4>
                        <div class="a-text -offers -white -center">See all the latest images </div>
					 <div class="_12 -center">
                        <a href="https://dev-celestyal-staging.pantheonsite.io/media/press-gallery/" class="a-link -card -orange">Read More</a>
                    </div>
                    </div>
					
					  <div class="_12 _m6"> 
					   <h4 class="a-title -center">Articles</h4>  
                        <div class="a-text -offers -white -center">See the latest articles</div>
					<div class="_12 -center">
                        <a href="https://dev-celestyal-staging.pantheonsite.io/media/article-releases/" class="a-link -card -orange">Read More</a>
                    </div>
                    </div>
                      </div>
					 </div> 
	</section>

      <section class="section inner-content ice-blue" >
		  <div class="wrapper">
                <div class="wrap">
		     <div class="_12 _m6"> 
                        <p class="a-text -follow -center">How to Contact Us </p> 
					 
                       <p class=" -center">
						   Contact email press.office@celestyal.com 
						</p>  
              </div>
		  <div class="_12 _m6"> 
			  <p class="a-text -follow -center">Follow Us</p>
                        <ul class="social" style="justify-content: space-evenly;padding: 0 5rem 0 10rem;">
                            <?php
                            while( have_rows('socials', 'options') ): the_row();
                                $social = get_sub_field('social');
                                $face = get_sub_field('face');
                                $twit = get_sub_field('twit');
                                $you = get_sub_field('you');
                                $insta = get_sub_field('insta');
                                $pint = get_sub_field('pint');?>

                                <?php
                                if ($social == 'Facebook'): ?>
                                    <li>
                                        <a href="<?php echo $face; ?>" target="_blank">
                                            <img src="<?php echo $globalSite['theme_url'] . '/bundles/images/facebook.png'; ?>" alt="">
                                        </a>
                                    </li>
                                <?php
                                endif;
                                if ($social == 'Twitter'): ?>
                                    <li>
                                        <a href="<?php echo $twit; ?>" target="_blank">
                                            <img src="<?php echo $globalSite['theme_url'] . '/bundles/images/twitter.png'; ?>" alt="">
                                        </a>
                                    </li>
                                <?php
                                endif;
                                if ($social == 'Youtube'): ?>
                                    <li>
                                        <a href="<?php echo $you; ?>" target="_blank">
                                            <img src="<?php echo $globalSite['theme_url'] . '/bundles/images/youtube.png'; ?>" alt="">
                                        </a>
                                    </li>
                                <?php
                                endif;
                                if ($social == 'Instagram'): ?>
                                    <li>
                                        <a href="<?php echo $insta; ?>" target="_blank">
                                            <img src="<?php echo $globalSite['theme_url'] . '/bundles/images/instagram.png'; ?>" alt="">
                                        </a>
                                    </li>
                                <?php
                                endif;
							if ($social == 'Linkedin'): ?>
                                    <li>
                                        <a href="<?php echo $insta; ?>" target="_blank">
                                            <img  src="<?php echo $globalSite['theme_url'] . '/bundles/images/linkedin.png'; ?>" alt="">
                                        </a>
                                    </li>
                                <?php
                                endif;
                                if ($social == 'Pinterest'): ?>
                                    <li>
                                        <a href="<?php echo $pint; ?>" target="_blank">
                                            <img src="<?php echo $globalSite['theme_url'] . '/bundles/images/pinterest.png'; ?>" alt="">
                                        </a>
                                    </li>
                                <?php
                                endif;
                            endwhile; ?>
                        </ul>
                    
                </div>
              </div>
					  </div>
             
	  </section>

        </main>
    </div>
<?php
get_footer();