const HousingURL = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";
var housingData = [];
function getHousingData(HousingURL){
    var data = $.get(HousingURL, function(){
        console.log(HousingURL)
    })
        .done( function(){
            //Success
            //console.log(data);
            housingData = data.responseJSON.data;
        })
        .fail( function(error){
            console.error(error);
        })
}

const MuseumsURL = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD";
var museumsData = [];
function getMuseumsData(MuseumsURL){
    var data = $.get(MuseumsURL, function(){
        console.log(MuseumsURL)
    })
        .done( function(){
            //Success
            //console.log(data);
            museumsData = data.responseJSON.data;
        })
        .fail( function(error){
            console.error(error);
        })
}

$(document).ready( function(){
    getHousingData(HousingURL);
    getMuseumsData(MuseumsURL);
})



function initMap(){
    //default
    //map options
    var options = {
        zoom:12,
        center: {lat:40.7291,lng:-73.9965}   //lat long New York (NYU Stern School of Business)
    }

    //New map Housing
    var map = new google.maps.Map(document.getElementById('map'),options);
    var marker = new google.maps.Marker({
        position:{lat:40.7291,lng:-73.9965},     //lat long NYU Stern School of Business
        icon: 'https://image.ibb.co/miG9Qy/black_graduation_cap_tool_of_university_student_for_head.png',
        map:map
    })

    document.getElementById("housing").addEventListener("click", function () {
        getHousingData(HousingURL)
        for (var w = 0; w < housingData.length; w++) {
            var latiHous = parseFloat(housingData[w][23]);
            var longiHous = parseFloat(housingData[w][24]);
            var marker = new google.maps.Marker({
                position:{lat:latiHous,lng:longiHous},     //lat long NYU Stern School of Business
                icon: 'https://image.ibb.co/kLjkyJ/home_1.png',
                map:map
            });
        }
    });

    document.getElementById("museums").addEventListener("click", function () {
        for (var a = 0; a < museumsData.length; a++) {
            var arrLong = museumsData[a][8].substr(7,19);
            var arrLat = museumsData[a][8].substr('26','45');
            var arrLati = arrLat.split(")");
            var longit = parseFloat(arrLong);
            var latit = parseFloat(arrLati[0]);
            var marker = new google.maps.Marker({
                position:{lat:latit,lng:longit},
                icon: 'https://image.ibb.co/kk39sd/bank.png',
                map:map
            });
        }
    })
    document.getElementById("districts").addEventListener("click", function () {
        map.data.loadGeoJson('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
        map.data.setStyle({
            fillColor: 'white',   //color poligono
            strokeWeight: 1,       //grosor borde
            strokeColor: 'grey'   //color borde
        });
        map.data.addListener('mouseover', function(event) {
            map.data.overrideStyle(event.feature, {fillColor: 'red'});
        });
        map.data.addListener('mouseout', function(event) {
            map.data.overrideStyle(event.feature, {fillColor: 'white'});
        });
    });
};

