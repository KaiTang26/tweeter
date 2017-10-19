/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweets =[
// {
// user: {
// name: "Johann von Goethe",
// avatars: {
// small: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
// regular: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
// large: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
// },
// handle: "@johann49"
// },
// content: {
// text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
// },
// created_at: 1461113796368
// },

// {
// user: {
// name: "Descartes",
// avatars: {
// small: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
// regular: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
// large: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
// },
// handle: "@rd"
// },
// content: {
// text: "Je pense , donc je suis"
// },
// created_at: 1461113959088
// },

// {
// user: {
// name: "Newton",
// avatars: {
// small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
// regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
// large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
// },
// handle: "@SirIsaac"
// },
// content: {
// text: " <script>alert('uh oh!');</script>  If I have seen further it is by standing on the shoulders of giants"
// },
// created_at: 1508320309188
// }
// ]


$(document).ready(function(){

  function renderTweets(tweets){

    tweets.forEach((tweet)=>{

      const $tweet=createTweetElement(tweet);

      $("#tweets").prepend($tweet);

      // $("#tweets").append($tweet);

    });

  }


  function createTweetElement(tweetData){

    let $tweet = $("<article> </article>").addClass("oldTweet");
    let $header = $("<header> </header>").html(`<img src=${tweetData.user.avatars.small}>`);

    let $headerSpan1 = $("<span> </span>").addClass("tweeterName").text(tweetData.user.name);

    let $headerSpan2 = $("<span> </span>").addClass("tweeterId").text(tweetData.user.handle);

    $header.append($headerSpan1).append($headerSpan2);

    const postTime = parseDate(tweetData.created_at);

    console.log(postTime);

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


  function parseDate(createdTime){

    const currentTime = new Date();
    let timeDiff = Math.floor((currentTime - createdTime)/1000);

    console.log(timeDiff);

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


  $( ".new-tweet form" ).on( "submit", function( event ) {
  event.preventDefault();

  let data = $( this ).serialize();

  if(data.length>145){

    data = data.slice(0,140);
    console.log(data.length);

    alert("Toooo much words!\n Only record up to 140 chars");
  }

  //[post]
  $.post("http://localhost:8080/tweets",data, loadTweets)
   .done(console.log("post success"));
  });



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

  $( "#nav-bar button" ).click(function() {
    console.log("haha")
  $( ".new-tweet" ).animate({ "#nav-bar button": "+=500px" }, "slow" );
});

  loadTweets();

  // renderTweets(tweets);
  console.log("app.js ready");

});



