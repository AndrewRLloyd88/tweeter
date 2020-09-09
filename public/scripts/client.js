/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//needed for jQuery and eslint
/* global document */
/* eslint-env jquery */

//helper function to format the timestamp into days comparing against today's date
const getDaysCreatedAgo = (timestamp) => {
  const today = new Date();
  //subtract today's date from timestamp / 86400000ms (ms in a day)
  const days = Math.floor((today - timestamp) / (1000 * 60 * 60 * 24));
  //check what value days is to return correct suffix
  return formatDay(days);
  // console.log(today / 1000 * 60 * 60 * 24)
};

//helper function to determine suffix for today/day/days
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
  //hard coded object for testing, will be superceded by AJAX request to JSON
  // Fake data taken from initial-tweets.json

  //loadTweets - uses AJAX to fetch(GET) the data from our /tweets route
  const loadTweets = () => {
    //make a GET request to /tweets
    $.get('/tweets', function(data) {
      console.log(data);
      renderTweets(data);
    });
  }

  loadTweets();


  //loops through tweets, calls createTweetElement for each tweet
  const renderTweets = (tweets) => {
    // declare object to append to here
    const tweetContainer = $('#tweet-container');
    //empty tweet container
    tweetContainer.empty();
    // loop through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      tweetContainer.prepend($tweet);
    }
  };


  //takes in a tweet object and it returns a tweet article
  const createTweetElement = function(tweetObject) {
    //breaking our tweet object into
    const { name, avatars, handle } = tweetObject.user;
    const content = tweetObject.content.text;
    //we will need a helper function to find the difference between days created and todays date.
    const timeStamp = new Date(tweetObject.created_at);
    //format day into today, 1 day ago or x days ago
    const days = getDaysCreatedAgo(timeStamp);
 
    //create our html from our tweet template
    //styling for article
    const $article = $('<article>').addClass('indiv-tweet').append('</article>');

    //styling for header
    const $header = $('<header>').addClass('padding-20').append('</header>');
    const $avatar = $('<img>').attr("src", avatars).addClass("avatar");
    const $name = $('<div>' + name + '</div>');
    const $handle = $('<div>').addClass('handle').text(handle).append('</div>');

    //appending all necessary elements in correct order for header
    $header.append($avatar, $name, $handle);
  
    //styling main body of tweet
    const $main = $('<main>').text(content).append('</main>');

    //styling footer of tweet
    const $footer = $('<footer>').addClass('padding-20').append('</footer>');
    const $dateActions = $('<div>').addClass('date-actions').text(days).append('</div>');
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


    const $tweet = $($article
      .append($header)
      .append($main)
      .append($footer)
    );
    //return
    return $tweet;
  };

  // when the form is submitted
  //grabbing the form element on the dom
    const $tweetForm = $('#tweet-form');
    //grabbing the input field on the dom
    const $tweetText = $('#tweet-text')

    $tweetForm.on('submit', function (event) {
      //prevent the default browser behaviour
      event.preventDefault();
       // serialize the form data for submission to the server
      const post = $(this).serialize()
      // submit serialized data to the server via a POST request to `/tweets`
      $.post('/tweets', post)
      .then((response) => {
        //logging out the response of the promise
        console.log(response);
        //re-render the tweets
        loadTweets();
        //clear the form after submission
        $tweetText.val('');
      });
  });


  // const $tweet = createTweetElement();
  // const $tweet = createTweetElement(tweetObject);
  // console.log($tweet)
  // $('#tweet-container').append($tweet);

});