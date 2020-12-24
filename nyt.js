
function buildQueryURL() {
  
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=" + apiKey;

  var apiKey = "d3DcdsSIIubZCkNBLtJbq37LBCUHRBud";


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function)(){


  }
}