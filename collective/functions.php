<?php
/**
 * Collective Theme Functions
 *
 * @package Collective
 * @version 1.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
        exit;
}

/* ==========================================================================
   Theme Setup
   ========================================================================== */

function collective_theme_setup() {
        // Allow WordPress to manage the document title
        add_theme_support( 'title-tag' );

        // RSS feed links
        add_theme_support( 'automatic-feed-links' );

        // Featured images
        add_theme_support( 'post-thumbnails' );
        add_image_size( 'collective-card', 700, 394, true );    // 16:9 card
        add_image_size( 'collective-full', 1400, 840, true );   // 5:3 ratio for articles
        add_image_size( 'collective-related', 400, 240, true ); // 5:3 for related articles

        // HTML5
        add_theme_support( 'html5', array(
                'search-form',
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
                'style',
                'script',
        ) );

        // Responsive embeds
        add_theme_support( 'responsive-embeds' );

        // Custom logo — larger size for enhanced header
        add_theme_support( 'custom-logo', array(
                'height'      => 72,
                'width'       => 240,
                'flex-height' => true,
                'flex-width'  => true,
        ) );

        // Post formats
        add_theme_support( 'post-formats', array( 'quote', 'link', 'video', 'image' ) );

        // Register nav menus
        register_nav_menus( array(
                'primary' => __( 'Primary Navigation (Large Menu Links)', 'collective' ),
                'explore' => __( 'Explore Menu (Left Column Links)', 'collective' ),
                'footer'  => __( 'Footer Navigation', 'collective' ),
        ) );
}
add_action( 'after_setup_theme', 'collective_theme_setup' );

/* ==========================================================================
   Widget Areas
   ========================================================================== */

function collective_widgets_init() {
        // Leaderboard Ad Widget Area
        register_sidebar( array(
                'name'          => __( 'Leaderboard Ad', 'collective' ),
                'id'            => 'leaderboard-ad',
                'description'   => __( 'Add your 728x90 leaderboard ad here. Appears below the header on all pages.', 'collective' ),
                'before_widget' => '<div class="leaderboard-widget">',
                'after_widget'  => '</div>',
                'before_title'  => '<span class="screen-reader-text">',
                'after_title'   => '</span>',
        ) );
}
add_action( 'widgets_init', 'collective_widgets_init' );

/* ==========================================================================
   Content Width
   ========================================================================== */

function collective_content_width() {
        $GLOBALS['content_width'] = 700;
}
add_action( 'after_setup_theme', 'collective_content_width', 0 );

/* ==========================================================================
   Preconnect for Google Fonts (performance)
   ========================================================================== */

function collective_preconnect_fonts() {
        echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
        echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
}
add_action( 'wp_head', 'collective_preconnect_fonts', 1 );

/* ==========================================================================
   Enqueue Scripts & Styles
   ========================================================================== */

function collective_enqueue_scripts() {
        $theme_version = wp_get_theme()->get( 'Version' );

        // Google Fonts — Montserrat 400, 600, 700
        wp_enqueue_style(
                'collective-google-fonts',
                'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap',
                array(),
                null
        );

        // Main stylesheet
        wp_enqueue_style(
                'collective-style',
                get_stylesheet_uri(),
                array( 'collective-google-fonts' ),
                $theme_version
        );

        // Main JS (menu + search overlay)
        wp_enqueue_script(
                'collective-main',
                get_template_directory_uri() . '/js/main.js',
                array(),
                $theme_version,
                true
        );

        // Infinite scroll — single posts only
        if ( is_single() ) {
                wp_enqueue_script(
                        'collective-infinite-scroll',
                        get_template_directory_uri() . '/js/infinite-scroll.js',
                        array(),
                        $theme_version,
                        true
                );

                global $post;
                $categories = wp_get_post_categories( $post->ID );

                wp_localize_script( 'collective-infinite-scroll', 'collectiveData', array(
                        'postId'     => $post->ID,
                        'categoryId' => ! empty( $categories ) ? $categories[0] : 0,
                        'restUrl'    => rest_url(),
                        'siteName'   => get_bloginfo( 'name' ),
                        'nonce'      => wp_create_nonce( 'wp_rest' ),
                ) );
        }
}
add_action( 'wp_enqueue_scripts', 'collective_enqueue_scripts' );

/* ==========================================================================
   Custom REST API Endpoint — Render Article HTML for Infinite Scroll
   ========================================================================== */

add_action( 'rest_api_init', function () {
        register_rest_route( 'collective/v1', '/post-html/(?P<id>\d+)', array(
                'methods'             => 'GET',
                'callback'            => 'collective_render_post_html',
                'permission_callback' => '__return_true',
                'args'                => array(
                        'id' => array(
                                'validate_callback' => function ( $param ) {
                                        return is_numeric( $param );
                                },
                        ),
                ),
        ) );
} );

function collective_render_post_html( $request ) {
        $post_id = (int) $request['id'];
        $post    = get_post( $post_id );

        if ( ! $post || $post->post_status !== 'publish' || $post->post_type !== 'post' ) {
                return new WP_Error(
                        'not_found',
                        __( 'Post not found or not published.', 'collective' ),
                        array( 'status' => 404 )
                );
        }

        // Setup post data for template tags
        $GLOBALS['post'] = $post;
        setup_postdata( $post );

        ob_start();
        get_template_part( 'template-parts/content', 'single-infinite' );
        $html = ob_get_clean();

        wp_reset_postdata();

        return rest_ensure_response( array(
                'html'      => $html,
                'id'        => $post->ID,
                'title'     => get_the_title( $post->ID ),
                'permalink' => get_permalink( $post->ID ),
        ) );
}

/* ==========================================================================
   Excerpt
   ========================================================================== */

add_filter( 'excerpt_length', function () { return 25; } );
add_filter( 'excerpt_more', function () { return '&hellip;'; } );

/* ==========================================================================
   Human-readable time helper
   ========================================================================== */

function collective_time_ago( $post_id = null ) {
        $time      = get_the_time( 'U', $post_id );
        $current   = current_time( 'timestamp' );
        $diff      = $current - $time;

        if ( $diff < 86400 ) {
                return human_time_diff( $time, $current ) . ' ago';
        }

        return get_the_date( 'F j, Y', $post_id );
}

/* ==========================================================================
   Author social links (stored as user meta)
   ========================================================================== */

function collective_get_author_social( $author_id ) {
        $social    = array();
        $twitter   = get_user_meta( $author_id, 'twitter', true );
        $instagram = get_user_meta( $author_id, 'instagram', true );
        $website   = get_the_author_meta( 'user_url', $author_id );

        if ( $twitter )   $social['twitter']   = esc_url( $twitter );
        if ( $instagram ) $social['instagram'] = esc_url( $instagram );
        if ( $website )   $social['website']   = esc_url( $website );

        return $social;
}

/* ==========================================================================
   Add loading="lazy" to content images
   ========================================================================== */

function collective_lazy_images( $content ) {
        if ( is_admin() ) {
                return $content;
        }
        return preg_replace( '/<img((?!.*loading=)[^>]*)>/i', '<img$1 loading="lazy">', $content );
}
add_filter( 'the_content', 'collective_lazy_images' );

/* ==========================================================================
   Customizer Settings
   ========================================================================== */

function collective_customizer( $wp_customize ) {
        // Section: Theme Options
        $wp_customize->add_section( 'collective_options', array(
                'title'    => __( 'Collective Theme Options', 'collective' ),
                'priority' => 130,
        ) );

        // Above-header strip text
        $wp_customize->add_setting( 'collective_header_strip', array(
                'default'           => '',
                'sanitize_callback' => 'sanitize_text_field',
                'transport'         => 'refresh',
        ) );
        $wp_customize->add_control( 'collective_header_strip', array(
                'label'       => __( 'Above Header Strip Text', 'collective' ),
                'description' => __( 'Optional short text shown above the header (e.g. moon phase info, newsletter invite).', 'collective' ),
                'section'     => 'collective_options',
                'type'        => 'text',
        ) );

        // Footer tagline / copyright suffix
        $wp_customize->add_setting( 'collective_footer_text', array(
                'default'           => '',
                'sanitize_callback' => 'sanitize_text_field',
                'transport'         => 'refresh',
        ) );
        $wp_customize->add_control( 'collective_footer_text', array(
                'label'   => __( 'Footer Copyright Suffix', 'collective' ),
                'section' => 'collective_options',
                'type'    => 'text',
        ) );
}
add_action( 'customize_register', 'collective_customizer' );

/* ==========================================================================
   User profile fields — social links
   ========================================================================== */

function collective_user_profile_fields( $user ) {
        ?>
        <h2><?php esc_html_e( 'Social Profiles', 'collective' ); ?></h2>
        <table class="form-table">
                <tr>
                        <th><label for="twitter"><?php esc_html_e( 'Twitter URL', 'collective' ); ?></label></th>
                        <td>
                                <input type="url" name="twitter" id="twitter"
                                       value="<?php echo esc_attr( get_user_meta( $user->ID, 'twitter', true ) ); ?>"
                                       class="regular-text" />
                        </td>
                </tr>
                <tr>
                        <th><label for="instagram"><?php esc_html_e( 'Instagram URL', 'collective' ); ?></label></th>
                        <td>
                                <input type="url" name="instagram" id="instagram"
                                       value="<?php echo esc_attr( get_user_meta( $user->ID, 'instagram', true ) ); ?>"
                                       class="regular-text" />
                        </td>
                </tr>
        </table>
        <?php
}
add_action( 'show_user_profile', 'collective_user_profile_fields' );
add_action( 'edit_user_profile', 'collective_user_profile_fields' );

function collective_save_user_profile_fields( $user_id ) {
        if ( ! current_user_can( 'edit_user', $user_id ) ) {
                return;
        }
        if ( isset( $_POST['twitter'] ) ) {
                update_user_meta( $user_id, 'twitter', esc_url_raw( $_POST['twitter'] ) );
        }
        if ( isset( $_POST['instagram'] ) ) {
                update_user_meta( $user_id, 'instagram', esc_url_raw( $_POST['instagram'] ) );
        }
}
add_action( 'personal_options_update', 'collective_save_user_profile_fields' );
add_action( 'edit_user_profile_update', 'collective_save_user_profile_fields' );

/* ==========================================================================
   Remove unnecessary wp_head items for cleaner output
   ========================================================================== */

remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'wp_generator' );


/* ==========================================================================
   Customizer Settings
   ========================================================================== */

function collective_customize_register( $wp_customize ) {

        // Add Collective Settings Section
        $wp_customize->add_section( 'collective_settings', array(
                'title'    => __( 'Collective Theme Settings', 'collective' ),
                'priority' => 30,
        ) );

        // Show Ad Placeholder
        $wp_customize->add_setting( 'collective_show_ad_placeholder', array(
                'default'           => true,
                'sanitize_callback' => 'wp_validate_boolean',
        ) );

        $wp_customize->add_control( 'collective_show_ad_placeholder', array(
                'label'       => __( 'Show Ad Placeholder', 'collective' ),
                'description' => __( 'Show the leaderboard ad placeholder when no ad widget is set.', 'collective' ),
                'section'     => 'collective_settings',
                'type'        => 'checkbox',
        ) );

        // Social Media Follower Counts (for menu)
        $wp_customize->add_setting( 'collective_instagram_count', array(
                'default'           => '45k',
                'sanitize_callback' => 'sanitize_text_field',
        ) );

        $wp_customize->add_control( 'collective_instagram_count', array(
                'label'   => __( 'Instagram Followers', 'collective' ),
                'section' => 'collective_settings',
                'type'    => 'text',
        ) );

        $wp_customize->add_setting( 'collective_twitter_count', array(
                'default'           => '28k',
                'sanitize_callback' => 'sanitize_text_field',
        ) );

        $wp_customize->add_control( 'collective_twitter_count', array(
                'label'   => __( 'Twitter/X Followers', 'collective' ),
                'section' => 'collective_settings',
                'type'    => 'text',
        ) );

        $wp_customize->add_setting( 'collective_facebook_count', array(
                'default'           => '12k',
                'sanitize_callback' => 'sanitize_text_field',
        ) );

        $wp_customize->add_control( 'collective_facebook_count', array(
                'label'   => __( 'Facebook Followers', 'collective' ),
                'section' => 'collective_settings',
                'type'    => 'text',
        ) );

        // Show/Hide Publish Date
        $wp_customize->add_setting( 'collective_show_date', array(
                'default'           => false,
                'sanitize_callback' => 'wp_validate_boolean',
        ) );

        $wp_customize->add_control( 'collective_show_date', array(
                'label'       => __( 'Show Publish Date', 'collective' ),
                'description' => __( 'Display publish date on post cards and article pages.', 'collective' ),
                'section'     => 'collective_settings',
                'type'        => 'checkbox',
        ) );
}
add_action( 'customize_register', 'collective_customize_register' );

/* ==========================================================================
   Simple Walker Class for Menu Items (used in fullscreen menu)
   ========================================================================== */

class Collective_Simple_Walker extends Walker_Nav_Menu {
        public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
                $output .= '<a href="' . esc_url( $item->url ) . '">' . esc_html( $item->title ) . '</a>';
        }
        public function end_el( &$output, $item, $depth = 0, $args = null ) {}
}


/* ==========================================================================
   Category Walker Class for Large Menu Items
   ========================================================================== */

class Collective_Category_Walker extends Walker_Nav_Menu {
        public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
                $output .= '<a href="' . esc_url( $item->url ) . '" class="fmenu-category-link">' . esc_html( $item->title ) . '</a>';
        }
        public function end_el( &$output, $item, $depth = 0, $args = null ) {}
}
