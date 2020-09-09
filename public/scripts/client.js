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
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Gary Andreini",
        "handle": "@MrAndreini48",
        "avatars": "https://i.imgur.com/5fUVPRP.png"
      },
      "content": {
        "text": " Gott ist tot“ (help·info); also known as The Death of God) is a widely quoted statement by German philosopher Friedrich Nietzsche."
      },
      "created_at": 1599625086506
    },
    {
      "user": {
        "name": "Misutā Supākoru",
        "handle": "@MrSparkaru1989",
        "avatars": "https://i.imgur.com/5fUVPRP.png"
      },
      "content": {
        "text": " I am a fish and I am okay"
      },
      "created_at": 1599515086506
    },
    {
      "user": {
        "name": "Señor Coconut",
        "handle": "@SeñorCoconut",
        "avatars": "https://i.imgur.com/5fUVPRP.png"
      },
      "content": {
        "text": " 'Germans are probably funny people' - Uwe Schmidt, 2000"
      },
      "created_at": 1599415086506
    }
  ];


  //loops through tweets, calls createTweetElement for each tweet
  const renderTweets = (tweets) => {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweet-container').append($tweet);
    }
  };


  //takes in a tweet object and it returns a tweet article
  const createTweetElement = function(tweetObject) {
    //breaking our tweet object into
    const { name, avatars, handle } = tweetObject.user;
    const content = tweetObject.content.text;
    //we will need a helper function to find the difference between days created and todays date.
    const timeStamp = new Date(tweetObject.created_at);
    const days = getDaysCreatedAgo(timeStamp);
    //needed to distinguish between today/day/days when displaying created x day ago
    // let dayFormat = "days";
    //create our html from our tweet template
    let $tweet = $(
      `<article class="indiv-tweet">
      <header class="padding-20">
      <img class="avatar" src=${avatars}> 
      <div>${name}</div>
      <div class="handle">${handle}</div>

      </header>
      <main>
        ${content}
      </main>
      <footer class="padding-20">
        <div class="date-actions">
          ${days}
          <div class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class='fas fa-retweet'></i>
            <i class='fas fa-heart'></i>
          </div>
        </div>
      </footer>
    </article>`);

    // console.log(name, avatars, handle, days, timeStamp, content)
    //return
    return $tweet;
  };


  // const $tweet = createTweetElement();
  // const $tweet = createTweetElement(tweetObject);
  // console.log($tweet)
  // $('#tweet-container').append($tweet);
  renderTweets(data);

});