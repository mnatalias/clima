$(document).ready(function(){
    function recibirUbicacion () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(mostrarPosicion);  
        } else {
            $("#clima").html("Tu navegador no soporta geolocalización.");
        }
    };

    function mostrarPosicion(posicion) {
        
        var latitud = posicion.coords.latitude;    
        var longitud = posicion.coords.longitude;  
        var zonaHoraria;
        
        $.ajax ({
            url : "https://maps.googleapis.com/maps/api/timezone/json?location=" + latitud + "," + longitud + "&timestamp=1331161200&key=AIzaSyD5fPkdq8T60l9PtV4TpzXQsv5z3MhOcWI",
            type: "GET",
            dataType:'json',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json",
            }
        }).done(function(json){
            zonaHoraria = json.timeZoneId;
        });
        
        
        $.ajax ({
            url : "https://api.darksky.net/forecast/0ab11465fa0a790d5369594e969f836b/" + latitud + "," + longitud + "?lang=es",
            type: "GET",
            dataType:'jsonp',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json",
                "timezone": zonaHoraria
            }
        }).done(function(json){
            
            var jsonTempF = json.currently.temperature;
            var jsonSummary = json.currently.summary;
            var fahrenheit = Math.round(jsonTempF) + " °F";
            var celsius = Math.round((jsonTempF - 32) * (5/9)) + " °C";
            
            $("#tempC").text(celsius);
            $("#tempF").text(fahrenheit);

            $("#boton").click(function(){
                $(".toggle").toggle();
                $(".toggleD").toggle();
            });
            
            $("#clima").text(jsonSummary);
            switch (json.currently.icon) {
                case "clear-night":
                    $("body").addClass("clearNight");
                    $("#icono").addClass("ion-ios-moon-outline");
                    break;
                case "clear-day":
                    $("body").addClass("clearDay");
                    $("#icono").addClass("ion-ios-sunny-outline");
                    break;
                case "rain":
                    $("body").addClass("rain");
                    $("#icono").addClass("ion-ios-rainy-outline");
                    break;
                case "wind":
                    $("body").addClass("wind");
                    $("#icono").addClass("ion-leaf");
                    break;
                case "fog":
                    $("body").addClass("fog");
                    $("#icono").addClass("ion-android-cloud-circle");
                    break;
                case "cloudy":
                    $("body").addClass("cloudy");
                    $("#icono").addClass("ion-ios-cloudy-outline");
                    break;
                case "partly-cloudy-day":
                    $("body").addClass("partlyCloudyDay");
                    $("#icono").addClass("ion-ios-partlysunny-outline");
                    break;
                case "partly-cloudy-night":
                    $("body").addClass("partlyCloudyNight");
                    $("#icono").addClass("ion-ios-cloudy-night-outline");
                    break;
                default:
                    $("body").addClass("fondo");
                    break;
            }
        });
    };

    recibirUbicacion();
});