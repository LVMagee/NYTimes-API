// Area for varibles
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
authKey + "&q=";

var articleCounter = 0;

// Area for functions

function runQuery(numArticles, queryURL) {

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(NYTData) {

		for (var i = 0; i < numArticles; i++) {
			articleCounter++;

			var wellSection = $("<div>");
			wellSection.addClass("well");
			wellSection.attr("id", "article-well-" + articleCounter);
			$("#well-section").append(wellSection);

			if (NYTData.response.docs[i].headline !== "null") {
				$("#article-well-" + articleCounter)
				.append(
					"<h3 class='articleHeadline'><span class='label label-primary'>" +
					articleCounter + "</span><strong> " +
					NYTData.response.docs[i].headline.main + "</strong></h3>"
					);
			}

			if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
				$("#article-well-" + articleCounter)
				.append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
			}

			$("#articleWell-" + articleCounter)
			.append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
			$("#articleWell-" + articleCounter)
			.append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
			$("#articleWell-" + articleCounter)
			.append(
				"<a href='" + NYTData.response.docs[i].web_url + "'>" +
				NYTData.response.docs[i].web_url + "</a>"
				);
		}
	});
}

// Area for Methods

$("#run-search").on("click", function(event) {
	event.preventDefault();
	articleCounter = 0;

	$("#well-section").empty();


	searchTerm = $("#search-term").val().trim();
	var queryURL = queryURLBase + searchTerm;

	numResults = $("#num-records-select").val();


	startYear = $("#start-year").val().trim();

	endYear = $("#end-year").val().trim();

	if (parseInt(startYear)) {
		queryURL = queryURL + "&begin_date=" + startYear + "0101";
	}


	if (parseInt(endYear)) {
		queryURL = queryURL + "&end_date=" + endYear + "0101";
	}

	runQuery(numResults, queryURL);
});


$("#clear-all").on("click", function() {
	articleCounter = 0;
	$("#search-term").empty();
	$("#well-section").empty();

});


