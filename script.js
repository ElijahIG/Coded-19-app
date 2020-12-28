function stateInfo(state) {
  var queryURL =
    "https://api.covidtracking.com/v1/states/" + state + "/current.json";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // Creating a div to hold the movie
    var results = $("#covidResults");
    results.html(`  <div class="card-content white-text">
    <span class="card-title">COVID-19 INFO</span>
    <p>
      <h5 class="hospCurrent">Hospitalized Currently: ${response.hospitalizedCurrently}</h3><hr>
      <h5 class="hospIncrease">Hospitalized Increase: ${response.hospitalizedIncrease}</h3><hr>
      <h5 class="deathTotal">Deaths: ${response.death}</h3><hr>
      <h5 class="deathIncrease">Deaths Increase: ${response.deathIncrease}</h3><hr>
    </p>
  </div>
  <div class="infoLink card-action">
    <a href="https://graphics.reuters.com/world-coronavirus-tracker-and-maps/">Reuters Covid Map</a><hr>
    <a href="https://www.naccho.org/membership/lhd-directory">National Association of County and City Health Officials (NACCHO)</a>
  </div>`);
  });
}

function displayStateInfo(event) {
  event.preventDefault();
  // var state = $(this).attr("data-name");
  var state = $(event.target).data("state");
  localStorage.setItem("lastState", state);

  stateInfo(state);
}

$(".stateBtn").on("click", displayStateInfo);
stateInfo();
