<?php
/**
 * Single post template — with infinite scroll
 *
 * @package Collective
 */

get_header();
?>

<div id="infinite-scroll-container">

	<?php if ( have_posts() ) : the_post(); ?>

	<article id="post-<?php the_ID(); ?>"
	         <?php post_class( 'site-container site-content' ); ?>>
		<?php get_template_part( 'template-parts/content', 'single' ); ?>
	</article>

	<?php endif; ?>

	<!-- Sentinel: triggers loading of next article -->
	<div id="infinite-scroll-sentinel" aria-hidden="true" style="height:1px;margin:0;"></div>

	<!-- Loading indicator -->
	<div id="scroll-loader" role="status" aria-live="polite">
		<span class="scroll-loader__spinner" aria-hidden="true"></span>
		<?php esc_html_e( 'Loading next article…', 'collective' ); ?>
	</div>

	<!-- End of feed message -->
	<div id="scroll-end">
		<?php esc_html_e( "You've reached the end.", 'collective' ); ?>
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>">
			<?php esc_html_e( 'Go back home &rarr;', 'collective' ); ?>
		</a>
	</div>

</div><!-- #infinite-scroll-container -->

<?php get_footer(); ?>
