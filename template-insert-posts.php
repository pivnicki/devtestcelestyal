<?php

acf_form_head();
get_header();
/**
* Template Name: Form Page Template
*
* @package WordPress
* @subpackage Twenty_Fourteen
* @since Twenty Fourteen 1.0
*/
 
if( 'POST' == $_SERVER['REQUEST_METHOD'] && !empty( $_POST['action'] ) &&  $_POST['action'] == "new_post") {

    // Do some minor form validation to make sure there is content
    if (isset ($_POST['title'])) {
        $title =  $_POST['title'];
    } else {
        echo 'Please enter a  title';
    }
    if (isset ($_POST['description'])) {
        $description = $_POST['description'];
    } else {
        echo 'Please enter the content';
    }
    $custom_field_1 = $_POST['tourist_name'];
    $tags = $_POST['post_tags'];

    // Add the content of the form to $post as an array
    $new_post = array(
        'post_title'    => $title,
        'post_content'  => $description,
        'post_category' => array($_POST['cat']),  // Usable for custom taxonomies too
        'tags_input'    => array($tags),
        'post_status'   => 'publish',           // Choose: publish, preview, future, draft, etc.
        'post_type' => 'traveler'  //'post',page' or use a custom post type if you want to
    );
    //save the new post
    $pid = wp_insert_post($new_post); 
    //insert taxonomies
    add_post_meta($pid, 'tourist_name', $custom_field_1, true);
}

?>
<main id="site-content" role="main">
  <div class="page type-page status-publish hentry">
    <div class="post-inner thin">
      <div class="entry-content"> 
        <!-- New Post Form -->
<div id="postbox">
<form id="new_post" name="new_post" method="post" action="">

<!-- post name -->
<p><label for="title">Title</label><br />
<input type="text" id="title" value="" tabindex="1" size="20" name="title" />
</p>

<p><label for="title">Tourist Name</label><br />
<input type="text" id="tourist_name" value="" tabindex="1" size="20" name="tourist_name" />
</p>

<!-- post Category -->
<p><label for="Category">Category:</label><br />
<p><?php wp_dropdown_categories( 'show_option_none=Category&tab_index=4&taxonomy=category' ); ?></p>


<!-- post Content -->
<p><label for="description">Content</label><br />
<textarea id="description" tabindex="3" name="description" cols="50" rows="6"></textarea>
</p>

<!-- post tags -->
<p><label for="post_tags">Tags:</label>
<input type="text" value="" tabindex="5" size="16" name="post_tags" id="post_tags" /></p>
<p align="right"><input type="submit" value="Publish" tabindex="6" id="submit" name="submit" /></p>

<input type="hidden" name="action" value="new_post" />
<?php wp_nonce_field( 'new-post' ); ?>
</form>
</div>

      </div>
    </div>
  </div>
</main> 
<?php
acf_enqueue_uploader();
get_footer(); 