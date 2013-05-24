function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

function updateMason() {
  $("#pics").imagesLoaded(function(){
    $("#pics").masonry('reload');
    $(".amount_of_pics").html($("#pics").find(".picture").length);
    $("a#more").show();
  });
}

function detectThumbnail(picDomain, picURL) {


  if (picDomain == "i.imgur.com") {
    var fileExtensionDot = picURL.lastIndexOf(".");
    var picPath = picURL.substr(0,fileExtensionDot)+"l";
    var picExtension = picURL.substr(fileExtensionDot);
    picThumbnail = picPath+picExtension;
  }
  // else if (picDomain.search("minus.com") != -1) {
  //   var fileExtensionDot = picURL.lastIndexOf(".");
  //   var picPath = picURL.substr(0,fileExtensionDot)+"_e";
  //   var picExtension = picURL.substr(fileExtensionDot);
  //   picThumbnail = picPath+picExtension;
  // }
  else {
    picThumbnail = picURL;
  }

  return picThumbnail;
}

function addPicsToDOM(redditJSON) {
  $("body").attr("data-after", redditJSON.data.after);

  $.each(redditJSON.data.children,function(i,reddit){

    if (reddit.data.is_self === false && reddit.data.thumbnail != "" ) {

      if (reddit.data.url.search("jpg") != -1 || reddit.data.url.search("png") != -1 || reddit.data.url.search("jpeg") != -1)
      {
        var picThumbnail = detectThumbnail(reddit.data.domain, reddit.data.url);

        $("section#pics").append('<a href="'+reddit.data.url+'" class="picture" target="_blank"><img src="'+picThumbnail+'"></a>');
      }
    }
  });

  updateMason();
}

function getRedditPics(reddits, limit, after) {
  $.getJSON("http://www.reddit.com/r/"+reddits+".json?limit="+limit+"&after="+after+"&jsonp=?", function(json){
    addPicsToDOM(json);
  });
}

function morePics(){
  $("a#more").hide();
  getRedditPics($("body").attr("data-reddits"), 20, $("body").attr("data-after"));
}