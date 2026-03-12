<?php
/**
 * Template part: Full single article body
 *
 * @package Collective
 */

// Featured image
if ( has_post_thumbnail() ) :
	$thumbnail_id = get_post_thumbnail_id();
	$caption      = wp_get_attachment_caption( $thumbnail_id );
?>
	<img class="article-featured-image"
	     src="<?php the_post_thumbnail_url( 'full' ); ?>"
	     srcset="<?php echo wp_get_attachment_image_srcset( $thumbnail_id, 'full' ); ?>"
	     sizes="(max-width: 700px) 100vw, 700px"
	     alt="<?php the_title_attribute(); ?>"
	     loading="lazy">
	<?php if ( $caption ) : ?>
		<p class="article-photo-credit"><?php echo esc_html( $caption ); ?></p>
	<?php endif; ?>
<?php endif; ?>

<!-- Category links -->
<?php
$categories = get_the_category();
if ( $categories ) :
?>
<div class="article-categories">
	<?php foreach ( $categories as $i => $cat ) : ?>
		<?php if ( $i > 0 ) : ?><span class="cat-sep">/</span><?php endif; ?>
		<a href="<?php echo esc_url( get_category_link( $cat->term_id ) ); ?>">
			<?php echo esc_html( $cat->name ); ?>
		</a>
	<?php endforeach; ?>
</div>
<?php endif; ?>

<!-- H1 Title -->
<h1 class="article-title"><?php the_title(); ?></h1>

<!-- Author + Date -->
<div class="article-meta">
	<?php echo get_avatar( get_the_author_meta( 'ID' ), 40, '', '', array( 'class' => 'author-avatar' ) ); ?>
	<a class="author-name"
	   href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>">
		<?php the_author(); ?>
	</a>
	<span class="meta-sep" aria-hidden="true">&middot;</span>
	<time datetime="<?php echo get_the_date( 'c' ); ?>">
		<?php echo esc_html( collective_time_ago() ); ?>
	</time>
</div>

<!-- Article body -->
<div class="article-body">
	<?php the_content(); ?>
</div>

<!-- Related posts (text-only, same category) -->
<?php get_template_part( 'template-parts/related', 'posts' ); ?>

<!-- Author bio -->
<?php get_template_part( 'template-parts/author', 'bio' ); ?>

<!-- Sentinel: IntersectionObserver watches this to trigger next article load -->
<div class="infinite-scroll-article-end"
     data-post-id="<?php the_ID(); ?>"
     style="height:1px;" aria-hidden="true"></div>
