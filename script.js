$("#find-state").on("click", function (event) {
  event.preventDefault();

  var state = $("#state-input").val();

  var queryURL =
    "https://api.covidtracking.com/v1/states/" + state + "/current.json";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#state-view").text(JSON.stringify(response, null, 2));
  });
});
