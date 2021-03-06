function stateInfo(state) {
  var queryURL =
    "https://api.covidtracking.com/v1/states/" + state + "/current.json";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Creating an object for Covid results
    var results = $("#covidResults");

    // Creating a card for all the results, setting h5 rows for each pulled detail of covid information
    results.html(`  <div class="card-content white-text">
    <span class="card-title">COVID-19 INFO for ${localStorage
      .getItem("lastState")
      .toUpperCase()}</span>
    <p>
      <h5 class="hospCurrent">Hospitalized Currently: ${
        response.hospitalizedCurrently
      }</h3><hr>
      <h5 class="hospIncrease">Hospitalized Increase: ${
        response.hospitalizedIncrease
      }</h3><hr>
      <h5 class="deathTotal">Deaths: ${response.death}</h3><hr>
      <h5 class="deathIncrease">Deaths Increase: ${
        response.deathIncrease
      }</h3><hr>
    </p>
  </div>


  <div class="infoLink card-action">
    <a href="https://graphics.reuters.com/world-coronavirus-tracker-and-maps/">Reuters Covid Map</a><hr>
    <a href="https://www.naccho.org/membership/lhd-directory">National Association of County and City Health Officials (NACCHO)</a>
  </div>`);
  });
}
// Create an event function for locally storing all the displayed state info
function displayStateInfo(event) {
  // Prevent default action on browser
  event.preventDefault();

  // Creating variable for state data and appending to local storage
  var state = $(event.target).data("state");
  localStorage.setItem("lastState", state);

  stateInfo(state);
}

// Function to empty out the articles
function clear() {
  $("#article-section").empty();
}

if (localStorage.getItem("lastState") === null) {
  localStorage.setItem("lastState", "ca");
}

$(".stateBtn").on("click", displayStateInfo);
stateInfo(localStorage.getItem("lastState"));
