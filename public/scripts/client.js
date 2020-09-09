/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//helper function to format the timestamp into days comparing against today's date 
const getDaysCreatedAgo = (timestamp) => {
  const today = new Date()
  //subtract today's date from timestamp / 86400000ms (ms in a day)
  const days = Math.floor((today - timestamp) / (1000 * 60 * 60 * 24));
  // console.log(today / 1000 * 60 * 60 * 24)
  return days;
}

$(document).ready(() => {
  //hard coded object for testing, will be superceded by AJAX request to JSON
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
    const { name, avatars, handle } = tweetObject.user;
    const content = tweetObject.content.text;
    //we will need a helper function to find the difference between days created and todays date.
    const timeStamp = new Date(tweetObject.created_at);
    const days = getDaysCreatedAgo(timeStamp);
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
          ${days} days ago
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
  const $tweet = createTweetElement(tweetObject);
  console.log($tweet)
  $('#tweet-container').append($tweet);

});