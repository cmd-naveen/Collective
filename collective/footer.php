</div><!-- #page -->

<footer class="site-footer" role="contentinfo">
	<div class="site-footer__inner">

		<!-- Logo -->
		<?php if ( has_custom_logo() ) : ?>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="footer-logo" rel="home">
				<?php the_custom_logo(); ?>
			</a>
		<?php else : ?>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="footer-logo" rel="home">
				<?php bloginfo( 'name' ); ?>
			</a>
		<?php endif; ?>

		<!-- Footer navigation -->
		<?php if ( has_nav_menu( 'footer' ) ) : ?>
			<?php wp_nav_menu( array(
				'theme_location' => 'footer',
				'container'      => 'nav',
				'container_attr' => array( 'aria-label' => __( 'Footer', 'collective' ) ),
				'menu_class'     => 'footer-nav',
				'depth'          => 1,
			) ); ?>
		<?php else : ?>
			<ul class="footer-nav">
				<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'collective' ); ?></a></li>
				<?php
				// Auto-list top-level pages
				$pages = get_pages( array( 'parent' => 0, 'number' => 6 ) );
				foreach ( $pages as $page ) :
				?>
				<li><a href="<?php echo esc_url( get_permalink( $page->ID ) ); ?>"><?php echo esc_html( $page->post_title ); ?></a></li>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>

		<!-- Copyright -->
		<p class="footer-copyright">
			&copy; <?php echo esc_html( date( 'Y' ) ); ?>
			&mdash;
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" style="color: inherit; text-decoration: none;">
				<?php bloginfo( 'name' ); ?>
			</a>.
			<?php
			$footer_text = get_theme_mod( 'collective_footer_text', '' );
			if ( $footer_text ) {
				echo esc_html( ' ' . $footer_text );
			} else {
				esc_html_e( 'All rights reserved.', 'collective' );
			}
			?>
		</p>

	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
