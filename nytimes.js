function buildQueryURL() {
  // Using queryURL to query API
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

  // Building an object to contain API call's query parameters and setting API key
  var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };

  // Grab text the user typed into the search input, add to the queryParams object
  queryParams.q = $("#search-term").val().trim();

  // Returning the query
  return queryURL + $.param(queryParams);
}

// Creating function for API data (JSON/Object), turning it into elements on page
function updatePage(NYTData) {
  // Get from the form the number of results to display, set limit
  var numArticles = $("#article-count").val();

  // Loop through and build elements for the defined number of articles
  for (var i = 0; i < numArticles; i++) {
    // Get specific article info for current index
    var article = NYTData.response.docs[i];

    // Increase the articleCount (track article # - starting at 1)
    var articleCount = i + 1;

    // Create the  list group to contain the articles and add the article content for each
    var $articleList = $("<ul>");
    $articleList.addClass("list-group");

    // Add the newly created element to the DOM
    $("#article-section").append($articleList);

    // If the article has a headline, log and append to $articleList
    var headline = article.headline;
    var $articleListItem = $("<li class='list-group-item articleHeadline'>");

    if (headline && headline.main) {
      $articleListItem.append(
        "<span class='label label-primary'>" +
          articleCount +
          "</span>" +
          "<strong> " +
          headline.main +
          "</strong>"
      );
    }

    // If the article has a byline, log and append to $articleList
    var byline = article.byline;

    if (byline && byline.original) {
      $articleListItem.append("<h6>" + byline.original + "</h6>");
    }

    var leadParagraph = article.lead_paragraph;
    if (leadParagraph && article.lead_paragraph) {
      $articleListItem.append(
        "<h6><strong>Lead Paragraph:</strong> " +
          article.lead_paragraph +
          "</h6>"
      );
    }

    // Log snippet and append to document
    var snippet = article.snippet;
    if (snippet) {
      $articleListItem.append(
        "<h6><strong>Snippet:</strong> " + article.snippet + "</h6>"
      );
    }

    // Log section, and append to document if exists
    var section = article.section_name;
    if (section) {
      $articleListItem.append(
        "<h6><strong>Section:</strong> " + section + "</h6>"
      );
    }

    // Log published date, ""
    var pubDate = article.pub_date;
    if (pubDate) {
      $articleListItem.append(
        "<h6><strong>Publish Date:</strong> " + article.pub_date + "</h6>"
      );
    }

    // Append and log url
    $articleListItem.append(
      "<a href='" + article.web_url + "'>" + article.web_url + "</a>"
    );

    // Append the article
    $articleList.append($articleListItem);
  }
}

// .on("click") function associated with the Search Button
$("#run-search").on("click", function (event) {
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  clear();

  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();

  // Creating the AJAX request to API getting JSON data at queryURL, create Ajax for passing data to updatePage function
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(updatePage);
});

// Function to empty out the articles
function clear() {
  $("#article-section").empty();
}

//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);
