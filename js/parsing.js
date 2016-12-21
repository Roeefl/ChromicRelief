/* GLOBAL */
var catApiSrc = 'http://thecatapi.com/api/images/get?format=src&type=gif';

/*
  This function loads the image from imgSrc into the thumbnail img in the display frame,
  Also sets the title to comicTitle
*/
function loadImage(imgSrc, comicTitle, fadeMs) {
  $("#thumbnail").fadeOut(fadeMs, function() {
      $(this).attr('src', imgSrc);
      $(this).attr('alt', comicTitle);
      // $("#thumbnail").css("transform", urlSpec["scaleImage"]);
  }).fadeIn(fadeMs);
}

/* 
  Specific function to parse random comic from awkward zombie
*/
// function parseAwkwardZombie() {
//   var xhr = new XMLHttpRequest();

//   xhr.onreadystatechange = function() {
//     if (xhr.readyState == 4) {
//       responseText = xhr.responseText;
//       parsedResponse = jQuery.parseHTML(responseText);

//       var hhh = "#archive_table a:nth-child(300)";
//       var comicLink = $(parsedResponse).find(hhh);
//       alert(JSON.stringify(comicLink));
    
//     }
//   }

//   xhr.open("GET", "http://www.awkwardzombie.com/index.php?page=1", true);  
//   xhr.send();
// }

/*
  This function receives a set of parsing attributes from xmlParseAttributes found in xmlParseAttributes.js
  and returns a full http path of the comic image to be displayed in the UI.

  Input:  urlSpec - a JSON object containing parsing data for the specific web comic required to parse
          getRandom - boolean indicating whether to retrieve a random comic or the latest one
*/
function parseComic(urlSpec, comicTitle, getRandom, fadeMS) {
  // Init new XHR object to get data from webpage
  var xhr = new XMLHttpRequest();

    // Prepare the onreadystatechange function for when the request is sent
	xhr.onreadystatechange = function() {
  		if (xhr.readyState == 4) {
  			responseText = xhr.responseText;
  			parsedResponse = jQuery.parseHTML(responseText);

        urlSpecImageAttribute = "imgElement";
        if (getRandom) {
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
  if (getRandom) {
    getUrl = urlSpec["randomUrl"];
  }
 
  xhr.open("GET", getUrl, true);	
	xhr.send();
}

/*
  Just resets the Thumbnail back to loading
*/
function resetDisplay() {
  $("#thumbnail").attr('src', 'images/gear.svg');
  $("#thumbnail").css('width', '');
  $("#thumbnail").css('height', '');
  $("#overlay").attr('src', '');
}

/*
  UI transitions to show the main content panel with the button grid 
*/
function displayReliefGrid() {
  resetDisplay();

  $(".content-display").hide();
  $(".content-main").show();
  $("#content-title").text('All');
}

function isCatApi(str) {
  return (str == 'parse-thecatapi');
}

/*
  UI transitions to show the display panel with the comic thumbnail
*/
function displayRelief(btnId, btnTitle, getRandom, randomable) {
  resetDisplay();
  
  $(".content-main").hide();
  $("#content-title").text(btnTitle);
  $(".content-display").data('data-displayed-id', btnId);
  $(".content-display").show();
  $("#retrieve-random").prop('disabled', (!randomable) );

  if (isCatApi(btnId)) {
    loadImage(catApiSrc, btnTitle, 250);
  } else {
    parseComic(xmlParseAttributes[btnId], btnTitle, getRandom, 500);
  }
}

/*
  Picks a random relief, and displays a random-or-latest comic
*/
function displayRandomRelief() {
  // Select a random relief index
  var reliefCount = Object.keys(xmlParseAttributes).length;
  var randomIndex = Math.floor(Math.random() * reliefCount);
  
  var i = 0;
  var chosenParseObjId;
  
  // loop over all xml members and grab the one with the same index
  for (var parseObj in xmlParseAttributes) {
    if (i == randomIndex) {
      chosenParseObjId = parseObj;
        console.log('@parsing.js @displayRandomRelief > chosenRelief = ' + parseObj + ' at index ' + i);
      break;
    }
    i++;
  }

  // grab the title from the button with the same id as the parse object
  var btnRef = ('#' + chosenParseObjId);
  var reliefTitle = $(btnRef).attr('title');

  // get the retrieveRandom option from settings, but if the randomly selected relief does not offer the option
  // to parse a random comic, select latest one instead
  var getRandom = $("#cmn-toggle-1").is(':checked');
  var randomable = xmlParseAttributes[chosenParseObjId]['randomable'];

  if (!randomable) {
    getRandom = false;
  }

  // and finally, call displayRelief with the arguments
  displayRelief(chosenParseObjId , reliefTitle, getRandom, randomable);
}

/*
  parses random comic for the same comic as currently on display
*/
function displayRandomComicForCurrentRelief() {
  resetDisplay();

  var currentId = $(".content-display").data('data-displayed-id');
  var currentTitle = $("#content-title").text();

  if (isCatApi(currentId)) {
    loadImage(catApiSrc, currentTitle, 250);
  } else {
    parseComic(xmlParseAttributes[currentId], currentTitle, true, 250);
  }
}

$(document).ready( function() {

  $(".content-display").hide();

	$(".relief-button").each(function(index) {
    $(this).on('click', function() {
      var settingRetrieveRandom = $("#cmn-toggle-1").is(':checked');
      displayRelief(this.id, this.title, settingRetrieveRandom, xmlParseAttributes[this.id]['randomable']);
    });
  });

  $("#back-to-grid").click(function() {
    displayReliefGrid();
  });

  $("#retrieve-random").click(function() {
    displayRandomComicForCurrentRelief();
  });

  $("#hit-me").click(function() {
    displayRandomRelief();
  });

  var thumbnail = document.getElementById('thumbnail');
  thumbnail.onclick = function(){
    if ( $(thumbnail).attr('src') != 'images/gear.svg') {
      var modal = document.getElementById('display-modal');
      var overlay = document.getElementById("overlay");
      var caption = document.getElementById("caption");

      modal.style.display = "block";
      overlay.src = this.src;
      caption.innerHTML = this.alt;
    }
  }

  // Get the <span> element that closes the modal
  // When the user clicks on <span> (x), close the modal
  var closeModal = document.getElementById('modal-close');
  closeModal.onclick = function() { 
    var modal = document.getElementById('display-modal');
    modal.style.display = "none";
  }
});