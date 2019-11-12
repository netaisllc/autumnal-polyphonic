// Return the smallest distance from collection, but
// ignoring zero.
export const closestNeighbor = (distances) => {
	if (distances && distances.length > 0) {
		const result = distances.filter((dist) => dist > 0);
		if (result && result.length > 0) {
			const min = result.reduce((a, b) => Math.min(a, b));
			return min;
		}
		return 0;
	}
	return 0;
};

// Accept a Map and a Property and attach a map marker
// using the Property lat/long and title.
export const dropMarker = (map, property, popup) => {
	const location = {
		lat: property.coordinates[1],
		lng: property.coordinates[0],
	};
	const marker = new google.maps.Marker({
		map: map,
		position: location,
		title: property.address,
	});
	return marker;
};

// Get properties near a location (lat/lng)
export const getProperty = async (lat, lng, rad) => {
	const r = rad || 150000;
	const res = await fetch(`http://localhost:3000/property?latitude=${lat}&longitude=${lng}&radius=${r}`);
	const properties = await res.json();

	console.info('Properties', properties, properties.length);

	return properties;
};

// Create an InfoWindow object w/o content
export const makeInfoWindow = () => {
	const infoWindow = new google.maps.InfoWindow({
		content: null,
	});
	return infoWindow;
};

// Develop InfoWindow content for a specific property
export const makeInfoWindowContent = (property) => {
	const contentString =
		`<h3>${property.address}</h3>` +
		`<hr class="padded"/>` +
		`<p class="info">Latitude/Longitude: <span>${property.coordinates[1]}, ${property.coordinates[0]}</span>` +
		`<p class="info padded">Estimated value: <span>${property.estimatedValue}</span></p>` +
		`<p class="info padded">Closest building: <span>${closestNeighbor(property.buildingDistances)}</span></p>` +
		`<p class="info">Parcel area: <span>${property.parcelArea}</span></p>` +
		`<p class="info padded">Zone density: <span>${property.zoneDensity}</span></p>`;
	return contentString;
};

// Remove from map every marker in the collection
export const removeMarker = (markers) => {
	if (markers.length > 0) {
		markers.forEach((marker) => {
			marker.setMap(null);
		});
	}
	return true;
};
