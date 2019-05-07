import React, { Component } from 'react';

import './App.css';
import BusinessList from './components/BusinessList/BusinessList.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import Yelp from './util/Yelp.js';



/* const business = {
imageSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
  name: 'MarginOtto Pizzeria',
  address: '1010 Paddington Way',
  city: 'Flavortown',
  state: 'NY',
  zipCode: '10101',
  category: 'Italian',
  rating: 4.5,
  reviewCount: 90
};

This was used as a dummy entry for display purposes at the beginning; it was replaced with real data from Yelp.



const business_array = [business,
              business,
              business,
              business,
              business,
              business
                   ];

*/

class App extends Component {
    
  constructor(props) {
      super(props);
      this.state = {
          businesses: []
      };
      
      this.searchYelp = this.searchYelp.bind(this);
  }
    
  searchYelp(term,location,sortBy) {
      Yelp.searchYelp(term,location,sortBy).then(
        (businesses) => {
            this.setState(
                {
                    businesses: businesses
                }
            );
        });
  }
  render() { return (
    <div className="App">
      <h1>ravenous</h1>
      <SearchBar searchYelp={this.searchYelp} />
      <BusinessList businesses={this.state.businesses} /> 
    </div>
      );
  }
}

export default App;
