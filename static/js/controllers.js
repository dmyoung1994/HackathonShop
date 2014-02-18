var windowWidth = window.innerWidth;
var mouseDownX = 0;
var mouseUpX = 0;
var mouseDownY = 0;
var mouseUpY = 0;

// Defaults to SF
var userLat = 37.7868019;
var userLong = -122.39385070000002;
var locString = "lat="+userLat+"&long="+userLong;
var dataString = "";

var numberOfProducts = 0;

var stack = "";

function SetValues() {
	return [window.event.clientX, window.event.clientY];
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert("Geolocation must be enabled to use this application.");
		location.reload();
	}
}

function showPosition(position) {
	userLat = position.coords.latitude;
	userLong = position.coords.longitude;
}

$(document).ready(function() {
	$('#slide-menu').css('left', -windowWidth);
	$('#slide-menu-add').css('left', -windowWidth);
	$('#slide-menu-fav').css('right', -windowWidth);
	$('.modal').fadeIn('slow');
	$('.overlay').fadeIn('slow');
	getLocation();
	$('.next').click(function(){
		var keywords = "";
		$('.selected').each(function(){
			keywords += $(this).text().trim() + ",";
		});
		keywords = keywords.substring(0, keywords.lastIndexOf(","));
		dataString = "key="+keywords;
		$.ajax({
			type: 'GET',
			url: '/add',
			data: dataString
		}).done(function(){
			$('.modal').fadeOut('slow');
			$('.overlay').fadeOut('slow');
			getLocation();
			locString = "lat="+userLat+"&long="+userLong;
			$('.spinner').fadeIn('fast');
			$.ajax({
				type: 'GET',
				url: '/products',
				data: locString
			}).done(function(data){
				var JSONdata = JSON.parse(data);
				var products = JSONdata["RetailigenceSearchResult"]['results'];
				numberOfProducts = products.length;
				if(numberOfProducts === 0){
					alert("No products found, please try again later");
					$('.spinner').fadeOut();
					return;
				}
				for (var i = 0; i < products.length; i++) {
					console.log(product);
					var product = products[i]['SearchResult'];
					var productImage = product['product']['images'][0]['ImageInfo']['link'];
					var productName = product['product']['name'];
					var productPrice = product['price'];
					var productDesc = product['product']['descriptionLong'];
					var productDist = new String(product['distance']['distance']).substring(0, 4);
					var productLocationName = product['location']['name'];
					var productLocationMap = product['location']['mapLink'];
					var productBuyUrl = product['product']['url'];
					var keywords = product['product']['productType'];
					var productID = product['location']['id'];
					var retailerID = product['product']['id'];
					var obj = encodeURIComponent("image="+productImage+"&name="+productName+"&buyUrl="+productBuyUrl+"&keywords="+keywords+"&productID="+productID+"&retailerID="+retailerID);
					var imageTag = "<li price='$" + productPrice + "' desc='" + productDesc + "' obj='" + obj + "' dist='" + productDist + " miles'" + "  buyURL='" + productBuyUrl + "'>" + "<div class='imageWrap'>" + "<img src='" + productImage + "'/>" + "</div><h5>" + productName + "</h5></li>";
					$('.elasticstack').append(imageTag);
					$('.spinner').fadeOut('fast');
				}
				new ElastiStack(document.getElementById('elasticstack'));
				$.ajax({
					type: "GET",
					url: "/keywords"
				}).done(function(data){
					console.log(data);
					$('.listContainer', '#interests').html("");
					var JSONdata = JSON.parse(data);
					console.log(JSONdata);
					var keywords = JSONdata['keywords'];
					for(var i=0; i<keywords.length; i++){
						var newItem = "<div class='listItem'>"+keywords[i]+"</div>";
						$('.listContainer', '#interests').append(newItem);
					}
				});
				$.ajax({
					type: "GET",
					url: "/fav"
				}).done(function(data){
					$('.listContainer', '#favs').html("");
						var JSONdata = JSON.parse(data);
						var favourites = JSONdata['favs'];
						for(var i=0;i<favourites.length;i++){
							var productName = favourites[i]['product']['name'];
							var productImage = favourites[i]['product']['images'][0]['ImageInfo']['link'];
							var buyUrl = favourites[i]['product']['url'];
							var newItem = "<div class='listItem'><img class='favImg' src='"+productImage+"'><div class='favProdName'>"+productName+"</div><a class='modalButton blue' href='"+buyUrl+"'>Buy Now</a></div>";
							$('.listContainer', '#favs').append(newItem);
						}
				});
			});
		});
	});
	
	
	
	$('.first').mousedown(function() {
		mouseDown = SetValues();
		mouseDownX = mouseDown[0];
		mouseDownY = mouseDown[1];
	});
	$('.modalButton').click(function() {
		$(this).removeClass('modalButton');
		$(this).removeClass('blue');
		$(this).addClass('modalButtonSelected');
		$(this).addClass('blueSelected');
		$(this).addClass('selected');
	});
	$('.done').click(function() {
		$('.productDetail').fadeOut();
	});
	$('#img').click(function() {
		$('.productDetail').fadeOut();
	});
	$('.first').mouseup(function() {
		mouseUp = SetValues();
		mouseUpX = mouseUp[0];
		mouseUpY = mouseUp[1];
		var deltaY = mouseDownY - mouseUpY;
		var deltaX = mouseDownX - mouseUpX;
		if (deltaX > 70) {
			numberOfProducts--;
			dataString = "object=" + $('.first').attr('obj');
			$.ajax({
				type: 'POST',
				url: '/dislike',
				data: dataString
			});
			$('.first').removeClass('first');
			if(numberOfProducts === 0){
				$('.elasticstack').html('');
				getLocation();
				locString = "lat="+userLat+"&long="+userLong;
				$('.spinner').fadeIn('fast');
				$.ajax({
					type: 'GET',
					url: '/products',
					data: locString
				}).done(function(data){
					var JSONdata = JSON.parse(data);
					var products = JSONdata["RetailigenceSearchResult"]["results"];
					numberOfProducts = products.length;
					for (var i = 0; i < products.length; i++) {
						var product = products[i]['SearchResult'];
						var productImage = product['product']['images'][0]['ImageInfo']['link'];
						var productName = product['product']['name'];
						var productPrice = product['price'];
						var productDesc = product['product']['descriptionLong'];
						var productDist = new String(product['distance']['distance']).substring(0, 4);
						var productLocationName = product['location']['name'];
						var productLocationMap = product['location']['mapLink'];
						var productBuyUrl = product['product']['url'];
						var keywords = product['product']['productType'];
						var productID = product['location']['id'];
						var retailerID = product['product']['id'];
						var obj = encodeURIComponent("image="+productImage+"&name="+productName+"&buyUrl="+productBuyUrl+"&keywords="+keywords+"&productID="+productID+"&retailerID="+retailerID);
						var imageTag = "<li price='$" + productPrice + "' desc='" + productDesc + "' obj='" + obj + "' dist='" + productDist + " miles'" + "  buyURL='" + productBuyUrl + "'>" + "<div class='imageWrap'>" + "<img src='" + productImage + "'/>" + "</div><h5>" + productName + "</h5></li>";
						$('.elasticstack').append(imageTag);
						$('.spinner').fadeOut('fast');
					}
					stack = new ElastiStack(document.getElementById('elasticstack'));
					$.ajax({
						type: "GET",
						url: "/keywords"
					}).done(function(data){
						$('.listContainer', '#interests').html("");
						var JSONdata = JSON.parse(data);
						console.log(JSONdata);
						var keywords = JSONdata['keywords'];
						for(var i=0; i<keywords.length; i++){
							var newItem = "<div class='listItem'>"+keywords[i]+"</div>";
							$('.listContainer', '#interests').append(newItem);
						}
					});
					$.ajax({
						type: "GET",
						url: "/fav"
					}).done(function(data){
						$('.listContainer', '#favs').html("");
						var JSONdata = JSON.parse(data);
						var favourites = JSONdata['favs'];
						for(var i=0;i<favourites.length;i++){
							var productName = favourites[i]['product']['name'];
							var productImage = favourites[i]['product']['images'][0]['ImageInfo']['link'];
							var buyUrl = favourites[i]['product']['url'];
							var newItem = "<div class='listItem'><img class='favImg' src='"+productImage+"'><div class='favProdName'>"+productName+"</div><a class='modalButton blue' href='"+buyUrl+"' target='_blank'>Buy Now</a></div>";
							$('.listContainer', '#favs').append(newItem);
						}
					});
				});
			} 
		} else if (deltaX < -70) {
			numberOfProducts--;
			dataString = "object=" + $('.first').attr('obj');
			console.log(dataString);
			$.ajax({
				type: 'POST',
				url: '/like',
				data: dataString
			});
			$('.first').removeClass('first');
			if(numberOfProducts === 0){
				$('.elasticstack').html('');
				getLocation();
				locString = "lat="+userLat+"&long="+userLong;
				$('.spinner').fadeIn('fast');
				$.ajax({
					type: 'GET',
					url: '/products',
					data: locString
				}).done(function(data){
					var JSONdata = JSON.parse(data);
					var products = JSONdata["RetailigenceSearchResult"]["results"];
					numberOfProducts = products.length;
					for (var i = 0; i < products.length; i++) {
						var product = products[i]['SearchResult'];
						var productImage = product['product']['images'][0]['ImageInfo']['link'];
						var productName = product['product']['name'];
						var productPrice = product['price'];
						var productDesc = product['product']['descriptionLong'];
						var productDist = new String(product['distance']['distance']).substring(0, 4);
						var productLocationName = product['location']['name'];
						var productLocationMap = product['location']['mapLink'];
						var productBuyUrl = product['product']['url'];
						var keywords = product['product']['productType'];
						var productID = product['location']['id'];
						var retailerID = product['product']['id'];
						var obj = encodeURIComponent("image="+productImage+"&name="+productName+"&buyUrl="+productBuyUrl+"&keywords="+keywords+"&productID="+productID+"&retailerID="+retailerID);
						var imageTag = "<li price='$" + productPrice + "' desc='" + productDesc + "' obj='" + obj + "' dist='" + productDist + " miles'" + "  buyURL='" + productBuyUrl + "'>" + "<div class='imageWrap'>" + "<img src='" + productImage + "'/>" + "</div><h5>" + productName + "</h5></li>";
						$('.elasticstack').append(imageTag);
						$('.spinner').fadeOut('fast');
					}
					stack = new ElastiStack(document.getElementById('elasticstack'));
					$.ajax({
						type: "GET",
						url: "/keywords"
					}).done(function(data){
						$('.listContainer', '#interests').html("");
						var JSONdata = JSON.parse(data);
						console.log(JSONdata);
						var keywords = JSONdata['keywords'];
						for(var i=0; i<keywords.length; i++){
							var newItem = "<div class='listItem'>"+keywords[i]+"</div>";
							$('.listContainer', '#interests').append(newItem);
						}
					});
					$.ajax({
						type: "GET",
						url: "/fav"
					}).done(function(data){
						$('.listContainer', '#favs').html("");
						var JSONdata = JSON.parse(data);
						var favourites = JSONdata['favs'];
						for(var i=0;i<favourites.length;i++){
							var productName = favourites[i]['product']['name'];
							var productImage = favourites[i]['product']['images'][0]['ImageInfo']['link'];
							var buyUrl = favourites[i]['product']['url'];
							var newItem = "<div class='listItem'><img class='favImg' src='"+productImage+"'><div class='favProdName'>"+productName+"</div><a class='modalButton blue' href='"+buyUrl+"' target='_blank'>Buy Now</a></div>";
							$('.listContainer', '#favs').append(newItem);
						}
					});
				});
			} 
		} else if (deltaX < 20 && deltaY < 20) {
			if($('.first img').attr('src') !== undefined){
				var $form = $('.productFooter');
				var price = $('.first').attr('price');
				var desc = $('.first').attr('desc');
				var dist = $('.first').attr('dist');
				var image = $('img', '.first').attr('src');
				var buyUrl = $('.first').attr('buyURL');
				$('#price', $form).html(price);
				$('#desc', $form).html(desc);
				$('#dist', $form).html(dist);
				$('#img').attr('src', image);
				$('.buyButton').attr('href', buyUrl);
				$('.productDetail').fadeIn();
			} else {
				return;
			}
		}
	});
	
	$('.cats').click(function(){
		$('#slide-menu').animate({
			left: 0,
			easing:"easeInOutCubic"
		},500);
	});
	
	$('.back').click(function(){
		var page = "#" + $(this).parent().parent().attr('id');
		console.log(page);
		if(page === '#slide-menu' || page === '#slide-menu-add'){
			$(page).animate({
				left: -windowWidth,
				easing:"easeInOutCubic"
			},500);
		} else {
			$(page).animate({
				right: -windowWidth,
				easing:"easeInOutCubic"
			},500);
		}
	});
	
	$('.add').click(function(){
		$('#slide-menu').animate({
			left: 0,
			easing:"easeInOutCubic"
		},500);
		$('#slide-menu-add').animate({
			left: 0,
			easing:"easeInOutCubic"
		},500);
	});
	
	$('.favs').click(function(){
		$('#slide-menu-fav').animate({
			right: 0,
			easing:"easeInOutCubic"
		},500);
	});
});