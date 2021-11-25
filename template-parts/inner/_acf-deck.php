<section class="section  blue ship">
    <div class="wrapper">
        <div class="wrap ship-nav">
            <?php
            if (have_rows('nav_repeater')) : ?>
                <?php while (have_rows('nav_repeater')) : the_row();
                    $link = get_sub_field('page_link'); ?>
                    <a href="<?php echo $link['url']; ?>" class=""><?php echo $link['title']; ?></a>
                <?php
                endwhile;
            endif; ?>
        </div>
    </div>
</section>
<div id="deck" class="<?php echo is_page( 2357 ) ? "olympia" : "experience" ?>">
    <section class="section inner-content">
        <div class="wrapper">
            <?php the_breadcrumb(); ?>
            <div class="wrap">
                <?php $title = get_sub_field('title'); ?>
                <h2 class="_12 ofs_m1 _m10 a-title -inner-content"><?= $title; ?></h2>
                <div class="_12 _m8">
                    <?php if (have_rows('deck_repeater')) : ?>
                        <?php $ship_count = 1; ?>
                        <?php while (have_rows('deck_repeater')) : the_row();
                            $ship_image = get_sub_field('ship_image'); ?>
                        <div class="-gship">
                            <img class="a-image -staff <?php echo 'ship_image ship_image_'.$ship_count; echo $ship_count !=1 ?  ' fade' : '';?>" src="<?= $ship_image; ?>"/>
                        </div>
                            <?php
                            $ship_count++;
                        endwhile; ?>
                    <?php
                    endif; ?>
                </div>
                <div class="_12 _m4">
                    <h2 class="a-title -deck"><?php _e('Deck Plans 2021-2022', 'ftheme'); ?></h2>
                        <?php $count = 1;?>
                            <?php if (have_rows('deck_repeater')) : ?>
                                <div class="custom-select">
                                    <select id="deck-select">
                                        <?php while (have_rows('deck_repeater')) : the_row();
                                            $title = get_sub_field('title'); ?>
                                            <option value="<?php echo $count;?>"><?php echo $title;?></option>
                                            <?php
                                            $count++;?>
                                        <?php endwhile;?>
                                    </select>
                                </div>
                                <p class="a-text -state"><?php _e('STATEROOMS', 'ftheme'); ?></p>
                                <?php $str_count = 1;
                                $image = null;
                                while (have_rows('deck_repeater')) : the_row();
                                    $c_title = get_sub_field('communal_title');
                                    if (have_rows('stateroom_repeater')) : ?>
                                        <div class="<?php echo 'stateroom_repeater stateroom_repeater_' .$str_count; echo $str_count !=1 ?  ' fade' : ''; ?>">
                                            <?php while (have_rows('stateroom_repeater')) : the_row();
                                                $states = get_sub_field('stateroom');
                                                $state = explode(" ", $states);
                                                ?>
                                                <div class="states">
                                                    <span class="box <?php echo $state[0]; ?>"></span><span class="a-text"><?php echo $states;?></span>
                                                </div>
                                            <?php endwhile;?>
                                            <p class="a-text -state"><?= $c_title; ?></p>
                                            <?php while (have_rows('communal_repeater')) : the_row();
                                                $cr_title = get_sub_field('title'); ?>
                                                <p class="a-text -mb0"><?= $cr_title; ?></p>
                                            <?php endwhile; ?>
                                            <p class="a-text -state"><?php _e('SIDE ELEVATION', 'ftheme'); ?></p>
                                            <?php $image = get_sub_field('elevation_image');?>
                                            <img class="a-image -staff" src="<?= $image; ?>"/>
                                        </div>
                                    <?php endif;
                                    $str_count++;?>
                                <?php endwhile;?>
                            <?php
                    endif; ?>
                    <p class="a-text -state"><?php _e('Symbol Legend', 'ftheme'); ?></p>
					<?php
				 
					if ($title == "Deck Twelve") { ?>
                    <ul class="symbol">
                        <li><span><?php _e('none', 'ftheme'); ?> </span><?php _e('2 Lower Beds', 'ftheme'); ?></li>
                        <li><span><i class="fa fa-circle"></i></span><?php _e('Double Bed', 'ftheme'); ?></li>
                        <li><span><i class="fa fa-square"></i></span><?php _e('2 Lower Beds + 2 Upper Beds', 'ftheme'); ?></li>
                        <li><span><i class="fa fa-star"></i></span><?php _e('Sofa Bed', 'ftheme'); ?></li>
                        <li><span class="-icons"><i class="fa fa-circle"></i><i class="fa fa-star"></i><i class="fa fa-toggle-off"></i></span><?php _e('Double Bed + Sofa + Stateroom with bathtub', 'ftheme'); ?></li>
                        <li><span><i class="fa fa-snowflake"></i></span><?php _e('Suitable for wheelchairs', 'ftheme'); ?></li>
                        <li><span><i class="fa fa-toggle-off"></i></span><?php _e('Staterooms with bathtub', 'ftheme'); ?></li>
                        <li><span><i class="fa fa-snowflake"></i></span><?php _e('Staterooms with obstructed view', 'ftheme'); ?></li>
                    </ul>
					<?php } else { ?>
					<ul class="symbol">
                        <li><span>none <?php _e('none', 'ftheme'); ?></span><?php _e('2 Lower Beds', 'ftheme'); ?></li>
                        
                        <li><span><i style="font-size: 30px;" class="fas fa-caret-up"></i></span><?php _e('2 Lower Beds + 1 Upper Bed', 'ftheme'); ?></li>
                        <li><span><i class="fa fa-square"></i></span><?php _e('2 Lower Beds + 2 Upper Beds', 'ftheme'); ?></li>
						<li><span><i class="fa fa-sort"></i></span><?php _e('2 Lower Beds + Sofa with bunk beds', 'ftheme'); ?></li>
                        <li><span>X</span><?php _e('2 lower beds + sofa with bunk beds+ bathroom with jacuzzi bathtub', 'ftheme'); ?></li>
                        <li><span><i class="fa fa-snowflake"></i></span><?php _e('Suitable for wheelchairs', 'ftheme'); ?></li>
                        <li><span><i class="fa fa-caret-left"></i>&nbsp;<i class="fa fa-caret-right"></i></span><?php _e('Connected staterooms', 'ftheme'); ?></li>                   
                    </ul>				
					 <?php } ?>
					 
					 
                </div>
            </div>
        </div>
    </section>
</div>