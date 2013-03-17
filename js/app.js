$(document).ready(function(){

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
  }

    var urlParameters = getUrlVars(["reddits"]);




    $.getJSON("http://www.reddit.com/r/"+urlParameters.reddits+".json?limit=100&jsonp=?", function(json){


      $.each(json.data.children,function(i,reddit){

       if (reddit.data.is_self === false && reddit.data.thumbnail != "" ) {

        // console.log(reddit.data.url.search("jpg"));

          if (reddit.data.url.search("jpg") != -1 || reddit.data.url.search("png") != -1 || reddit.data.url.search("jpeg") != -1)
          {
            $("section#pics").append('<a href="'+reddit.data.url+'" class="picture" target="_blank"><img src="'+reddit.data.url+'"></a>');
          }
        }
      });


    }).success(function(){
        var container = $("#pics");
        var images = $(container).find(".picture");
        var images_count = images.length;
        $(".amount_of_pics").html(images_count);

        $("#pics").imagesLoaded(function(){
          $("#pics").masonry({
            itemSelector: '.picture'
          });
        });
    });

  });