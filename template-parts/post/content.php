<?php
/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package ftheme
 */

?>
<section class="section">
<div class="wrapper">
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <header class="entry-header">
            <?php the_breadcrumb(); ?>
            <div class="wrap blog">
            <?php
            the_title( '<h4 class="_12 a-title -inner-content">', '</h4>' );

            if( has_post_thumbnail() ):
                the_post_thumbnail('full',array('class' => 'a-image'));
            else:
                echo '<img class="a-image" src="http://placehold.it/600x400" alt="Featured Image">';
            endif;?>
            </div>
            <?php if ( 'post' === get_post_type() ) : ?>
                <div class="entry-meta">
                    <p class="a-text -offers -date"><?php echo get_the_date( 'd M Y' ); ?></p>
                </div>
            <?php
            endif; ?>
        </header>

        <div class="entry-content">
            <?php
            flex_post_content();
            $link = get_field('download',get_the_ID());
            $category = get_the_category(); ?>
            <?php if(get_field('download')):?>
                <a href="<?php echo $link['url']; ?>"  class="a-link inverse"><?php echo $link['title']; ?></a>
            <?php endif; ?>
            <?php if ( ! empty( $category ) ) :
                $firstCategory = $category[0]->slug; ?>
                <div class="left">
                    <i class="fa fa-chevron-left"></i>
                    <a href="<?php echo site_url() .'/category/'. $firstCategory; ?>" class="a-link -back">Back</a>
                </div>
            <?php endif; ?>
        </div>
    </article>
</div>
</section>