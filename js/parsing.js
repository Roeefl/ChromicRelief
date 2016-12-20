// Dictionary holding the data specs for all the websites
var urlSpecs = 	{
					"parse-explosm": {
            "url": "http://explosm.net/",
            "preStr": "http:",
            "imageElement": "#featured-comic",
            "scaleImage": "scale(1)"
          },
          "parse-xkcd":   {
            "url": "http://xkcd.com/",
            "preStr": "http:",
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
          },
          "parse-geekandpoke":   {
            "url": "http://geek-and-poke.com/",
            "preStr": "",
            "imageElement": ".image-block-wrapper:first img",
            "scaleImage": "scale(1)"                            
          },
          "parse-awkwardzombie":   {
            "url": "http://www.awkwardzombie.com/",
            "preStr": "",
            "imageElement": "#comic img",
            "scaleImage": "scale(1)"                            
          },
          "parse-smbc":   {
            "url": "http://www.smbc-comics.com/index.php",
            "preStr": "",
            "imageElement": "#cc-comic",
            "scaleImage": "scale(1)"                            
          },
          "parse-incidental":   {
            "url": "http://www.incidentalcomics.com/",
            "preStr": "",
            "imageElement": ".separator:first a img",
            "scaleImage": "scale(1)"                            
          },
          "parse-awkwardyeti":   {
            "url": "http://theawkwardyeti.com/",
            "preStr": "",
            "imageElement": "#comic img",
            "scaleImage": "scale(1)"                            
          },
          "parse-doghouse":   {
            "url": "http://www.thedoghousediaries.com/",
            "preStr": "http://www.thedoghousediaries.com/",
            "imageElement": "#imgdiv img",
            "scaleImage": "scale(1)"                            
          },
          "parse-dailykitten": {
            "url": "http://dailykitten.com/",
            "preStr": "",
            "imageElement": ".wp-post-image:first",
            "scaleImage": "scale(1)"
          }
          // "parse-abtrusegoose":   {
          //                   "url": "http://abstrusegoose.com/",
          //                   "preStr": "",
          //                   "imageElement": "section",
          //                   "scaleImage": "scale(1)"                            
          // }
          // "parse-oatmeal": {
          //                   "url": "http://theoatmeal.com/feed/random/",
          //                   "preStr": "",
          //                   "imageElement": ".ghost img",
          //                   "scaleImage": "scale(1)"             
          // }
				};

function comicParser(urlSpec, ngTitle) {
  // Init new XHR object to get data from webpage
  var xhr = new XMLHttpRequest();

    // Prepare the onreadystatechange function for when the request is sent
	xhr.onreadystatechange = function() {
  		if (xhr.readyState == 4) {
  			responseText = xhr.responseText;
  			parsedResponse = jQuery.parseHTML(responseText);

        imageSrc = $(parsedResponse).find(urlSpec["imageElement"]).attr('src');;
        console.log('@parsing.js @comicParser > imageSrc: ' + imageSrc);

  			fullSrc = urlSpec["preStr"] + imageSrc;
        console.log('@parsing.js @comicParser > fullSrc: ' + fullSrc);

				$(".relief-container #thumbnail").fadeOut(200, function() {
      		$(this).attr('src', fullSrc);
          $(this).attr('alt', ngTitle);
      		$(".relief-container #thumbnail").css("transform", urlSpec["scaleImage"]);
    		}).fadeIn(200);

        $("#pure-button-grid").hide();
        $(".relief-container").show();
        $("#content-title").text(ngTitle);
  		}
	}

	//    xhr.responseType = "document";
  xhr.open("GET", urlSpec["url"], true);	
	xhr.send();
}

$(document).ready( function() {
  $(".relief-container").hide();

	$(".iconic-button").click(function() {
    comicParser(urlSpecs[this.id], this.title);
  });

  $("#back-to-grid").click(function() {
      $(".relief-container").hide();
      $("#pure-button-grid").show();
      $("#content-title").text('All');
  });
  
  var thumbnail = document.getElementById('thumbnail');

  thumbnail.onclick = function(){
    var modal = document.getElementById('modal');
    var overlay = document.getElementById("overlay");
    var caption = document.getElementById("caption");

    modal.style.display = "block";
    overlay.src = this.src;
    caption.innerHTML = this.alt;
  }

  // Get the <span> element that closes the modal
  var closeModal = document.getElementById('closeModal');

  // When the user clicks on <span> (x), close the modal
  closeModal.onclick = function() { 
    var modal = document.getElementById('modal');
    modal.style.display = "none";
  }
});