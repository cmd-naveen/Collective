<?php
/**
 * Template part: Post Card (homepage / archive / search)
 *
 * @package Collective
 */
?>
<li class="post-card">

	<?php if ( has_post_thumbnail() ) : ?>
		<a class="post-card__image-link" href="<?php the_permalink(); ?>"
		   tabindex="-1" aria-hidden="true">
			<img class="post-card__image"
			     src="<?php the_post_thumbnail_url( 'collective-card' ); ?>"
			     srcset="<?php echo wp_get_attachment_image_srcset( get_post_thumbnail_id(), 'collective-card' ); ?>"
			     sizes="(max-width: 700px) 100vw, 700px"
			     alt="<?php the_title_attribute(); ?>"
			     loading="lazy">
		</a>
	<?php endif; ?>

	<p class="post-card__meta">
		<time datetime="<?php echo get_the_date( 'c' ); ?>">
			<?php echo get_the_date( 'F j, Y' ); ?>
		</time>
	</p>

	<?php
	$categories = get_the_category();
	if ( $categories ) :
	?>
	<p class="post-card__category">
		<?php foreach ( $categories as $i => $cat ) : ?>
			<?php if ( $i > 0 ) echo ' &middot; '; ?>
			<a href="<?php echo esc_url( get_category_link( $cat->term_id ) ); ?>">
				<?php echo esc_html( $cat->name ); ?>
			</a>
		<?php endforeach; ?>
	</p>
	<?php endif; ?>

	<h2 class="post-card__title">
		<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
	</h2>

</li>
