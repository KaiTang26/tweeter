/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function(){

//ajax to upload new tweets
  function renderTweets(tweets){

    $( "#tweets" ).empty();

    tweets.forEach((tweet)=>{

      const $tweet=createTweetElement(tweet);

      $("#tweets").prepend($tweet);
      console.log("run")

    });

  }

// construct html by jquery
  function createTweetElement(tweetData){

    let $tweet = $("<article> </article>").addClass("oldTweet");
    let $header = $("<header> </header>").html(`<img src=${tweetData.user.avatars.small}>`);

    let $headerSpan1 = $("<span> </span>").addClass("tweeterName").text(tweetData.user.name);

    let $headerSpan2 = $("<span> </span>").addClass("tweeterId").text(tweetData.user.handle);

    $header.append($headerSpan1).append($headerSpan2);

    const postTime = parseDate(tweetData.created_at);

    // console.log(postTime);

    let $text = $("<p> </p>").text(tweetData.content.text);

    let $article =$("<article> </article>").append($text);

    let footerSpan =$(`<span> </span>`).addClass("postTime").text(postTime);

    let $footer = $("<footer> </footer>").append(footerSpan);

    let $div = `
      <div class="icon">
        <i class="fa fa-flag" aria-hidden="true"></i>
        <i class="fa fa-retweet" aria-hidden="true"></i>
        <i class="fa fa-heart" aria-hidden="true"></i>
      </div>
    `
    $footer.append($div);

    // console.log($footer);

    $tweet.append($header).append($article).append($footer);

    return $tweet;

  }

// function for parse time
  function parseDate(createdTime){

    const currentTime = new Date();
    let timeDiff = Math.floor((currentTime - createdTime)/1000);

    // console.log(timeDiff);

    if(timeDiff<60){

      return `${timeDiff} second ago`

    }else{

      timeDiff=Math.floor(timeDiff/60)

      if(timeDiff<60){

        return `${timeDiff} minute ago`

      }else{

        timeDiff=Math.floor(timeDiff/60)

        if(timeDiff<24){

          return `${timeDiff} hours ago`

        }else{

          timeDiff=Math.floor(timeDiff/24);

          if(timeDiff<30){
            return `${timeDiff} days ago`
          }else{
            timeDiff =Math.floor(timeDiff/30);

            if(timeDiff<12){
              return `${timeDiff} month ago`
            }else{

              return " more than years"
            }

          }
        }
      }
    }
  }

//function for post tweets to database
  let inputText="";
  $(".new-tweet textarea").keyup(function(){
    inputText = this.value;
  })

  $( ".new-tweet form" ).on( "submit", function( event ) {
      event.preventDefault();

      if(inputText.length>140){

        alert("Toooo much words!\n Only record up to 140 chars");

      }else if(!(/\w+/.test(inputText))){

        alert("Please write your tweet!");

      }else{

        const data = `text=${encodeURIComponent(inputText)}`;

        $( ".new-tweet" ).toggleClass("new-tweet-hide");
        $("textarea").val("");
        $(".counter").text("140");

        $.post("http://localhost:8080/tweets",data)
         .done(loadTweets);
         inputText="";
      }

    });

  // function for load all tweets
  function loadTweets(){

  $.get("http://localhost:8080/tweets", (data)=>{

    renderTweets(data);
  })
  .done(function() {
    console.log( "get success" );
  })
  .fail(function() {
    alert( "error" );
  });

  }

  // function for compose button to hide new tweets and scroll to top of window
  $( "#nav-bar button" ).click(function() {
  $( ".new-tweet" ).toggleClass("new-tweet-hide");
  $("textarea").select();
  window.scrollTo( 0, 0 );
  loadTweets();
});

  loadTweets();

  // renderTweets(tweets);
  console.log("app.js ready");

});



