$(document).ready(function() {
$.get("http://ipinfo.io", function(response) {
  $("#ip").html("IP: " + response.ip);
  $("#address").html(response.city + ", " + response.region);

  var coordinates = response.loc.split(",");

  function showError(error) { /* Throws an error if the user doesn't allow the location */
    var errorMessages = {
      PERMISSION_DENIED: "User denied the request for geolocation.",
      POSITION_UNAVAILABLE: "Location information is unavailable.",
      TIMEOUT: "The request to get user location timed out.",
      UNKNOWN_ERROR: "An unknown error occurred."
    };
  }
  $.get("http://api.openweathermap.org/data/2.5/weather?lat=" + coordinates[0] + "&lon=" + coordinates[1], function(info) {

    var currentdate = new Date();
    var dateMinute = currentdate.getMinutes();
    if (dateMinute < 10) {
      dateMinute = "0" + dateMinute;
    }
    var datetime = currentdate.getHours() + ":" + dateMinute;
    $("#time").html(datetime);

    var country = info.sys.country;
    var area = info.name;
    var icon = "http://openweathermap.org/img/w/" + info.weather[0].icon + ".png";
    var speed = info.wind.speed;
    var longitude = info.coord.lon;
    var latitude = info.coord.lat;

    var temp = info.main.temp;
    var temp_min = info.main.temp_min;
    var temp_max = info.main.temp_max;
    var temp_c = (temp - 273.15).toFixed(2);
    var temp_min_c = (temp_min - 273.15).toFixed(2);
    var temp_max_c = (temp_max - 273.15).toFixed(2);
    var temp_f = ((temp * 1.8) - 459.67).toFixed(2);
    var temp_min_f = ((temp_min * 1.8) - 459.67).toFixed(2);
    var temp_max_f = ((temp_max * 1.8) - 459.67).toFixed(2);

    //$("#temperature").html("Temperature:");
    $("#temp").html(temp_c + " ºC");
    $("#temp_min").html(" " + temp_min_c);
    $("#temp_max").html("/ " + temp_max_c + " ºC");

    $("#condition").html(info.weather[0].description);
    $("#icon").html('<img src="' + icon + '" >');

    if ($("#condition").is(":contains(rain)")) {
      $("html").css('background-image', 'URL("https://40.media.tumblr.com/4c45c24ed1972af0572be859cb40b3a0/tumblr_nv0wggeyAn1s94qevo3_r1_1280.jpg")');
    } else if ($("#condition").is(":contains(sun)")) {
      $("html").css('background-image', 'URL("https://41.media.tumblr.com/1a065248d2a72134a31f0e35bf901006/tumblr_nv0vu3eXuC1s94qevo1_1280.jpg")');
    } else if ($("#condition").is(":contains(snow)")) {
      $("html").css('background-image', 'URL("https://41.media.tumblr.com/c784430f220c077f789ea7c162c97a2d/tumblr_nv0vu3eXuC1s94qevo6_1280.jpg")');
    } else if ($("#condition").is(":contains(clear)")) {
      $("html").css('background-image', 'URL("https://41.media.tumblr.com/a45c03f738e6dc86656fd2a07777230d/tumblr_nv0vu3eXuC1s94qevo2_1280.jpg")');
    } else if ($("#condition").is(":contains(cloud)")) {
      $("html").css('background-image', 'URL("https://41.media.tumblr.com/351a27a0340157af603296111514c694/tumblr_nv0vu3eXuC1s94qevo3_540.jpg")');
    } else if ($("#condition").is(":contains(thunder)")) {
      $("html").css('background-image', 'URL("http://thefabweb.com/wp-content/uploads/2012/08/1677790422_035cba3ab8_b.jpg")');
    } else if ($("#condition").is(":contains(broken clouds)")) {
      $("html").css('background-image', 'URL("https://41.media.tumblr.com/deb86bf2c72a3410f59b756f85616476/tumblr_nv0vu3eXuC1s94qevo8_1280.jpg")');
    } else if ($("#condition").is(":contains(mist)")) {
      $("html").css('background-image', 'URL("https://36.media.tumblr.com/4ad443484d23aee9865cfcf3e27a345a/tumblr_nv0vu3eXuC1s94qevo9_1280.jpg")');
    } else if ($("#condition").is(":contains(drizzle)")) {
      $("html").css('background-image', 'URL("https://40.media.tumblr.com/357a2b44eb38e52eb4dd9127633739b9/tumblr_nv0wggeyAn1s94qevo1_1280.jpg")');
    }

    $("#winds").html(speed + " m/s Winds");

    $("#location").html("Weather Location: " + area + ", " + country);
    $("#coords").html("Coordinates: " + longitude + ", " + latitude);

    $("#weatherInfo").html(JSON.stringify(info, null, 1));

    $("#details").html(JSON.stringify(response, null, 4));

    $("#converter").click(function() {
      if ($("span#temp_max").is(":contains('ºF')")) {
        $(this).addClass("celsius");
        $(this).removeClass("fahrenheit");
        $("#temp").html(temp_c + " ºC");
        $("#temp_min").html(temp_min_c);
        $("#temp_max").html("/ " + temp_max_c + " ºC");
      } else {
        $(this).removeClass("celsius");
        $(this).addClass("fahrenheit");
        $("#temp").html(temp_f + " ºF");
        $("#temp_min").html(temp_min_f);
        $("#temp_max").html("/ " + temp_max_f + " ºF");
      }
    });

  });
}, "jsonp");
  
  $("#email").click(function() {
    $("#hiddenEmail").toggle().css('visibility', 'visible');
  });
  
  $("#refreshButton").click(function() {
    location.href=location.href;
  })

});
