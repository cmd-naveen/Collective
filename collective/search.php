<?php
/**
 * Search results template
 *
 * @package Collective
 */

get_header();
?>

<div class="site-content">
	<div class="site-container">

		<div class="search-header">
			<h1>
				<?php
				printf(
					/* translators: %s = search query */
					esc_html__( 'Search: %s', 'collective' ),
					'<span>' . esc_html( get_search_query() ) . '</span>'
				);
				?>
			</h1>
		</div>

		<!-- Inline search form to refine results -->
		<div class="search-form-wrapper">
			<?php get_search_form(); ?>
		</div>

		<?php if ( have_posts() ) : ?>

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
				<?php esc_html_e( 'No results found. Try a different search term.', 'collective' ); ?>
			</p>

		<?php endif; ?>

	</div>
</div>

<?php get_footer(); ?>
