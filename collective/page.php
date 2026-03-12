<?php
/**
 * Template: Page
 *
 * @package Collective
 */

get_header();
?>

<main class="page-content" role="main">
	<?php while ( have_posts() ) : the_post(); ?>
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<h1 class="entry-title"><?php the_title(); ?></h1>
			
			<div class="entry-content">
				<?php
				the_content();

				wp_link_pages( array(
					'before' => '<div class="page-links">' . __( 'Pages:', 'collective' ),
					'after'  => '</div>',
				) );
				?>
			</div>
		</article>

		<?php
		// If comments are open or there are comments
		if ( comments_open() || get_comments_number() ) :
			comments_template();
		endif;
		?>

	<?php endwhile; ?>
</main>

<?php
get_footer();
