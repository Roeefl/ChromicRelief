/*
  This function loads the image from imgSrc into the thumbnail img in the display frame,
  Also sets the title to comicTitle
*/
function loadImage(imgSrc, comicTitle, fadeMs) {
  $(".display #thumbnail").fadeOut(fadeMs, function() {
      $(this).attr('src', imgSrc);
      $(this).css('width', '100%');
      $(this).css('height', '100%');
      $(this).attr('alt', comicTitle);
      // $(".display #thumbnail").css("transform", urlSpec["scaleImage"]);
  }).fadeIn(fadeMs);
}

/*
  This function receives a set of parsing attributes from xmlParseAttributes found in xmlParseAttributes.js
  and returns a full http path of the comic image to be displayed in the UI.

  Input:  urlSpec - a JSON object containing parsing data for the specific web comic required to parse
          randomComic - boolean indicating whether to retrieve a random comic or the latest one
*/
function parseComic(urlSpec, comicTitle, randomComic, fadeMS) {
  // Init new XHR object to get data from webpage
  var xhr = new XMLHttpRequest();

    // Prepare the onreadystatechange function for when the request is sent
	xhr.onreadystatechange = function() {
  		if (xhr.readyState == 4) {
  			responseText = xhr.responseText;
  			parsedResponse = jQuery.parseHTML(responseText);

        urlSpecImageAttribute = "imgElement";
        if (randomComic) {
          urlSpecImageAttribute = "randomImgElement";
        }

        imageSrc = $(parsedResponse).find(urlSpec[urlSpecImageAttribute]).attr('src');
  			fullSrc = urlSpec["preStr"] + imageSrc;
        console.log('@parsing.js @comicParser > fullSrc: ' + fullSrc);

        loadImage(fullSrc, comicTitle, fadeMS);
  		}
	}

	//    xhr.responseType = "document";
  getUrl = urlSpec["url"];
  if (randomComic) {
    getUrl = urlSpec["randomUrl"];
  }
 
  xhr.open("GET", getUrl, true);	
	xhr.send();
}

$(document).ready( function() {
  $(".display").hide();

	$(".iconic-button").click(function() {
    btnId = this.id;
    btnTitle = this.title;

    $("#pure-button-grid").hide();
    $(".display").data('data-displayed-id', btnId);
    $(".display").show();
    $("#content-title").text(btnTitle);

    parseComic(xmlParseAttributes[btnId], btnTitle, false, 500);
  });

  $("#back-to-grid").click(function() {
    $(".display #thumbnail").attr('src', 'images/gear.svg');
    $(".display #thumbnail").css('width', '');
    $(".display #thumbnail").css('height', '');
    $(".display").hide();
    $("#pure-button-grid").show();
    $("#content-title").text('All');
  });

  $("#retrieve-random").click(function(url) {
    var currentId = $(".display").data('data-displayed-id');
    var currentTitle = $("#content-title").text();

    parseComic(xmlParseAttributes[currentId], currentTitle, true, 250);
  });

  var thumbnail = document.getElementById('thumbnail');

  thumbnail.onclick = function(){
    if ( $(thumbnail).attr('src') != 'images/gear.svg') {
      var modal = document.getElementById('modal');
      var overlay = document.getElementById("overlay");
      var caption = document.getElementById("caption");

      modal.style.display = "block";
      overlay.src = this.src;
      caption.innerHTML = this.alt;
    }
  }

  // Get the <span> element that closes the modal
  var closeModal = document.getElementById('closeModal');

  // When the user clicks on <span> (x), close the modal
  closeModal.onclick = function() { 
    var modal = document.getElementById('modal');
    modal.style.display = "none";
  }
});