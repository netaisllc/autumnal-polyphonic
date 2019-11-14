<script>
  import { onDestroy, onMount } from 'svelte'
  import { center, mapsLoaded, place, zoom } from '../store/stores';
  import { dropMarker, getProperty, makeInfoWindow, makeInfoWindowContent, removeMarker } from '../api/property'

  let address = $place
  let infoWindow
  let latitude
  let longitude
  let geocoder
  let mapElement
  let map 
  let markers = []
  let properties = []
  
   onDestroy( () => {
    removeMarker(markers)
    map = null
   })

  onMount( () => {
    // When Google Maps is loaded into window, that is recorded in app state.
		if ($mapsLoaded) {
      createMap()
    }
	});

  const createMap = async () => {
    const google = window['google'];
    map = await new google.maps.Map(mapElement, {
      center: $center,
      zoom: $zoom
    });
    geocoder = await new google.maps.Geocoder();
  }

  const geocodePlace = () => {
    let baseMap = map;

    const handleMarkers = async (results, status) => {
      if (status === 'OK') {
          latitude = results[0].geometry.location.lat()
          longitude = results[0].geometry.location.lng()
          // Move the map to the new location
          baseMap.setCenter(results[0].geometry.location)
          baseMap.setZoom(8)

          // Update state
          place.set(address)
          center.set(results[0].geometry.location)
          zoom.set(baseMap.getZoom())

          // Reset state
          removeMarker(markers)
          markers = []
          properties = []
          
          // Fetch any nearby properties
          properties = await getProperty(latitude, longitude)
          
          if (properties.length > 0 ) {             
            // Drop map marker per nearby property
            properties.forEach( property => {
              const m = dropMarker(baseMap, property)
              // Save markers so they can be removed
              if(m) markers.push(m);  
            });

            // Make a single info window
            infoWindow = makeInfoWindow()

            // Register click handler once per marker
            const google = window['google'];
            markers.forEach( (marker, i) => {
              google.maps.event.addListener(marker, 'click', function(e) {
                infoWindow.setContent( makeInfoWindowContent(properties[i]))
                infoWindow.open(map, this);
              })
            })
          }

      } else {
          alert('Geocoding failed for the following reason: ' + status);
      }
    }
  
    geocoder.geocode({'address': address}, handleMarkers);
  }

  // Make input field behave like a Form, enter=submit
  const handleKey = (e) => {
    if (e.key.toLowerCase().includes('enter')) {
      geocodePlace()
    }
  }
</script>

<style>
  .map-port{
    height: 100%;
    width: 100%;
  }

  #floating-panel {
        background-color: #FAFAFA;
        border-radius: 2px;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20);
        display: flex;
        font-family: 'Roboto','sans-serif';
        font-size: 14pt;
        height: 4rem;
        left: calc( 50vw - 10.5rem );
        padding: 5px;
        position: absolute;
        top: 7.4rem;
        width: 21rem;
  }
  #floating-panel input {
    border-radius: 4px;
    font-family: 'Roboto','sans-serif';
    font-size: 13pt;
    height: auto;
    padding: 4px;
    width: 15rem;
  }
  #floating-panel .btn {
    background-color: #323232;
    border: 4px solid #323232;
    border-radius: 2.5rem;;
    color: white;
    cursor: pointer;
    font-size: 10pt;
    font-weight: bold;
    line-height: 1.6rem;
    margin-left: 5px;
    outline: none;
    text-transform: uppercase;
    width: 6rem;
  }
</style>

<div class="map-port" bind:this={mapElement}></div>
<div id="floating-panel">
    <input id="address" bind:value={address} on:keypress={handleKey} type="textbox">
    <input class="btn" id="submit" on:click={geocodePlace} type="button" value="Go">
</div>
