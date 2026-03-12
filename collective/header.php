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

<header class="site-header" role="banner">
	<div class="site-header__inner">

		<!-- Logo — supports both image and text -->
		<?php if ( has_custom_logo() ) : ?>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo" rel="home">
				<?php
				$custom_logo_id = get_theme_mod( 'custom_logo' );
				$logo = wp_get_attachment_image_src( $custom_logo_id, 'full' );
				if ( $logo ) :
				?>
					<img class="site-logo__image" src="<?php echo esc_url( $logo[0] ); ?>" alt="<?php bloginfo( 'name' ); ?>">
				<?php endif; ?>
			</a>
		<?php else : ?>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo" rel="home">
				<span class="site-logo__text"><?php bloginfo( 'name' ); ?></span>
			</a>
		<?php endif; ?>

		<!-- Right side: search + veggie burger -->
		<div class="header-right">

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

			<!-- Veggie Burger -->
			<button class="veggie-burger-btn" id="menu-toggle"
				aria-label="<?php esc_attr_e( 'Open menu', 'collective' ); ?>"
				aria-expanded="false"
				aria-controls="fullscreen-menu">
				<span></span>
				<span></span>
				<span></span>
			</button>

		</div>
	</div>
</header>

<!-- Leaderboard Ad Banner -->
<?php if ( is_active_sidebar( 'leaderboard-ad' ) || get_theme_mod( 'collective_show_ad_placeholder', true ) ) : ?>
<div class="leaderboard-ad">
	<div class="leaderboard-ad__inner">
		<span class="leaderboard-ad__label"><?php esc_html_e( 'Advertisement', 'collective' ); ?></span>
		<?php if ( is_active_sidebar( 'leaderboard-ad' ) ) : ?>
			<?php dynamic_sidebar( 'leaderboard-ad' ); ?>
		<?php else : ?>
			<div class="leaderboard-ad__placeholder">
				728 &times; 90 Leaderboard Ad
			</div>
		<?php endif; ?>
	</div>
</div>
<?php endif; ?>

<!-- Full-Screen Dark Menu Overlay -->
<div class="fullscreen-menu" id="fullscreen-menu" role="dialog"
     aria-modal="true"
     aria-label="<?php esc_attr_e( 'Site Navigation', 'collective' ); ?>">

	<!-- Top bar: X | LOGO -->
	<div class="fullscreen-menu__header">
		<button class="fullscreen-menu__close" id="menu-close"
			aria-label="<?php esc_attr_e( 'Close menu', 'collective' ); ?>">&#x2715;</button>
		<span class="fullscreen-menu__logo"><?php bloginfo( 'name' ); ?></span>
	</div>

	<!-- Body: 3 columns -->
	<div class="fullscreen-menu__body">

		<!-- Left column: Explore (uses WordPress Menu) + Legal -->
		<div class="fmenu-left">
			<p class="fmenu-section-label"><?php esc_html_e( 'Explore', 'collective' ); ?> &#8595;</p>
			
			<?php if ( has_nav_menu( 'explore' ) ) : ?>
				<div class="fmenu-explore-menu">
					<?php
					wp_nav_menu( array(
						'theme_location' => 'explore',
						'container'      => false,
						'items_wrap'     => '%3$s',
						'depth'          => 1,
						'walker'         => new Collective_Simple_Walker(),
					) );
					?>
				</div>
			<?php else : ?>
				<!-- Default links if no menu is set -->
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Latest', 'collective' ); ?></a>
				<a href="<?php echo esc_url( home_url( '/author/' ) ); ?>"><?php esc_html_e( 'Writers', 'collective' ); ?></a>
			<?php endif; ?>

			<p class="fmenu-section-label" style="margin-top: 28px;"><?php esc_html_e( 'Legal', 'collective' ); ?></p>
			<?php if ( has_nav_menu( 'footer' ) ) : ?>
				<?php
				wp_nav_menu( array(
					'theme_location' => 'footer',
					'container'      => false,
					'items_wrap'     => '%3$s',
					'depth'          => 1,
					'walker'         => new Collective_Simple_Walker(),
				) );
				?>
			<?php else : ?>
				<a href="<?php echo esc_url( home_url( '/about/' ) ); ?>"><?php esc_html_e( 'About Us', 'collective' ); ?></a>
				<a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>"><?php esc_html_e( 'Privacy Policy', 'collective' ); ?></a>
				<a href="<?php echo esc_url( home_url( '/terms/' ) ); ?>"><?php esc_html_e( 'Terms of Use', 'collective' ); ?></a>
			<?php endif; ?>
		</div>

		<!-- Center: large category links (uses WordPress Primary Menu) -->
		<div class="fmenu-center">
			<?php if ( has_nav_menu( 'primary' ) ) : ?>
				<?php
				wp_nav_menu( array(
					'theme_location' => 'primary',
					'container'      => false,
					'items_wrap'     => '%3$s',
					'depth'          => 1,
					'link_before'    => '',
					'link_after'     => '',
					'walker'         => new Collective_Category_Walker(),
				) );
				?>
			<?php else : ?>
				<!-- Fallback: show categories if no menu is set -->
				<?php
				$categories = get_categories( array(
					'orderby'    => 'count',
					'order'      => 'DESC',
					'number'     => 5,
					'hide_empty' => true,
				) );
				foreach ( $categories as $cat ) :
				?>
					<a href="<?php echo esc_url( get_category_link( $cat->term_id ) ); ?>" class="fmenu-category-link">
						<?php echo esc_html( $cat->name ); ?>
					</a>
				<?php endforeach; ?>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="fmenu-category-link">
					<?php esc_html_e( 'Home', 'collective' ); ?>
				</a>
			<?php endif; ?>
		</div>

		<!-- Right: social counts -->
		<div class="fmenu-right">
			<?php
			$instagram_count = get_theme_mod( 'collective_instagram_count', '45k' );
			$twitter_count   = get_theme_mod( 'collective_twitter_count', '28k' );
			$facebook_count  = get_theme_mod( 'collective_facebook_count', '12k' );
			?>
			<!-- Instagram -->
			<div class="fmenu-social-item">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
					<circle cx="12" cy="12" r="4"></circle>
					<circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"></circle>
				</svg>
				<span class="fmenu-social-count"><?php echo esc_html( $instagram_count ); ?></span>
			</div>
			<!-- Twitter/X -->
			<div class="fmenu-social-item">
				<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
					<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
				</svg>
				<span class="fmenu-social-count"><?php echo esc_html( $twitter_count ); ?></span>
			</div>
			<!-- Facebook -->
			<div class="fmenu-social-item">
				<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
					<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
				</svg>
				<span class="fmenu-social-count"><?php echo esc_html( $facebook_count ); ?></span>
			</div>
		</div>
	</div>
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
