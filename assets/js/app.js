var subjectList = [
  "weimaraner",
  "bulldog",
  "german shepherd",
  "pitbull"
];

function getGifs() {
  // This is our API key. Add your own API key between the ""
  var APIKey = "48p9WSmf5XX57GxiAKzy7Pe25QX89pBV";

  // Here we are building the URL we need to query the database
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key="+ APIKey + "&limit=5";

   $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    console.log(queryURL);
    for (var key in response) {
      
    }
  });
}

function clearButtons() {

} 

function createButton() {
  var divElement = $('#buttons');
  var buttonElement = $('<button>');
  buttonElement.attr("data-to-do", subject);
  buttonElement.addClass('buttons');
  pElement = pElement.prepend(buttonElement);

} 

function addButton() {

}



