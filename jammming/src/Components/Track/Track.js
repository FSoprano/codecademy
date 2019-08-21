import React from 'react';
import './Track.css';

class Track extends React.Component {
    renderAction () {
        let isRemoval = false;
        if (isRemoval) {
            return('-');
        } else {
            return('+');
        }
    }
    render() {
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{/* track name will go here */ }</h3>
                    <p>{/* track artist will go here |  track album will go here */}</p>
                </div>
            <button className="Track-action">{this.props.renderAction}</button>
            </div>
        );
    }; 
}


export default Track;