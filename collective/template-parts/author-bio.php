<?php
/**
 * Template part: Author Bio Box
 *
 * @package Collective
 */

$author_id   = get_the_author_meta( 'ID' );
$author_name = get_the_author_meta( 'display_name' );
$author_bio  = get_the_author_meta( 'description' );
$author_url  = get_author_posts_url( $author_id );

// Don't display box if author has no bio set
if ( ! $author_bio ) {
	return;
}

$social = collective_get_author_social( $author_id );
?>

<div class="author-bio">

	<?php echo get_avatar( $author_id, 72, '', esc_attr( $author_name ), array( 'class' => 'author-bio__avatar' ) ); ?>

	<div class="author-bio__content">

		<h3 class="author-bio__name">
			<a href="<?php echo esc_url( $author_url ); ?>">
				<?php echo esc_html( $author_name ); ?>
			</a>
		</h3>

		<p class="author-bio__text"><?php echo wp_kses_post( $author_bio ); ?></p>

		<?php if ( ! empty( $social ) ) : ?>
		<div class="author-bio__social">
			<?php if ( ! empty( $social['twitter'] ) ) : ?>
				<a href="<?php echo esc_url( $social['twitter'] ); ?>"
				   target="_blank" rel="noopener noreferrer">Twitter</a>
			<?php endif; ?>
			<?php if ( ! empty( $social['instagram'] ) ) : ?>
				<a href="<?php echo esc_url( $social['instagram'] ); ?>"
				   target="_blank" rel="noopener noreferrer">Instagram</a>
			<?php endif; ?>
			<?php if ( ! empty( $social['website'] ) ) : ?>
				<a href="<?php echo esc_url( $social['website'] ); ?>"
				   target="_blank" rel="noopener noreferrer">Website</a>
			<?php endif; ?>
		</div>
		<?php endif; ?>

	</div>

</div>
