/**
 * Created by Shabbir on 4/16/2017.
 */
//Public Variables
var long = 0; //stores longitude value
var lat = 0; //stores latitude value
var  main, place , wind, wind_speed, weather_info, icon, title, description, temp, country;
var url = "http://openweathermap.org/img/w/";


getLocation();



/******************Function Definitions*******************/

function getDatafromJSON(jsonObj) {
    weather_info = jsonObj['weather'];
    country = jsonObj['sys'];
    country = country['country'];
    icon = weather_info[0]['icon'];
    icon += ".png";
    url += icon;
    title = weather_info[0]['main'];
    description = weather_info[0]['description'];
    place = jsonObj['name'];
    main = jsonObj['main'];
    wind = jsonObj['wind'];
    wind_speed = wind['speed'];
    temp = main['temp'];
    temp = temp-275; //converting Kalvin to degree Celcius
    temp = temp.toFixed(0);
}

function render(){

    $("#place").html(place + " , " + country);
    $("#temperature").html(temp + "&#8451");
    $("#description").html(description);
    $("#weatherIcon").html("<img src= "+url+">");
}




function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            CallApi(long,lat);
        });
    }
}

function CallApi(long, lat){
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="
        + long + "&appid=45923afd28277f058ece91425ebdbc7b"
        , function (response, status) {
            if(status == "success") {
                getDatafromJSON(response);
                render();
            }

            else if(status == "timeout"){
                alert("Something Wrong with the Connection")
                $("#weather").html("Low or No Connectivity...")
            }
    });
}




