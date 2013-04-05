
$(document).ready(function(){
  $("a#more").hide();

  var reddits = getUrlVars().reddits;

  $("body").attr("data-reddits", reddits);

  $("#pics").masonry({itemSelector: '.picture', isResizable: true});

  getRedditPics($("body").attr("data-reddits"), 20, "");

  $(window).resize(function(){
    $("#pics").masonry('reload');
  });


});
