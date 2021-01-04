function buildQueryURL() {

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  
    var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };
  
    queryParams.q = $("#search-term").val().trim();
  
    return queryURL + $.param(queryParams);
  }
  
  function updatePage(NYTData) {
  
    var numArticles = $("#article-count").val();
  
    for (var i = 0; i < numArticles; i++) {

        var article = NYTData.response.docs[i];
  
      var articleCount = i + 1;
  
      var $articleList = $("<ul>");
      $articleList.addClass("list-group");
  
      $("#article-section").append($articleList);
  
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
  
      var snippet = article.snippet;
      if (snippet) {
        $articleListItem.append(
          "<h6><strong>Snippet:</strong> " + article.snippet + "</h6>"
        );
      }
  
      var section = article.section_name;
      if (section) {
        $articleListItem.append(
          "<h6><strong>Section:</strong> " + section + "</h6>"
        );
      }
  
      var pubDate = article.pub_date;
      if (pubDate) {
        $articleListItem.append(
          "<h6><strong>Publish Date:</strong> " + article.pub_date + "</h6>"
        );
      }
  
      $articleListItem.append(
        "<a href='" + article.web_url + "'>" + article.web_url + "</a>"
      );
  
      $articleList.append($articleListItem);
    }
  }

$("#run-search").on("click", function (event) {
    event.preventDefault();
  
    clear();
  
    var queryURL = buildQueryURL();
  
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(updatePage);
  });
  