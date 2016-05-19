$(document).ready(function() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      $("#position").html("Latitude: " + pos.lat + "<br>Longitude: " + pos.lng);

      $.get("http://api.openweathermap.org/data/2.5/weather?lat=" + pos.lat + "&lon=" + pos.lng + "&units=metric&APPID=e3fdad1363a208b345e5477413f7f431", function(info) {

        var currentdate = new Date();
        var dateMinute = currentdate.getMinutes();
        if (dateMinute < 10) {
          dateMinute = "0" + dateMinute;
        }
        var datetime = currentdate.getHours() + ":" + dateMinute;
        $("#time").html(datetime);

        var country = info.sys.country;
        var area = info.name;
        var weatherIcon = "http://openweathermap.org/img/w/" + info.weather[0].icon + ".png";
        var speed = info.wind.speed;
        var longitude = info.coord.lon;
        var latitude = info.coord.lat;

        var temp = info.main.temp;
        var temp_min = info.main.temp_min;
        var temp_max = info.main.temp_max;

        //$("#temperature").html("Temperature:");
        $("#temp").html(temp + " ºC");
        $("#temp_min").html(" " + temp_min);
        $("#temp_max").html("/ " + temp_max + " ºC");
        $("#address").html(area + ", " + country);

        $("#weather_icon").attr("src", weatherIcon);

        $("#condition").html(info.weather[0].description);

        if ($("#condition").is(":contains(Mist), :contains(mist), :contains(Fog), :contains(fog), :contains(Haze), :contains(haze)")) {
          $("#wrapper").css('background-image', 'URL("https://36.media.tumblr.com/4ad443484d23aee9865cfcf3e27a345a/tumblr_nv0vu3eXuC1s94qevo9_1280.jpg")');
          $("#wrapper").css('background-size', 'cover');
        }

        if ($("#condition").is(":contains(Rain), :contains(rain)")) {
          $("#wrapper").css('background-image', 'URL("https://40.media.tumblr.com/4c45c24ed1972af0572be859cb40b3a0/tumblr_nv0wggeyAn1s94qevo3_r1_1280.jpg")');
          $("#wrapper").css('background-size', 'cover');
        }

        if ($("#condition").is(":contains(Sun), :contains(sun)")) {
          $("#wrapper").css('background-image', 'URL("https://41.media.tumblr.com/1a065248d2a72134a31f0e35bf901006/tumblr_nv0vu3eXuC1s94qevo1_1280.jpg")');
          $("#wrapper").css('background-size', 'cover');

        }

        if ($("#condition").is(":contains(Snow), :contains(snow)")) {
          $("#wrapper").css('background-image', 'URL("https://41.media.tumblr.com/c784430f220c077f789ea7c162c97a2d/tumblr_nv0vu3eXuC1s94qevo6_1280.jpg")');
          $("#wrapper").css('background-size', 'cover');

        }

        if ($("#condition").is(" :contains(Clear), :contains(clear)")) {
          $("#wrapper").css('background-image', 'URL("https://41.media.tumblr.com/a45c03f738e6dc86656fd2a07777230d/tumblr_nv0vu3eXuC1s94qevo2_1280.jpg")');
          $("#wrapper").css('background-size', 'cover');
        }

        if ($("#condition").is(":contains(Cloud), :contains(cloud)")) {
          $("#wrapper").css('background-image', 'URL("http://41.media.tumblr.com/6e3c79df02ccec57e2819270f6ba7b93/tumblr_nvpb91KorI1s94qevo1_1280.jpg")');

          $("#wrapper").css('background-size', 'cover');

        }

        if ($("#condition").is(":contains(Thunder), :contains(thunder)")) {
          $("#wrapper").css('background-image', 'URL("http://thefabweb.com/wp-content/uploads/2012/08/1677790422_035cba3ab8_b.jpg")');
          $("#wrapper").css('background-size', 'cover');
        }

        if ($("#condition").is(" :contains(Broken Clouds), :contains(broken clouds)")) {
          $("#wrapper").css('background-image', 'URL("https://41.media.tumblr.com/deb86bf2c72a3410f59b756f85616476/tumblr_nv0vu3eXuC1s94qevo8_1280.jpg")');
          $("#wrapper").css('background-size', 'cover');
        }

        if ($("#condition").is(":contains(Drizzle), :contains(drizzle)")) {
          $("#wrapper").css('background-image', 'URL("https://40.media.tumblr.com/357a2b44eb38e52eb4dd9127633739b9/tumblr_nv0wggeyAn1s94qevo1_1280.jpg")');
          $("#wrapper").css('background-size', 'cover');
        }

        $("#winds").html(speed + " m/s Winds");

        $("#location").html("Weather Location: " + area + ", " + country);
        $("#coords").html("Coordinates: " + longitude + ", " + latitude);

        var convertToF = function(value) {
          var F = ((value * 1.8) + 32).toFixed(2);
          return F;
        }

        var convertToMPH = function(value) {
          var MPH = (value * 2.236936).toFixed(1);
          return MPH;
        }
        $("#converter").click(function() {
          if ($("span#temp_max").is(":contains('ºF')")) {
            $("#temp").html(temp + " ºC");
            $("#temp_min").html(temp_min);
            $("#temp_max").html("/ " + temp_max + " ºC");
            $("#winds").html(speed + " m/s Winds");

          } else {
            $("#temp").html(convertToF(temp) + " ºF");
            $("#temp_min").html(convertToF(temp_min));
            $("#temp_max").html("/ " + convertToF(temp_max) + " ºF");
            $("#winds").html(convertToMPH(speed) + " mph Winds");
          }
        });

      }, "jsonp");

      $.get("http://api.openweathermap.org/data/2.5/forecast?lat=" + pos.lat + "&lon=" + pos.lng + "&units=metric&APPID=e3fdad1363a208b345e5477413f7f431", function(info) {

        var temp_1 = info.list[0].main.temp;
        var temp_1_min = info.list[0].main.temp_min;
        var temp_1_max = info.list[0].main.temp_max;

        var temp_2 = info.list[1].main.temp;
        var temp_2_min = info.list[1].main.temp_min;
        var temp_2_max = info.list[1].main.temp_max;

        var temp_3 = info.list[2].main.temp;
        var temp_3_min = info.list[2].main.temp_min;
        var temp_3_max = info.list[2].main.temp_max;

        var temp_4 = info.list[3].main.temp;
        var temp_4_min = info.list[3].main.temp_min;
        var temp_4_max = info.list[3].main.temp_max;

        var temp_5 = info.list[4].main.temp;
        var temp_5_min = info.list[4].main.temp_min;
        var temp_5_max = info.list[4].main.temp_max;

        var temp_6 = info.list[5].main.temp;
        var temp_6_min = info.list[5].main.temp_min;
        var temp_6_max = info.list[5].main.temp_max;

        $("#child1 #time").html((info.list[0].dt_txt).substring(11, 16));
        $("#child1 #weather_icon").attr("src", "http://openweathermap.org/img/w/" + info.list[0].weather[0].icon + ".png");
        $("#child1 #temp").prepend(temp_1).append("C");
        $("#child1 #temp_min").prepend(temp_1_min);
        $("#child1 #temp_max").prepend(temp_1_max).append("C");
        $("#child1 #condition").html(info.list[0].weather[0].description);

        $("#child2 #time").html((info.list[1].dt_txt).substring(11, 16));
        $("#child2 #weather_icon").attr("src", "http://openweathermap.org/img/w/" + info.list[1].weather[0].icon + ".png");
        $("#child2 #temp").prepend(temp_2).append("C");
        $("#child2 #temp_min").prepend(temp_2_min);
        $("#child2 #temp_max").prepend(temp_2_max).append("C");
        $("#child2 #condition").html(info.list[1].weather[0].description);

        $("#child3 #time").prepend((info.list[2].dt_txt).substring(11, 16));
        $("#child3 #weather_icon").attr("src", "http://openweathermap.org/img/w/" + info.list[2].weather[0].icon + ".png");
        $("#child3 #temp").prepend(temp_3).append("C");
        $("#child3 #temp_min").prepend(temp_3_min);
        $("#child3 #temp_max").prepend(temp_3_max).append("C");
        $("#child3 #condition").html(info.list[2].weather[0].description);

        $("#child4 #time").prepend((info.list[3].dt_txt).substring(11, 16));
        $("#child4 #weather_icon").attr("src", "http://openweathermap.org/img/w/" + info.list[3].weather[0].icon + ".png");
        $("#child4 #temp").prepend(temp_4).append("C");
        $("#child4 #temp_min").prepend(temp_4_min);
        $("#child4 #temp_max").prepend(temp_4_max).append("C");
        $("#child4 #condition").html(info.list[3].weather[0].description);

        $("#child5 #time").prepend((info.list[4].dt_txt).substring(11, 16));
        $("#child5 #weather_icon").attr("src", "http://openweathermap.org/img/w/" + info.list[4].weather[0].icon + ".png");
        $("#child5 #temp").prepend(temp_5).append("C");
        $("#child5 #temp_min").prepend(temp_5_min);
        $("#child5 #temp_max").prepend(temp_5_max).append("C");
        $("#child5 #condition").html(info.list[4].weather[0].description);

        $("#child6 #time").prepend((info.list[5].dt_txt).substring(11, 16));
        $("#child6 #weather_icon").attr("src", "http://openweathermap.org/img/w/" + info.list[5].weather[0].icon + ".png");
        $("#child6 #temp").prepend(temp_6).append("C");
        $("#child6 #temp_min").prepend(temp_6_min);
        $("#child6 #temp_max").prepend(temp_6_max).append("C");
        $("#child6 #condition").html(info.list[5].weather[0].description);
        //$("#forecast_results").html(JSON.stringify(info, null, 4));

      })

    });
  } else {
    $("#condition_all").html("<p>Unable to retrieve your location</p>");
  }
  $("#refreshButton").click(function() {
    location = self.location;
  });
})
