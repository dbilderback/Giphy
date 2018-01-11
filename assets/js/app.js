//Array for the initial gif subjects
var subjectList = [
  "weimaraner",
  "bulldog",
  "german shepherd",
  "pitbull"
];
//Function to initialize the application
function startApp() {
  //Read the sub array and call the function to create the buttons
  for (var i =0; i < subjectList.length; i++) {
    createButton(subjectList[i]);
  }
  //Associate an event to the Submit button and cancel the default event
  $("#addDog").on("click", function(event) {
    event.preventDefault();
    //Validate the user input to insure something was typed 
    if ($('#dogInput').val().trim() == "") {
      alert("Dog name can not be blank")
    } else {
      //Get the input value and pass it to the function to create another button
      var newDog = $('#dogInput').val().trim();
      createButton(newDog);  
    }
    //Clear the input field
    $('#dogInput').val("");
  });
}
//The purpose of this function is to create all the subject buttons
function createButton(subject) {
  //Create a button element and data attribute with the subject info
  var divElement = $('#buttonsContainer');
  var buttonElement = $('<button>');
  buttonElement.attr('data-subject', subject);
  buttonElement.attr('type', 'button')
  buttonElement.addClass('button');
  buttonElement.append(subject);
  //Append each new button to the button container
  divElement = divElement.append(buttonElement);
  //Call the function to set events on all the subject buttons
  setButtonEvents();
  
} 

function getGifs(subject) {
  // This is the API key for Giphy
  var APIKey = "48p9WSmf5XX57GxiAKzy7Pe25QX89pBV";

  // Here we are building the URL we need to query the database
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key="+ APIKey + "&limit=10";
  //Ajax call to get the response object
  $.ajax({
    url: queryURL,
    method: "GET"
    //done promise to pass the response object to function to build the gif display and associate the events
  }).done(function(response) {
    displayGifs(response);
    setImageEvents();
    //fail promise to deal with unknown exceptions
  }).fail(function (jqXHR, textStatus) {
    alert('The request for your subject failed please try another button');
  });
}
//The purpose of this function is to build HTML to display the gifs returned in the response object
function displayGifs(response) {
  //Clear the containing HTML element
  $('#gifsContainer').empty();
  //Setup iteration through the response object
  //Get the values for the still image, gif, title and rating
  for (var key in response.data) {
    var imageUrl = response.data[key].images.fixed_height_small_still.url;
    var gifUrl = response.data[key].images.fixed_height_small.url;
    var imgTitle = response.data[key].title;
    var gifDiv = $("<div class='gifs'");
    var rating = response.data[key].rating;
    var p = $("<p>").text("Rating: " + rating);
    //Build the image element to incluse the still image as the src
    //set the still and gif url to data elements and current state
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
//The purpose of this function is to associate and event to the subject buttons
//then call the function to get the gifs
function setButtonEvents() {
  $("button").on("click", function() {
    var subject = $(this).attr("data-subject");
    getGifs(subject);
    
  });
}
//The purpose of this function is associate an event to the document's images
//The promise is used to "play" and "stop" the gif animation by checking the check and swapping the 
//corresponding data attribute with the image src
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
