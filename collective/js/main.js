/**
 * Collective Theme — Main JavaScript
 * Handles: mobile nav overlay, search overlay, keyboard accessibility
 */
(function () {
  'use strict';

  document.addEventListener( 'DOMContentLoaded', function () {

    /* ----------------------------------------------------------------
       Mobile Navigation Overlay
    ---------------------------------------------------------------- */
    var menuBtn   = document.getElementById( 'menu-toggle' );
    var mobileNav = document.getElementById( 'mobile-nav' );
    var navClose  = document.getElementById( 'mobile-nav-close' );

    function openNav() {
      if ( ! mobileNav ) return;
      mobileNav.classList.add( 'is-open' );
      document.body.style.overflow = 'hidden';
      if ( menuBtn ) menuBtn.setAttribute( 'aria-expanded', 'true' );
      // Move focus to close button
      if ( navClose ) setTimeout( function () { navClose.focus(); }, 50 );
    }

    function closeNav() {
      if ( ! mobileNav ) return;
      mobileNav.classList.remove( 'is-open' );
      document.body.style.overflow = '';
      if ( menuBtn ) {
        menuBtn.setAttribute( 'aria-expanded', 'false' );
        menuBtn.focus();
      }
    }

    if ( menuBtn ) menuBtn.addEventListener( 'click', openNav );
    if ( navClose ) navClose.addEventListener( 'click', closeNav );
    if ( mobileNav ) {
      mobileNav.addEventListener( 'click', function ( e ) {
        if ( e.target === mobileNav ) closeNav();
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

    if ( searchBtn )  searchBtn.addEventListener( 'click', openSearch );
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
        closeNav();
        closeSearch();
      }
    } );

  } );

})();
