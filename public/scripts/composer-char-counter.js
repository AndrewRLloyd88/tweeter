/* global document */
/* eslint-env jquery */

$(document).ready(() => {
  //using keyup to immediately get the value in the textarea
  $("#tweet-text").on('input', function() {
    const $errormsg = $('#tweet-error-msg')
    // console.log(charLength);
    //charCount is the length of chars inputted by user on textarea
    let charCount = $(this).val().length;
    //our char limit is 140
    let charLimit = 140;

    // console.log(this).children("div")
    $errormsg.slideUp().empty()

    //counter should be normal colour under 140 chars
    if (charCount <= charLimit) {
      $(this)
        //For each element in the tree, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
        .closest(".new-tweet")
        .find(".counter")
        .removeClass('limit-reached')
        .text(charLimit - charCount);
    } else {
      //counter should be red above 140 characters
      $(this)
        .closest(".new-tweet")
        .find(".counter")
        .addClass('limit-reached')
        .text(charLimit - charCount);
    }
  });






});