// Foursquare API Info
const clientId = '0JQDPHH4SKR11UM5WUSPOVEZWJZ4WRFNGC0ZI1PQ5EHJERSZ';
const clientSecret = 'SJ34IZJTYGEACKQDB5NJGHKUTDESU23K0TIHH5K1MJUN1KNS';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';



// APIXU Info
const apiKey = 'e8fc5731089c4a68812110642180911';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async() => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20181126`;
  try {
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      console.log(jsonResponse);
        const venues = jsonResponse.response.groups[0].items.map(parameter => parameter.venue);
       console.log(Array.isArray(venues));
       
       // console.log(venues);
       return venues;
        
    }
} 
  catch(error) {
    console.log(error);
  }
}

 const getPhotos = async(inp) => {
   try {
    const response =  await fetch (`https://api.foursquare.com/v2/venues/${inp}/photos?&client_id=${clientId}&client_secret=${clientSecret}&v=20181126`);
        
        if(response.ok){
      const jsonResponse = await response.json();
      // console.log(jsonResponse);
       
          let photoUrl = `https://fastly.4sqi.net/img/general/200x200${jsonResponse.response.photos.items[0].suffix}`;
         
          return photoUrl;
          
         
    }
   
   }
  catch(error) {
    console.log(error);
  }
   
}



const getForecast = async() => {
  
  const urlToFetch = `${forecastUrl}${apiKey}&q=${$input.val()}&days=4&hour=11`;
  
  try {
   const response = await fetch(urlToFetch);
   if(response.ok){
      const jsonResponse = await response.json();
      // console.log(jsonResponse);
     const days = jsonResponse.forecast.forecastday;
     
     return days;
   }
  }
  catch(error) {
    console.log(error);
  }

}


// Render functions
// Shuffle the venues array using the Fisher Yates
// shuffle:
const venueShuffle = function (venues) {

  for (let i= venues.length -1; i > 0; i--) {
    let idx = Math.floor(Math.random() * (i + 1));
    let tmp = venues[i];
    venues[i] = venues[idx];
    venues[idx] = tmp;
    };
return venues;
};


const renderVenues = (venues) => {
  // call venueShuffle to get a different, 
  // random order
  venueShuffle(venues);
  
  $venueDivs.forEach(async ($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    
    
    const venueIcon = venue.categories[0].icon;
    // console.log(venueIcon);
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
   
     let photos = await getPhotos(venue.id);
    console.log(photos);
   

    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc, photos);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (days) => {
  $weatherDivs.forEach(($day, index) => {
    // Add your code here:
    const currentDay = days[index];
    let weatherContent = createWeatherHTML(currentDay);
    $day.append(weatherContent);
  });
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
//
//  getPhotos().then(photos => // renderVenues(photos));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)
