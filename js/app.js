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

          if (reddit.data.url.search("jpg") != -1 || reddit.data.url.search("png") != -1 || reddit.data.url.search("jpeg") != -1 || reddit.data.url.search("gif") != -1)
          {
            $("section#pics").append('<a href="'+reddit.data.url+'" target="_blank"><img src="'+reddit.data.url+'"></a>');
          }
        }
      });


    }).success(function(){
      var pic_container = $("#pics");
      var images = $(pic_container).find("a img");
      $(images).hide();
      var amount_images = images.length;
      var count = 0;

      $(".amount_of_pics").html(amount_images);

      $(images).each(function(i){
        var image = $(i);

        $("img").load(function() {
          count++;

          if( count === amount_images ){
            $(images).show();
            $(pic_container).montage({
              margin: 0,
              fillLastRow: true,
              alternateHeight: true,
              alternateHeightRange: {
                min: 300,
                max: 500
              }
            });
          }
        });

      });
    });

  });