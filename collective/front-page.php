<?php
/**
 * Template: Front Page (Homepage)
 * 
 * Hero post + 2-column grid layout
 *
 * @package Collective
 */

get_header();

// Get the show date setting
$show_date = get_theme_mod( 'collective_show_date', false );
?>

<div class="site-content" role="main">
	<div class="site-container">

		<?php if ( have_posts() ) : ?>

			<?php
			// First post = Hero
			if ( have_posts() ) : the_post();
			?>
				<div class="hero-post">
					<a href="<?php the_permalink(); ?>" class="hero-post__link">
						<div class="hero-post__image-wrap">
							<?php if ( has_post_thumbnail() ) : ?>
								<img class="hero-post__image"
								     src="<?php the_post_thumbnail_url( 'large' ); ?>"
								     alt="<?php the_title_attribute(); ?>"
								     loading="eager">
							<?php endif; ?>
							<div class="hero-post__overlay">
								<?php
								$categories = get_the_category();
								if ( $categories ) :
								?>
									<span class="hero-post__category"><?php echo esc_html( $categories[0]->name ); ?></span>
								<?php endif; ?>
								<h2 class="hero-post__title"><?php the_title(); ?></h2>
								<?php if ( has_excerpt() ) : ?>
									<p class="hero-post__excerpt"><?php echo get_the_excerpt(); ?></p>
								<?php endif; ?>
							</div>
						</div>
					</a>
				</div>
			<?php endif; ?>

			<!-- Remaining posts in grid -->
			<ul class="posts-grid">
				<?php while ( have_posts() ) : the_post(); ?>
					<li class="post-card-grid">

						<?php if ( has_post_thumbnail() ) : ?>
							<a href="<?php the_permalink(); ?>" class="post-card-grid__image-link">
								<img class="post-card-grid__image"
								     src="<?php the_post_thumbnail_url( 'collective-card' ); ?>"
								     alt="<?php the_title_attribute(); ?>"
								     loading="lazy">
							</a>
						<?php endif; ?>

						<div class="post-card-grid__meta">
							<?php
							$categories = get_the_category();
							if ( $categories ) :
							?>
								<span class="post-card-grid__categories">
									<?php foreach ( $categories as $i => $cat ) : ?>
										<?php if ( $i > 0 ) : ?><span class="cat-sep">,</span><?php endif; ?>
										<a href="<?php echo esc_url( get_category_link( $cat->term_id ) ); ?>">
											<?php echo esc_html( $cat->name ); ?>
										</a>
									<?php endforeach; ?>
								</span>
							<?php endif; ?>
							<?php if ( $show_date ) : ?>
								<span class="post-card-grid__date"><?php echo get_the_date( 'F j, Y' ); ?></span>
							<?php endif; ?>
						</div>

						<h2 class="post-card-grid__title">
							<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
						</h2>

					</li>
				<?php endwhile; ?>
			</ul>

			<div class="section-more-link">
				<p><?php printf(
					/* translators: %s: link to blog page */
					esc_html__( 'For more recently published writing, visit our %s.', 'collective' ),
					'<a href="' . esc_url( get_permalink( get_option( 'page_for_posts' ) ) ) . '">' . esc_html__( 'latest page', 'collective' ) . '</a>'
				); ?></p>
			</div>

			<?php
			// Pagination
			the_posts_pagination( array(
				'mid_size'  => 2,
				'prev_text' => __( '&larr; Previous', 'collective' ),
				'next_text' => __( 'Next &rarr;', 'collective' ),
			) );
			?>

		<?php else : ?>
			<p><?php esc_html_e( 'No posts found.', 'collective' ); ?></p>
		<?php endif; ?>

	</div>
</div>

<?php
get_footer();
