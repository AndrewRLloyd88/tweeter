//needed for jQuery and eslint
/* global document */
/* eslint-env jquery */

$(document).ready(() => {
  //using input to immediately get the value entered in the textarea
  $("#tweet-text").on('input', function() {
    const $errormsg = $('#tweet-error-msg');
    //charCount is the length of chars inputted by user on textarea
    let charCount = $(this).val().length;
    //our char limit is 140
    let charLimit = 140;

    //clear error message when user attempts to type/delete
    $errormsg.slideUp().empty();

    //counter should be normal colour under 140 chars
    if (charCount <= charLimit) {
      $(this)
        //start at the .new-tweet class
        .closest(".new-tweet")
        // traverse up through the above dom elements ancestors in the DOM tree to find this selector.
        .find(".counter")
        //remove the red class from our counter
        .removeClass('limit-reached')
        //update the displayed counter in output
        .text(charLimit - charCount);
    } else {
      //counter should be red above 140 characters
      $(this)
        .closest(".new-tweet")
        .find(".counter")
        //add the red class to our counter
        .addClass('limit-reached')
        .text(charLimit - charCount);
    }
  });
});