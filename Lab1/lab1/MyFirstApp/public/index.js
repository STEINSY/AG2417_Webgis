
let map;

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const myLatlng = {lat: 59.34794987654037,lng: 18.072460303901465}

  map = new Map(document.getElementById("map"), {
    center: { lat: 59.34849, lng: 18.07176 },
    zoom: 12,
    center:myLatlng
  });
  map.data.loadGeoJson("data.geojson");


  const marker = new google.maps.Marker({
    position: myLatlng,
    map,
    title: "Click to zoom",
  });

  marker.addListener("click", () => {
    map.setZoom(18);
    map.setCenter(marker.getPosition());
  });
  
  map.data.addListener('mouseover', function(event) {
    document.getElementById('info-box').textContent = 
        event.feature.getProperty('Name');
  });


   // Color each letter gray. Change the color when the isColorful property
  // is set to true.
  map.data.setStyle((feature) => {
    let color = "gray";

    if (feature.getProperty("isColorful")) {
      color = feature.getProperty("color");
    }
    return /** @type {!google.maps.Data.StyleOptions} */ {
      fillColor: color,
      strokeColor: color,
      strokeWeight: 2,
    };
  });
  // When the user clicks, set 'isColorful', changing the color of the letters.
  map.data.addListener("click", (event) => {
    event.feature.setProperty("isColorful", true);
  });
};

initMap();