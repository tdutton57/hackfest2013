$(document).ready(function(){
	$("#searchForm").submit(function (e){
		e.preventDefault();
		$('#searchButton').click(); 
		return false;
	});
});

var htmlData;

var urlSearch = function(){
	var site = $(".btn-info.active").val();
	var query = $("#search_query").val();
	switch(site){
		case "C++":
			var path = "https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&rsz=filtered_cse&num=10&hl=en&prettyPrint=false&source=gcsc&gss=.com&sig=351077565dad05b6847b1f7d41e36949&cx=000747561938282180878:lrfgxurgbda&q="+query+"%20more%3Areference&googlehost=www.google.com&callback=google.search.Search.apiary6884&nocache=1373338200246"; 
			break;
		case "Jquery":
			var path ="getURL?search=http://api.jquery.com/?s="+query;
			break;
		case "JavaScript":
			var path = "getURL?search=http://google.com/search?q="+query+"+domain:http://w3schools.com/js";
			break;
		case "PHP":
			var path = "getURL?search=http://google.com/search?q="+query+"+domain:http://php.net/manual";
			break;
	}
	$.ajax({
        type: 'GET',
        url: path, 
        complete: function (data) {
			var text = data.responseText;
			console.log(site);
			if (site=="C++"){
				$(".modal-body").html("<h2>No results found!</h2>");
				var rx = new RegExp("//[ \\t\\r\\n]*API callback[ \\t\\r\\n]*google.search.Search.apiary[0-9]*\\(");
				var rx2 = new RegExp("\\);[ \\t\\r\\n]*$");
				var res = text.replace(rx, "");
				var res = res.replace(rx2, "");

				var jsonObject=$.parseJSON(res);
				var dataUrl = jsonObject.results[0].clicktrackUrl;
				console.log("getURL?search="+encodeURIComponent(dataUrl));
				$.ajax({ 
	        		type: 'GET', 
	        		url: "getURL?search="+dataUrl, 
	        		complete: function(data){
	        			console.log(data);
	        			htmlData = $(data.responseText);
	        			console.log(htmlData);
						$(".modal-body").html(htmlData);
						finalResult = $('.modal-body > div.c').find('a').attr("href").replace('/url?q=','').replace(new RegExp("\\&.*"), "");	
						$(".modal-body").html(finalResult);
						$(".modal-body").load("getURL?search="+finalResult+" .C_doc");
					}
				});
			}
			else if (site=="Jquery"){
				$(".modal-body").html("<h2>No results found!</h2>");
				$("#temp-content").remove();
				$('body').append($("<div id='temp-content' style='display:none;'></div>"));
				$("#temp-content").html($(data.responseText));
				var dataUrl = $("#temp-content").find("article").first().find("h3.r > a").attr("href");
				$(".modal-body").load("getURL?search="+dataUrl+" .entry-content")
			}
			else if(site=="JavaScript" || site=="PHP") {
				$(".modal-body").html("<h2>No results found!</h2>");
				$("#temp-content").remove();
				console.log(text);
				htmlData = text;
				$('body').append($("<div id='temp-content' style='display:none;'></div>"));
				var rx = new RegExp(/<script[^>]*>/g);
				$("#temp-content").html($(data.responseText.replace(rx, "")));
				var dataUrl = $("#temp-content").find("#ires > ol > li.g > h3.r > a").first().attr("href");
				dataUrl = dataUrl.replace("/url?q=", "");
				console.log(dataUrl);
				if (site=="JavaScript"){
					$(".modal-body").load("getURL?search="+dataUrl+" #main");
				} else if (site=="PHP"){
					dataUrl = dataUrl.replace(/\&sa\=.*/, "")
					$(".modal-body").load("getURL?search="+dataUrl+" .refentry");
				}
			}
		}
    });
}