import React from 'react';
// import ReactDOM from 'react-dom';


import './Business.css';




class Business extends React.Component {
    
   
    
    render() { 
        const { business } = this.props;
        console.log(business);
        const loc = `https://www.google.com/maps/place/${business.address}, ${business.city}`;
        return (
        <div className="Business">
  <div className="image-container">
    <p><a href={business.url} rel="noopener noreferrer" target="_blank"><img src={business.imageSrc} alt ="" /></a></p>
  </div>
  <h2>{business.name}</h2>
  <div className="Business-information">
    <div className="Business-address">
      <p><a href={loc} target="_blank" rel="noopener noreferrer">{business.address}</a></p>
      <p>{business.city}</p>
      <p>{business.state} {business.zipCode}</p>
    </div>
    <div className="Business-reviews">
      <h3>{business.category}</h3>
      <h3 className="rating">{business.rating} stars</h3>
      <p>{business.reviewCount}</p>
    </div>
  </div>
</div>
    
)}}
        
export default Business;