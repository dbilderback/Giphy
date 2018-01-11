var subjectList = [
  "weimaraner",
  "bulldog",
  "german shepherd",
  "pitbull"
];

function startApp() {
  for (var i =0; i < subjectList.length; i++) {
    createButton(subjectList[i]);
  }

  $("#addDog").on("click", function(event) {
    event.preventDefault();
    if ($('#dogInput').val().trim() == "") {
      alert("Dog name can not be blank")
    } else {
      var newDog = $('#dogInput').val().trim();
      createButton(newDog);  
    }
    $('#dogInput').val("");
  });
}

function createButton(subject) {
  var divElement = $('#buttonsContainer');
  var buttonElement = $('<button>');
  buttonElement.attr('data-subject', subject);
  buttonElement.attr('type', 'button')
  buttonElement.addClass('button');
  buttonElement.append(subject);
  divElement = divElement.append(buttonElement);
  setButtonEvents();
  
} 

function getGifs(subject) {
  // This is our API key. Add your own API key between the ""
  var APIKey = "48p9WSmf5XX57GxiAKzy7Pe25QX89pBV";

  // Here we are building the URL we need to query the database
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key="+ APIKey + "&limit=10";

   $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    displayGifs(response);
    console.log(response);
    setImageEvents();
  });
}

function displayGifs(response) {
  $('#gifsContainer').empty();
  for (var key in response.data) {
    var imageUrl = response.data[key].images.fixed_height_small_still.url;
    var gifUrl = response.data[key].images.fixed_height_small.url;
    var imgTitle = response.data[key].title;
    var gifDiv = $("<div class='item col-md-4'>");
    var rating = response.data[key].rating;
    var p = $("<p>").text("Rating: " + rating);
    var imgElement = $('<img>');
    imgElement.attr("src", imageUrl);
    imgElement.attr("alt", imgTitle);
    imgElement.attr("class", "image");
    imgElement.attr("data-still", imageUrl); 
    imgElement.attr("data-animate", gifUrl); 
    imgElement.attr("data-state", "still");
    gifDiv.prepend(p);
    gifDiv.prepend(imgElement);
    $('#gifsContainer').append(gifDiv);
  }
}

function setButtonEvents() {
  $("button").on("click", function() {
    var subject = $(this).attr("data-subject");
    getGifs(subject);
    
  });
}

function setImageEvents() {
  $(document).off("click", ".image");
  $(document).on("click", ".image", function(){
      var state = $(this).attr('data-state');
      if ( state == 'still'){
          $(this).attr('src', $(this).data('animate'));
          $(this).attr('data-state', 'animate');
      }else{
          $(this).attr('src', $(this).data('still'));
          $(this).attr('data-state', 'still');
      }
  });
}
