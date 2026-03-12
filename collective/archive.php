<?php
/**
 * Archive template (categories, tags, authors, dates)
 *
 * @package Collective
 */

get_header();
?>

<div class="site-content">
	<div class="site-container">

		<!-- Archive Header -->
		<header class="archive-header">
			<?php if ( is_category() ) : ?>
				<p class="archive-label"><?php esc_html_e( 'Category', 'collective' ); ?></p>
				<h1 class="archive-title"><?php single_cat_title(); ?></h1>
				<?php if ( category_description() ) : ?>
					<p style="font-family:var(--font-sans);font-size:15px;color:var(--color-meta);margin:12px 0 0;line-height:1.6;">
						<?php echo wp_kses_post( category_description() ); ?>
					</p>
				<?php endif; ?>

			<?php elseif ( is_tag() ) : ?>
				<p class="archive-label"><?php esc_html_e( 'Tag', 'collective' ); ?></p>
				<h1 class="archive-title"><?php single_tag_title(); ?></h1>

			<?php elseif ( is_author() ) : ?>
				<p class="archive-label"><?php esc_html_e( 'Author', 'collective' ); ?></p>
				<h1 class="archive-title"><?php the_author(); ?></h1>
				<?php if ( get_the_author_meta( 'description' ) ) : ?>
					<p style="font-family:var(--font-sans);font-size:15px;color:var(--color-meta);margin:12px 0 0;line-height:1.6;">
						<?php echo wp_kses_post( get_the_author_meta( 'description' ) ); ?>
					</p>
				<?php endif; ?>

			<?php elseif ( is_year() ) : ?>
				<p class="archive-label"><?php esc_html_e( 'Archive', 'collective' ); ?></p>
				<h1 class="archive-title"><?php echo esc_html( get_the_date( 'Y' ) ); ?></h1>

			<?php elseif ( is_month() ) : ?>
				<p class="archive-label"><?php esc_html_e( 'Archive', 'collective' ); ?></p>
				<h1 class="archive-title"><?php echo esc_html( get_the_date( 'F Y' ) ); ?></h1>

			<?php else : ?>
				<h1 class="archive-title"><?php the_archive_title(); ?></h1>
			<?php endif; ?>
		</header>

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
				<?php esc_html_e( 'No posts found.', 'collective' ); ?>
			</p>

		<?php endif; ?>

	</div>
</div>

<?php get_footer(); ?>
