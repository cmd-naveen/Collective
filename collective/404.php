<?php
/**
 * 404 Not Found template
 *
 * @package Collective
 */

get_header();
?>

<div class="site-content">
	<div class="site-container">
		<div class="not-found-page">
			<p class="error-code" aria-hidden="true">404</p>
			<h2><?php esc_html_e( 'Page Not Found', 'collective' ); ?></h2>
			<p><?php esc_html_e( "The page you're looking for doesn't exist or has been moved.", 'collective' ); ?></p>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-home">
				<?php esc_html_e( 'Go Back Home', 'collective' ); ?>
			</a>
		</div>
	</div>
</div>

<?php get_footer(); ?>
