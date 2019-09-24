import React from 'react';

import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import { tsConstructorType } from '@babel/types';

class App extends React.Component {

    
constructor(props) {
    super(props);
    this.state = {searchResults: {},
                  playlistName: 'blubber',
                  playlistTracks: {}};
    this.setState({searchResults: SearchResults}) ;

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
          }
    }

    removeTrack(track) {
        if (this.state.playlistTracks.filter(track.id) !== -1) {
            this.setState({playlistTracks: this.state.playlistTracks.splice(track, 1)});
        }
    }

    render() {
    return (
        <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
        <SearchBar />
        <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
        </div>
    </div>
    </div>
    );
    }
}

export default App;