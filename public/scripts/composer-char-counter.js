$( document ).ready(function() {
  let count=140;

  $("textarea").keyup(function(){
    let numberOfSpace=count-Number(this.value.length);

    if(numberOfSpace<0){
      $(this).siblings(".counter").text(numberOfSpace).addClass("red");
    }else{
      $(this).siblings(".counter").text(numberOfSpace).removeClass("red");
    }

  });
    console.log( "ready!" );
});