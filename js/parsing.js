// Dictionary holding the data specs for all the websites
var urlSpecs = 	{
					"parse-explosm": {
                            "url": "http://explosm.net/",
                            "preStr": "http://",
                            "imageElement": "#featured-comic",
                            "scaleImage": "scale(1)"
                          },
          "parse-xkcd":   {
                            "url": "http://xkcd.com/",
                            "preStr": "http://",
                            "imageElement": "#comic img",
                            "scaleImage": "scale(1)"                            
                          },
          "parse-poorly": {
                            "url": "http://poorlydrawnlines.com/",
                            "preStr": "",
                            "imageElement": ".post img",
                            "scaleImage": "scale(1)"                            
                          },
          "parse-dirk":   {
                            "url": "http://www.dirksbigbunnies.com/",
                            "preStr": "",
                            "imageElement": ".cartoon:last",
                            "scaleImage": "scale(1)"                            
                          }
				};

function comicParser(urlSpec) {
  // Init new XHR object to get data from webpage
  var xhr = new XMLHttpRequest();

    // Prepare the onreadystatechange function for when the request is sent
	xhr.onreadystatechange = function() {
  		if (xhr.readyState == 4) {
  			responseText = xhr.responseText;
  			parsedResponse = jQuery.parseHTML(responseText);

        imageSrc = $(parsedResponse).find(urlSpec["imageElement"]).attr('src');;

  			fullSrc = urlSpec["preStr"] + imageSrc;

				$(".relief-container img").fadeOut(200, function() {
      		$(this).attr('src', fullSrc);
      		$(".relief-container img").css("transform", urlSpec["scaleImage"]);
    		}).fadeIn(200);
  		}
	}

	//    xhr.responseType = "document";
  xhr.open("GET", urlSpec["url"], true);	
	xhr.send();
}

$(document).ready( function() {
	$(".iconic-button").click(function() {
    comicParser(urlSpecs[this.id]);
  });
});