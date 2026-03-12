/**
 * Collective Theme — Infinite Article Scroll
 *
 * Loads the next article in the same category as the user scrolls,
 * appending it below the current one. Updates the browser URL and
 * page title via History.replaceState as the user scrolls into each article.
 *
 * Uses: Intersection Observer API + WP REST API (no jQuery)
 */
(function () {
  'use strict';

  /** @type {boolean} Prevent concurrent fetches */
  var loading = false;
  /** @type {boolean} No more posts to load */
  var finished = false;
  /** @type {number} Category ID of the first/current article */
  var categoryId = 0;
  /** @type {number[]} IDs already loaded — used to exclude from REST query */
  var loadedIds = [];

  // Data injected by wp_localize_script
  var cfg = window.collectiveData || {};

  /* ------------------------------------------------------------------
     Initialise
  ------------------------------------------------------------------ */
  function init() {
    if ( ! cfg.postId || ! cfg.categoryId ) return;

    categoryId = parseInt( cfg.categoryId, 10 );
    loadedIds.push( parseInt( cfg.postId, 10 ) );

    observeSentinel( document.getElementById( 'infinite-scroll-sentinel' ) );
  }

  /* ------------------------------------------------------------------
     Intersection Observer — watch the sentinel div near the page bottom
  ------------------------------------------------------------------ */
  function observeSentinel( sentinel ) {
    if ( ! sentinel ) return;

    var io = new IntersectionObserver( function ( entries ) {
      entries.forEach( function ( entry ) {
        if ( entry.isIntersecting && ! loading && ! finished ) {
          loadNext();
        }
      } );
    }, {
      rootMargin: '0px 0px 600px 0px', // start fetching 600px before sentinel
      threshold: 0,
    } );

    io.observe( sentinel );
  }

  /* ------------------------------------------------------------------
     Fetch + render the next article
  ------------------------------------------------------------------ */
  async function loadNext() {
    loading = true;
    showLoader( true );

    // 1. Find the next post ID via WP REST API
    var exclude  = loadedIds.join( ',' );
    var listUrl  = cfg.restUrl + 'wp/v2/posts'
      + '?categories=' + categoryId
      + '&exclude='    + exclude
      + '&per_page=1'
      + '&orderby=date'
      + '&order=desc'
      + '&_fields=id,link,title';

    try {
      var listRes  = await fetch( listUrl, { headers: { 'X-WP-Nonce': cfg.nonce } } );
      var posts    = await listRes.json();

      if ( ! posts || posts.length === 0 ) {
        showEnd();
        showLoader( false );
        loading   = false;
        finished  = true;
        return;
      }

      var post = posts[0];
      loadedIds.push( post.id );

      // 2. Fetch rendered HTML from our custom endpoint
      var htmlUrl = cfg.restUrl + 'collective/v1/post-html/' + post.id;
      var htmlRes = await fetch( htmlUrl, { headers: { 'X-WP-Nonce': cfg.nonce } } );

      if ( ! htmlRes.ok ) throw new Error( 'HTML fetch failed: ' + htmlRes.status );

      var data = await htmlRes.json();

      append( data.html, post );
      showLoader( false );
      loading = false;

    } catch ( err ) {
      console.error( '[Collective] Infinite scroll error:', err );
      showLoader( false );
      loading = false;
    }
  }

  /* ------------------------------------------------------------------
     Append a new article to the infinite scroll container
  ------------------------------------------------------------------ */
  function append( html, post ) {
    var container = document.getElementById( 'infinite-scroll-container' );
    var sentinel  = document.getElementById( 'infinite-scroll-sentinel' );
    if ( ! container || ! sentinel ) return;

    // -- Divider --
    var divider = document.createElement( 'div' );
    divider.className   = 'article-divider';
    divider.innerHTML   =
      '<div class="article-divider__line"></div>' +
      '<span class="article-divider__logo">' +
        escapeHtml( cfg.siteName || 'Collective' ) +
      '</span>';

    // -- Article wrapper (same classes as the original article) --
    var article = document.createElement( 'article' );
    article.className = 'site-container site-content infinite-article';
    article.setAttribute( 'data-post-id', post.id );
    article.innerHTML = html;

    // Insert both before the sentinel (so sentinel stays at the very bottom)
    container.insertBefore( divider, sentinel );
    container.insertBefore( article, sentinel );

    // Watch the new article for URL updates
    watchForURLUpdate( article, post );

    // Watch the new article's own sentinel for the *next* article
    var newSentinel = article.querySelector( '.infinite-scroll-article-end' );
    if ( newSentinel ) observeSentinel( newSentinel );
  }

  /* ------------------------------------------------------------------
     Update URL + title when user is reading a particular article
  ------------------------------------------------------------------ */
  function watchForURLUpdate( el, post ) {
    var title = decodeEntities(
      post.title && post.title.rendered ? post.title.rendered : ''
    );
    var href = post.link || '';

    var io = new IntersectionObserver( function ( entries ) {
      entries.forEach( function ( entry ) {
        if ( entry.isIntersecting ) {
          try {
            var path = href ? new URL( href ).pathname : '';
            if ( path ) history.replaceState( { postId: post.id }, title, path );
          } catch ( e ) { /* ignore */ }
          if ( title ) {
            document.title = title +
              ( cfg.siteName ? ' \u2014 ' + cfg.siteName : '' );
          }
        }
      } );
    }, {
      rootMargin: '-30% 0px -30% 0px', // article is "active" when 30%+ visible
      threshold: 0,
    } );

    io.observe( el );
  }

  /* ------------------------------------------------------------------
     Helpers
  ------------------------------------------------------------------ */
  function showLoader( show ) {
    var el = document.getElementById( 'scroll-loader' );
    if ( el ) el.style.display = show ? 'flex' : 'none';
  }

  function showEnd() {
    var el = document.getElementById( 'scroll-end' );
    if ( el ) el.style.display = 'block';
  }

  function decodeEntities( str ) {
    var ta = document.createElement( 'textarea' );
    ta.innerHTML = str;
    return ta.value;
  }

  function escapeHtml( str ) {
    return str
      .replace( /&/g,  '&amp;' )
      .replace( /</g,  '&lt;' )
      .replace( />/g,  '&gt;' )
      .replace( /"/g,  '&quot;' );
  }

  /* ------------------------------------------------------------------
     Boot
  ------------------------------------------------------------------ */
  if ( document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', init );
  } else {
    init();
  }

})();
