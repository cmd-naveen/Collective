<?php
/**
 * Template part: Related Articles — 6 items in a 3-column grid with images
 *
 * @package Collective
 */

$post_id    = get_the_ID();
$categories = wp_get_post_categories( $post_id );

if ( empty( $categories ) ) {
	return;
}

// Get related posts from same category, then fill from other categories if needed
$related = new WP_Query( array(
	'category__in'        => $categories,
	'post__not_in'        => array( $post_id ),
	'posts_per_page'      => 6,
	'orderby'             => 'date',
	'order'               => 'DESC',
	'no_found_rows'       => true,
	'ignore_sticky_posts' => true,
) );

// If we don't have 6 posts, fill from other categories
if ( $related->post_count < 6 ) {
	$exclude_ids = array( $post_id );
	foreach ( $related->posts as $rp ) {
		$exclude_ids[] = $rp->ID;
	}
	
	$fill_count = 6 - $related->post_count;
	$fill_posts = new WP_Query( array(
		'post__not_in'        => $exclude_ids,
		'posts_per_page'      => $fill_count,
		'orderby'             => 'date',
		'order'               => 'DESC',
		'no_found_rows'       => true,
		'ignore_sticky_posts' => true,
	) );
	
	// Merge the posts
	$related->posts = array_merge( $related->posts, $fill_posts->posts );
	$related->post_count = count( $related->posts );
}

if ( $related->post_count === 0 ) {
	return;
}
?>

<div class="related-articles">
	<h3 class="related-articles__title"><?php esc_html_e( 'Related Articles', 'collective' ); ?></h3>
	<div class="related-articles__grid">
		<?php foreach ( $related->posts as $rpost ) : setup_postdata( $rpost ); ?>
			<a href="<?php echo esc_url( get_permalink( $rpost->ID ) ); ?>" class="related-card">
				<?php if ( has_post_thumbnail( $rpost->ID ) ) : ?>
					<div class="related-card__image-wrap">
						<img src="<?php echo esc_url( get_the_post_thumbnail_url( $rpost->ID, 'medium' ) ); ?>" 
						     alt="<?php echo esc_attr( get_the_title( $rpost->ID ) ); ?>" 
						     class="related-card__image" 
						     loading="lazy">
					</div>
				<?php endif; ?>
				<?php
				$rpost_cats = get_the_category( $rpost->ID );
				if ( $rpost_cats ) :
				?>
					<p class="related-card__category"><?php echo esc_html( $rpost_cats[0]->name ); ?></p>
				<?php endif; ?>
				<h4 class="related-card__title"><?php echo esc_html( get_the_title( $rpost->ID ) ); ?></h4>
			</a>
		<?php endforeach; wp_reset_postdata(); ?>
	</div>
</div>
