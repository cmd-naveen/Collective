<?php
/**
 * Custom search form
 *
 * @package Collective
 */
?>
<form role="search" method="get" class="search-form"
      action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<input type="search"
	       class="search-field"
	       placeholder="<?php esc_attr_e( 'Search articles…', 'collective' ); ?>"
	       value="<?php echo esc_attr( get_search_query() ); ?>"
	       name="s"
	       autocomplete="off" />
	<button type="submit" class="search-submit"
	        aria-label="<?php esc_attr_e( 'Search', 'collective' ); ?>">
		<svg width="20" height="20" fill="none" stroke="currentColor"
		     stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
			<circle cx="11" cy="11" r="8"></circle>
			<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
		</svg>
	</button>
</form>
