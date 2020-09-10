//needed for jQuery and eslint
/* global document */
/* eslint-env jquery */

//helper function to format the timestamp into days comparing against today's date
const getDaysCreatedAgo = (timestamp) => {
  const today = new Date();
  //subtract today's date from timestamp / 86400000ms (ms in a day)
  const days = Math.floor((today - timestamp) / (1000 * 60 * 60 * 24));
  //check what value days is to return correct verbiage
  return formatDay(days);
};

//helper function to determine correct verbiage for today/day/days
const formatDay = (days) => {
  if (days === 0) {
    days = "Today";
  } else if (days === 1) {
    days = `${days} day ago`;
  } else {
    days = `${days} days ago`;
  }
  return days;
};

$(document).ready(() => {
  // this function uses AJAX to fetch(GET) the data from our /tweets route
  const loadTweets = () => {
    //make a GET request to /tweets
    $.get('/tweets', function(data) {
      renderTweets(data);
    });
  };
  //compass advised to call loadTweets() directly after it was declared and stored
  loadTweets();

  //this function loops through tweets, calls createTweetElement for each tweet in our object
  const renderTweets = (tweets) => {
    // declare object to append to here
    const tweetContainer = $('#tweet-container');
    //empty tweet container so we don't duplicate our tweets every time
    tweetContainer.empty();
    // iterate throguh our array of tweets
    for (const tweet of tweets) {
      // build the dom elements for each tweet using createTweetElement
      const $tweet = createTweetElement(tweet);
      // prepends each built tweet to our tweet container so tweets show from most recent - least recent
      tweetContainer.prepend($tweet);
    }
  };

  //takes in a tweet object from the array of tweets and builds out it's DOM elements
  const createTweetElement = function(tweetObject) {
    //destructure our dynamic properties from our tweetObject
    const { name, avatars, handle } = tweetObject.user;
    //grab the users tweet
    const content = tweetObject.content.text;
    //format the grabbed timestamp as a date
    const timeStamp = new Date(tweetObject.created_at);
    //use getDaysCreatedAgo to get our correct verbiage and a day number from our datestamp
    const days = getDaysCreatedAgo(timeStamp);

    //create our Dom elements from our tweet template - using .text() to stop injection attacks
    //styling for article
    const $article = $('<article>').addClass('indiv-tweet').append('</article>');

    //styling for header
    const $header = $('<header>').addClass('padding-20').append('</header>');
    const $avatar = $('<img>').attr("src", avatars).addClass("avatar");
    const $name = $('<div>' + name + '</div>');
    const $handle = $('<div>').addClass('handle').text(handle).append('</div>');

    //appending all necessary elements in correct order for header - needed for flex to work
    $header.append($avatar, $name, $handle);

    //styling main body of tweet
    const $main = $('<main>').text(content).addClass('overflow').append('</main>');

    //styling footer of tweet
    const $footer = $('<footer>').addClass('padding-20').append('</footer>');
    const $dateActions = $('<div>').addClass('date-actions').text(days).addClass('date').append('</div>');
    const $tweetIcons = $('<div>').addClass('tweet-icons').append('</div>');
    const $flag = $('<i>').addClass('fas fa-flag').append('</i>');
    const $retweet = $('<i>').addClass('fas fa-retweet').append('</i>');
    const $heart = $('<i>').addClass('fas fa-heart').append('</i>');

    //individual icons live in a div with class "tweet-icons" for flex to work
    $tweetIcons.append($flag, $retweet, $heart);
    //appending tweetIcons div to dateActions
    $dateActions.append($tweetIcons);
    //appending the datestamp and icons to footer
    $footer.append($dateActions);

    //appending the above composed elements into our final tweet object
    const $tweet = $($article
      .append($header)
      .append($main)
      .append($footer)
    );
    //return our tweet to renderTweets()
    return $tweet;
  };

  // when the form is submitted
  //grabbing the form element on the dom
  const $tweetForm = $('#tweet-form');
  //grabbing the input field on the dom
  const $tweetText = $('#tweet-text');

  $tweetForm.on('submit', function(event) {
    //prevents default form behaviour to stop page from refreshing
    event.preventDefault();
    // serialize the form data for submission to the server
    const post = $(this).serialize();
    //we can use the searialzed form data (post) - charlength to test "" or by slicing text= from the serialized post test using .length
    const charLength = (post.slice(5));
    //define our max character length -140
    const maxCharLength = 140;
    //grabbing our error div
    const $errormsg = $('#tweet-error-msg');

    //is the post empty or is the length 0?
    if (charLength === "" || charLength.length === 0) {
      //clear the container to stop duplicate messages and re-append our error message
      $errormsg.empty();
      $errormsg.append('<p><i class="fas fa-exclamation-triangle"></i> Uh, you have to actually type to tweet! Please type something!</p>').slideDown();
      return false;
    }
    //does the post exceed 140 characters?
    if (charLength.length > maxCharLength) {
      //clear the container to stop duplicate messages and re-append our error message
      $errormsg.empty();
      $errormsg.append('<p><i class="fas fa-exclamation-triangle"></i> You\'re too chatty! Please type less than 140 characters to tweet!</p>').slideDown();
      return false;
    }

    //if all checks above are satisfied submit serialized data to the server via a POST request to `/tweets`
    $.post('/tweets', post)
      .then(() => {
        //reset the output counter to 140
        $(this).find('output').text("140");
        //re-render the tweets
        loadTweets();
        //clear the form after submission
        $tweetText.val('');
      });
  });
});