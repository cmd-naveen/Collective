<?php
/**
 * Homepage template (front-page.php)
 *
 * @package Collective
 */

get_header();
?>

<div class="site-content">
	<div class="site-container">

		<?php if ( have_posts() ) : ?>

			<div class="page-header">
				<p class="page-header__title"><?php esc_html_e( 'Latest Articles', 'collective' ); ?></p>
			</div>

			<ul class="posts-list">
				<?php while ( have_posts() ) : the_post(); ?>
					<?php get_template_part( 'template-parts/content', 'card' ); ?>
				<?php endwhile; ?>
			</ul>

			<div class="pagination">
				<?php the_posts_pagination( array(
					'mid_size'  => 2,
					'prev_text' => '&larr;',
					'next_text' => '&rarr;',
				) ); ?>
			</div>

		<?php else : ?>

			<p class="no-results-message">
				<?php esc_html_e( 'No posts found.', 'collective' ); ?>
			</p>

		<?php endif; ?>

	</div>
</div>

<?php get_footer(); ?>
