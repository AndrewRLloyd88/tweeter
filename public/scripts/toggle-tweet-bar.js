//needed for jQuery and eslint
/* global document */
/* eslint-env jquery */

$(document).ready(() => {
  //grabbing the needed DOM elements
  const $tweetBar = $('.new-tweet');
  const $navToggle = $('#nav-toggle');
  const $tweetText = $('#tweet-text');

  //if the user clicks on write a new tweet slideToggle the display area
  $navToggle.click(function(event) {
    console.log(event);
    $tweetBar.slideToggle();
    $tweetText.focus();
  });
});