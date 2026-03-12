/**
 * Collective Theme — Main JavaScript
 * Handles: full-screen menu overlay, search overlay, keyboard accessibility, animations
 */
(function () {
  'use strict';

  document.addEventListener( 'DOMContentLoaded', function () {

    /* ----------------------------------------------------------------
       Full-Screen Dark Menu Overlay
    ---------------------------------------------------------------- */
    var menuBtn       = document.getElementById( 'menu-toggle' );
    var fullscreenMenu = document.getElementById( 'fullscreen-menu' );
    var menuClose     = document.getElementById( 'menu-close' );

    function openMenu() {
      if ( ! fullscreenMenu ) return;
      fullscreenMenu.classList.add( 'is-open' );
      document.body.style.overflow = 'hidden';
      if ( menuBtn ) menuBtn.setAttribute( 'aria-expanded', 'true' );
      // Move focus to close button
      if ( menuClose ) setTimeout( function () { menuClose.focus(); }, 50 );
    }

    function closeMenu() {
      if ( ! fullscreenMenu ) return;
      fullscreenMenu.classList.remove( 'is-open' );
      document.body.style.overflow = '';
      if ( menuBtn ) {
        menuBtn.setAttribute( 'aria-expanded', 'false' );
        menuBtn.focus();
      }
    }

    if ( menuBtn ) menuBtn.addEventListener( 'click', openMenu );
    if ( menuClose ) menuClose.addEventListener( 'click', closeMenu );

    // Close when clicking on links in the menu
    if ( fullscreenMenu ) {
      var menuLinks = fullscreenMenu.querySelectorAll( 'a' );
      menuLinks.forEach( function ( link ) {
        link.addEventListener( 'click', function () {
          // Small delay to allow navigation
          setTimeout( closeMenu, 100 );
        } );
      } );
    }

    /* ----------------------------------------------------------------
       Search Overlay
    ---------------------------------------------------------------- */
    var searchBtn     = document.getElementById( 'search-toggle' );
    var searchOverlay = document.getElementById( 'search-overlay' );
    var searchClose   = document.getElementById( 'search-close' );

    function openSearch() {
      if ( ! searchOverlay ) return;
      searchOverlay.classList.add( 'is-open' );
      document.body.style.overflow = 'hidden';
      if ( searchBtn ) searchBtn.setAttribute( 'aria-expanded', 'true' );
      var input = searchOverlay.querySelector( 'input[type="search"]' );
      if ( input ) setTimeout( function () { input.focus(); }, 60 );
    }

    function closeSearch() {
      if ( ! searchOverlay ) return;
      searchOverlay.classList.remove( 'is-open' );
      document.body.style.overflow = '';
      if ( searchBtn ) {
        searchBtn.setAttribute( 'aria-expanded', 'false' );
        searchBtn.focus();
      }
    }

    if ( searchBtn )   searchBtn.addEventListener( 'click', openSearch );
    if ( searchClose ) searchClose.addEventListener( 'click', closeSearch );
    if ( searchOverlay ) {
      searchOverlay.addEventListener( 'click', function ( e ) {
        if ( e.target === searchOverlay ) closeSearch();
      } );
    }

    /* ----------------------------------------------------------------
       Escape key — close any open overlay
    ---------------------------------------------------------------- */
    document.addEventListener( 'keydown', function ( e ) {
      if ( e.key === 'Escape' ) {
        closeMenu();
        closeSearch();
      }
    } );

    /* ----------------------------------------------------------------
       Smooth page entrance animations
    ---------------------------------------------------------------- */
    // Add 'loaded' class to body for entrance animations
    document.body.classList.add( 'collective-loaded' );

  } );

})();
