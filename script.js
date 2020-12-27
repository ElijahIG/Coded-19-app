// $("#find-state").on("click", function (event) {
//   event.preventDefault();

//   var state = $("#state-input").val();

//   var queryURL =
//     "https://api.covidtracking.com/v1/states/" + state + "/current.json";

//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function (response) {
//     $("#state-view").text(JSON.stringify(response, null, 2));
//   });
// });

function displayStateInfo(event) {
  event.preventDefault();
  // var state = $(this).attr("data-name");
  var state = $("#state-input").val();
  var queryURL =
    "https://api.covidtracking.com/v1/states/" + state + "/current.json";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Creating a div to hold the movie
    var infoDiv = $("#state-view");

    // Storing the rating data
    var deaths = response.death;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Current Deaths: " + deaths);

    // Displaying the rating
    infoDiv.append(pOne);

    // Storing the release year
    var deathIncrease = response.deathIncrease;

    // Creating an element to hold the release year
    var pTwo = $("<p>").text("Deaths Increase: " + deathIncrease);

    // Displaying the release year
    infoDiv.append(pTwo);

    // Storing the hospitalized
    var hospitalized = response.hospitalizedCurrently;

    // Creating an element to hold the hospitalized
    var pThree = $("<p>").text("Hospitalized Currently: " + hospitalized);

    // Appending the hospitalized
    infoDiv.append(pThree);

    // Storing the hospitalized
    var hospitalizedIncrease = response.hospitalizedIncrease;

    // Creating an element to hold the hospitalized
    var pFour = $("<p>").text("Hospitalized Increase: " + hospitalizedIncrease);

    // Appending the hospitalized
    infoDiv.append(pFour);
    // Storing the hospitalized
    var positiveTests = response.positive;

    // Creating an element to hold the hospitalized
    var pFive = $("<p>").text("Positive Tests: " + positiveTests);

    // Appending the hospitalized
    infoDiv.append(pFive);
    // Storing the hospitalized
    var negativeTests = response.negative;

    // Creating an element to hold the hospitalized
    var pSix = $("<p>").text("Negative Tests: " + negativeTests);

    // Appending the hospitalized
    infoDiv.append(pSix);

    // // Retrieving the URL for the image
    // var imgURL = response.Poster;

    // // Creating an element to hold the image
    // var image = $("<img>").attr("src", imgURL);

    // // Appending the image
    // infoDiv.append(image);

    // Putting the entire movie above the previous movies
    // $("#movies-view").prepend(infoDiv);
  });
}
$(document).on("click", "#find-state", displayStateInfo);
