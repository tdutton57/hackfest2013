var urlSearch = function(){
	console.log("test");
	$.ajax({ 
        type: 'GET', 
        url: "https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&rsz=filtered_cse&num=10&hl=en&prettyPrint=false&source=gcsc&gss=.com&sig=351077565dad05b6847b1f7d41e36949&cx=000747561938282180878:lrfgxurgbda&q=for%20more%3Areference&googlehost=www.google.com&callback=google.search.Search.apiary6884&nocache=1373338200246", 
        complete: function (data) { 
			var text = data.responseText;
			var rx = new RegExp("//[ \\t\\r\\n]*API callback[ \\t\\r\\n]*google.search.Search.apiary[0-9]*\\(");
			var rx2 = new RegExp("\\);[ \\t\\r\\n]*$");
			var res = text.replace(rx, "");
			var res = res.replace(rx2, "");
			var dataUrl = $.parseJSON(res).results[0].clicktrackUrl;
			$.ajax({ 
        		type: 'GET', 
        		url: dataUrl, 
        		complete: function(data){
					console.log(data);						
				}
			});
		}
    });
});


