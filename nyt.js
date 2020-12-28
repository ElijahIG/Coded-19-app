function buildQueryURL() {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    var queryParams = { "api-key": "d3DcdsSIIubZCkNBLtJbq37LBCUHRBud" };
    return queryURL + $.param(queryParams);
  }
  function updatePage(Data) {
    var numArticles = $("#article-count").val();
    for (var i = 0; i < numArticles; i++) {
      var article = Data.response.docs[i];
      console.log(article);
      var articlesP = $("<p>");
      var headline = article.headline;
      var ListItem = $("<li>");
      if (headline && headline.main) {
        ListItem.append("<h3>Headline:</h3> " + "<strong>" + headline.main + "</strong>");
      }
      var leadParagraph = article.lead_paragraph;
      if (leadParagraph && article.lead_paragraph) {
        ListItem.append("<p><strong>Lead-Paragraph:</strong> " + article.lead_paragraph + "</p>");
      }
      var snippet = article.snippet;
      if (snippet) {
        ListItem.append("<p><strong>Snippet:</strong> " + snippet + "</p>");
      }
      var byline = article.byline;
      if (byline && byline.original) {
        ListItem.append("<h4>" + byline.original + "</h4>");
      }
      var source = article.source;
      if (source) {
        ListItem.append("<h5>Source: " + source + "</h5>");
      }
      var section = article.section_name;
      if (section) {
        ListItem.append("<h5>Section: " + section + "</h5>");
      }
      ListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
      articlesP.append(ListItem);
      $("#article-section").append(articlesP);
    }
  }
  function clear() {
    $("#article-section").empty();
  }
  $("#run-search").on("click", function(event) {
    event.preventDefault();
    clear();
    var queryURL = buildQueryURL();
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(updatePage);
  });
  $("#clear-all").on("click", clear);