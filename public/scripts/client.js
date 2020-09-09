/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const tweetObject = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  //takes in a tweet object and it returns a tweet article
  const createTweetElement = function (tweetObject) {
    //breaking our tweet object into 
    const {name, avatars, handle} = tweetObject.user;
    const content = tweetObject.content.text;
    //we will need a helper function to find the difference between days created and todays date.
    const timeStamp = new Date(tweetObject.created_at);
    //hard coded function
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
          ${timeStamp} days ago
          <div class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class='fas fa-retweet'></i>
            <i class='fas fa-heart'></i>
          </div>
        </div>
      </footer>
    </article>`);

    console.log(name, avatars, handle)
    //return
    return $tweet;
  };

  // const $tweet = createTweetElement();
  const $tweet = createTweetElement(tweetObject);
  console.log($tweet)
  $('#tweet-container').append($tweet);

});