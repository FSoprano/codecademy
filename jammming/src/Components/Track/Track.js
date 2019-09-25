import React from 'react';
import './Track.css';
import TrackList from '../TrackList/TrackList';

class Track extends React.Component {

    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    renderAction () {
        let isRemoval = false;
        if (isRemoval) {
            return('-');
        } else {
            return(<div onClick={this.addTrack}>+</div>);
        }
    }
    addTrack(track) {
        this.props.onAdd = this.props.track;
    }
    removeTrack() {
        this.props.onRemove = this.props.track;
    }
    render() {
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
            <button className="Track-action">{this.props.renderAction}</button>
            </div>
        );
    }; 
}


export default Track;