function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

function getRedditPics(reddits, limit, after) {
  $.getJSON("http://www.reddit.com/r/"+reddits+".json?limit="+limit+"&after="+after+"&jsonp=?", function(json){
    addPicsToDOM(json);
  });
}

function addPicsToDOM(redditJSON) {
  $("body").attr("data-after", redditJSON.data.after);
  var pagenr = parseFloat($("body").attr("data-iteration")) + 1;
  $.each(redditJSON.data.children,function(i,reddit){

       if (reddit.data.is_self === false && reddit.data.thumbnail != "" ) {

          if (reddit.data.url.search("jpg") != -1 || reddit.data.url.search("png") != -1 || reddit.data.url.search("jpeg") != -1)
          {
            $("section#pics").append('<a href="'+reddit.data.url+'" class="picture nr'+pagenr+'" target="_blank"><img src="'+reddit.data.url+'"></a>');
          }
        }
      });
      $("#pics").imagesLoaded(function(){
        $("#pics").masonry('reload');
        $(".amount_of_pics").html($("#pics").find(".picture").length);
      });
}

function morePics(){
  getRedditPics($("body").attr("data-reddits"), 20, $("body").attr("data-after"));
}

$(document).ready(function(){
  var reddits = getUrlVars().reddits;

  $("body").attr({
    "data-reddits": reddits,
    "data-iteration": 0}
    );

  $("#pics").masonry({itemSelector: '.picture'});

  getRedditPics($("body").attr("data-reddits"), 20, "");


});