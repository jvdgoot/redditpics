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
  $.each(redditJSON.data.children,function(i,reddit){

       if (reddit.data.is_self === false && reddit.data.thumbnail != "" ) {

          if (reddit.data.url.search("jpg") != -1 || reddit.data.url.search("png") != -1 || reddit.data.url.search("jpeg") != -1)
          {
            var picThumbnail = reddit.data.url;

            if (reddit.data.domain == "i.imgur.com")
            {
              var fileExtensionDot = picThumbnail.lastIndexOf(".");
              var picPath = picThumbnail.substr(0,fileExtensionDot)+"l";
              var picExtension = picThumbnail.substr(fileExtensionDot);
              picThumbnail = picPath+picExtension;
            }

            $("section#pics").append('<a href="'+reddit.data.url+'" class="picture" target="_blank"><img src="'+picThumbnail+'"></a>');
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

  $("body").attr("data-reddits", reddits);

  $("#pics").masonry({itemSelector: '.picture', isResizable: true});

  getRedditPics($("body").attr("data-reddits"), 20, "");

  $(window).resize(function(){
    $("#pics").masonry('reload');
  });


});
