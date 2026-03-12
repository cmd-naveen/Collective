<?php
/**
 * Search results template
 *
 * @package Collective
 */

get_header();
$show_date = get_theme_mod( 'collective_show_date', false );
?>

<div class="site-content">
	<div class="site-container site-container--narrow">

		<!-- Search Form -->
		<div class="search-page-form">
			<form role="search" method="get" class="search-page-input-wrap" action="<?php echo esc_url( home_url( '/' ) ); ?>">
				<input type="search"
				       class="search-page-input"
				       placeholder="<?php esc_attr_e( 'Search articles...', 'collective' ); ?>"
				       value="<?php echo get_search_query(); ?>"
				       name="s"
				       autofocus>
				<button type="submit" class="search-page-btn">
					<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<circle cx="11" cy="11" r="8"/>
						<line x1="21" y1="21" x2="16.65" y2="16.65"/>
					</svg>
				</button>
			</form>
		</div>

		<?php if ( get_search_query() ) : ?>

			<!-- Results Header -->
			<div class="search-results-header">
				<p class="search-results-count">
					<?php
					global $wp_query;
					printf(
						/* translators: 1: number of results, 2: search query */
						_n(
							'%1$s result for "<strong>%2$s</strong>"',
							'%1$s results for "<strong>%2$s</strong>"',
							$wp_query->found_posts,
							'collective'
						),
						number_format_i18n( $wp_query->found_posts ),
						esc_html( get_search_query() )
					);
					?>
				</p>
			</div>

			<?php if ( have_posts() ) : ?>

				<ul class="search-results-list">
					<?php while ( have_posts() ) : the_post(); ?>
						<li class="search-result-card">
							<a href="<?php the_permalink(); ?>" class="search-result-card__link">
								<?php if ( has_post_thumbnail() ) : ?>
									<div class="search-result-card__image-wrap">
										<img class="search-result-card__image"
										     src="<?php the_post_thumbnail_url( 'medium' ); ?>"
										     alt="<?php the_title_attribute(); ?>"
										     loading="lazy">
									</div>
								<?php endif; ?>
								<div class="search-result-card__content">
									<?php
									$categories = get_the_category();
									if ( $categories ) :
									?>
										<span class="search-result-card__category">
											<?php echo esc_html( $categories[0]->name ); ?>
										</span>
									<?php endif; ?>
									<h3 class="search-result-card__title"><?php the_title(); ?></h3>
									<?php if ( has_excerpt() ) : ?>
										<p class="search-result-card__excerpt"><?php echo get_the_excerpt(); ?></p>
									<?php endif; ?>
									<span class="search-result-card__author">
										<?php printf( esc_html__( 'By %s', 'collective' ), get_the_author() ); ?>
									</span>
								</div>
							</a>
						</li>
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

				<div class="search-no-results">
					<p><?php esc_html_e( 'No articles found matching your search.', 'collective' ); ?></p>
					<p><?php printf(
						/* translators: %s: link to home */
						esc_html__( 'Try different keywords or browse our %s.', 'collective' ),
						'<a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'latest articles', 'collective' ) . '</a>'
					); ?></p>
				</div>

			<?php endif; ?>

		<?php else : ?>

			<!-- No Query - Show Suggestions -->
			<div class="search-suggestions">
				<p class="search-suggestions__label"><?php esc_html_e( 'Popular topics:', 'collective' ); ?></p>
				<div class="search-suggestions__tags">
					<?php
					$popular_categories = get_categories( array(
						'orderby'    => 'count',
						'order'      => 'DESC',
						'number'     => 4,
						'hide_empty' => true,
					) );
					foreach ( $popular_categories as $cat ) :
					?>
						<a href="<?php echo esc_url( add_query_arg( 's', $cat->name, home_url( '/' ) ) ); ?>" class="search-tag">
							<?php echo esc_html( $cat->name ); ?>
						</a>
					<?php endforeach; ?>
				</div>
			</div>

		<?php endif; ?>

	</div>
</div>

<?php get_footer(); ?>
