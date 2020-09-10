/* global document */
/* eslint-env jquery */

$(document).ready(() => {
const $tweetBar = $('.new-tweet');
const $navToggle = $('#nav-toggle');
const $tweetText = $('#tweet-text')

$navToggle.click(function(event){
  console.log(event);
  $tweetBar.slideToggle();
  $tweetText.focus();
});

});