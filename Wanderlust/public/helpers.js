const createVenueHTML = (name, location, iconSource, photos) => {
  return `<h2>${name}</h2>
  <img class="venueimage" src="${iconSource}"/>
<img class="venueimage" src="${photos}"/>
  <h3>Address:</h3>
	
  <p>${location.address} (Ecke ${location.crossStreet})</p>
  <p>${location.postalCode} ${location.city}</p>
  <p>${location.country}</p>`;
}

const createWeatherHTML = (currentDay) => {
  return `<h2> High: ${currentDay.day.maxtemp_c} C</h2>
    <h2> Low: ${currentDay.day.mintemp_c} C</h2>
 <h2> Avg. humidity: ${currentDay.day.avghumidity} %</h2>
    <img src="https://${currentDay.day.condition.icon}" class="weathericon" />
    <h2>${weekDays[(new Date(currentDay.date)).getDay()]}</h2>`;
}