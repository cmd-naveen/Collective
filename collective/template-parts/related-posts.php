<?php
/**
 * Template part: Related Posts — text links only, same category, max 4
 *
 * @package Collective
 */

$post_id    = get_the_ID();
$categories = wp_get_post_categories( $post_id );

if ( empty( $categories ) ) {
	return;
}

$related = new WP_Query( array(
	'category__in'        => $categories,
	'post__not_in'        => array( $post_id ),
	'posts_per_page'      => 4,
	'orderby'             => 'date',
	'order'               => 'DESC',
	'no_found_rows'       => true,
	'ignore_sticky_posts' => true,
) );

if ( ! $related->have_posts() ) {
	return;
}
?>

<div class="related-posts">
	<p class="related-posts__label"><?php esc_html_e( 'Related Articles', 'collective' ); ?></p>
	<ul class="related-posts__list">
		<?php while ( $related->have_posts() ) : $related->the_post(); ?>
			<li>
				<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
			</li>
		<?php endwhile; wp_reset_postdata(); ?>
	</ul>
</div>
