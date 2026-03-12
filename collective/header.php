<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<?php
// Above-header strip
$strip_text = get_theme_mod( 'collective_header_strip', '' );
if ( $strip_text ) :
?>
<div class="header-strip">
	<?php echo esc_html( $strip_text ); ?>
</div>
<?php endif; ?>

<header class="site-header" role="banner">
	<div class="site-header__inner">

		<!-- Logo -->
		<?php if ( has_custom_logo() ) : ?>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo" rel="home">
				<?php the_custom_logo(); ?>
			</a>
		<?php else : ?>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo__text" rel="home">
				<?php bloginfo( 'name' ); ?>
			</a>
		<?php endif; ?>

		<!-- Right side: nav + search + hamburger -->
		<div class="header-right">

			<!-- Primary navigation (desktop) -->
			<div class="primary-nav-wrapper">
				<?php if ( has_nav_menu( 'primary' ) ) : ?>
					<?php wp_nav_menu( array(
						'theme_location' => 'primary',
						'container'      => 'nav',
						'container_attr' => array( 'aria-label' => __( 'Primary', 'collective' ) ),
						'menu_class'     => 'primary-nav',
						'depth'          => 1,
					) ); ?>
				<?php else : ?>
					<nav aria-label="<?php esc_attr_e( 'Primary', 'collective' ); ?>">
						<ul class="primary-nav">
							<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'collective' ); ?></a></li>
							<li><a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>"><?php esc_html_e( 'Latest', 'collective' ); ?></a></li>
						</ul>
					</nav>
				<?php endif; ?>
			</div>

			<!-- Search icon -->
			<button class="header-search-btn" id="search-toggle"
			        aria-label="<?php esc_attr_e( 'Open search', 'collective' ); ?>"
			        aria-expanded="false">
				<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"
				     viewBox="0 0 24 24" aria-hidden="true">
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
			</button>

			<!-- Hamburger (mobile) -->
			<button class="hamburger-btn" id="menu-toggle"
			        aria-label="<?php esc_attr_e( 'Open menu', 'collective' ); ?>"
			        aria-expanded="false"
			        aria-controls="mobile-nav">
				<span></span>
				<span></span>
				<span></span>
			</button>

		</div>
	</div>
</header>

<!-- Mobile Nav Overlay -->
<div class="mobile-nav-overlay" id="mobile-nav" role="dialog"
     aria-modal="true"
     aria-label="<?php esc_attr_e( 'Navigation', 'collective' ); ?>">

	<button class="mobile-nav-close" id="mobile-nav-close"
	        aria-label="<?php esc_attr_e( 'Close menu', 'collective' ); ?>">&times;</button>

	<?php if ( has_nav_menu( 'primary' ) ) : ?>
		<?php wp_nav_menu( array(
			'theme_location' => 'primary',
			'container'      => false,
			'menu_class'     => 'mobile-nav-list',
			'depth'          => 1,
		) ); ?>
	<?php else : ?>
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'collective' ); ?></a>
		<a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>"><?php esc_html_e( 'Latest', 'collective' ); ?></a>
	<?php endif; ?>
</div>

<!-- Search Overlay -->
<div class="search-overlay" id="search-overlay" role="dialog"
     aria-modal="true"
     aria-label="<?php esc_attr_e( 'Search', 'collective' ); ?>">
	<div class="search-overlay__inner">
		<?php get_search_form(); ?>
	</div>
	<button class="search-overlay__close" id="search-close"
	        aria-label="<?php esc_attr_e( 'Close search', 'collective' ); ?>">&times;</button>
</div>

<div id="page">
