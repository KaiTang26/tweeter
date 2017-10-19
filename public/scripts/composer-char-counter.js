$( document ).ready(function() {
  const count=140;

  $(".new-tweet textarea").keyup(function(){
    const numberOfSpace=count-Number(this.value.length);

    const counterColor =$(this).siblings(".counter").text(numberOfSpace);

    counterColor.toggleClass("red", numberOfSpace<0);


  // $(".new-tweet input").click(function(){

  //   $( ".new-tweet" ).toggleClass("new-tweet-hide");
  //   $("textarea").val("");
  //   $(".counter").val("140");

  // })

  });
    console.log( "ready!" );
});



