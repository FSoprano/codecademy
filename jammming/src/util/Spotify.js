const clientID = '';
const redirectURI = 'http://localhost:3000/'
// const redirectURI = 'https://blubgrub.surge.sh/';
let accessToken;

const Spotify = {
    
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1]; //1st expression in parentheses
            const expiresIn = Number(expiresInMatch[1]);
            // The following code clears the parameters, and allows us to grab a new 
            // access token when the previous token has expired:
            window.setTimeout(() => accessToken='', expiresIn * 1000);
            // No curly braces needed if on one line!
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL; 
        }
    },

    search(term) {
        const urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        const accessToken = Spotify.getAccessToken();
        // const headers = {
        //     headers: {Authorization: `Bearer ${accessToken}`}
        // };

        return fetch(urlToFetch, {headers: 
            {Authorization: `Bearer ${accessToken}`}}
            ).then(response => response.json()).then(
                jsonResponse => {
                    if (!jsonResponse.tracks) {
                        return [];
                    }
                    return jsonResponse.tracks.items.map(track => (
                                     {
                                    id: track.id,
                                    name: track.name,
                                    artists: track.artists[0].name,
                                    album: track.album.name,
                                    uri: track.uri
                                    }
                    ));
                }
            );

        // try {
        //     const response = await fetch(urlToFetch, headers);
        //     if(response.ok) {
        //         const jsonResponse = await response.json();
        //         console.log(jsonResponse);

        //         if (!jsonResponse.tracks) {
        //             return [];
        //         }

        //         return jsonResponse.tracks.items.map(track => (
        //             {
        //             id: track.id,
        //             name: track.name,
        //             artists: track.artists[0].name,
        //             album: track.album.name,
        //             uri: track.uri
        //             }
        //         ));
        //     }
        // }
        // catch(error) {
        //     console.log(error);
        // }
    },

    savePlayList(name, trackURIs) {

        if (!name || ! trackURIs.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userID;

        return fetch(`https://api.spotify.com/v1/me`, {headers: headers}).then(
            response => response.json()).then(
                jsonResponse => {
                    userID = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, 
                    {headers: headers,
                    method: 'POST',
                    body: JSON.stringify({name: name})
                    });
                }
            ).then(response => response.json()).then(
                jsonResponse => {
                    const playlistID = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, 
                    {headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackURIs})
                    });
                }
            );
    }
    // async savePlaylist(playlistName, trackURIs) {

    //     const accessToken = this.getAccessToken();
    //     const headers = {
    //         headers: {Authorization: `Bearer ${accessToken}`}
    //     };
    //     let userID;
    //     const urlToFetch = `https://api.spotify.com/v1/me`;
    //     if (!(playlistName && trackURIs)) {
    //         return;
    //     }

    //     try {
    //         const response = await fetch(urlToFetch, {headers: headers});
    //         if(response.ok) {
    //             const jsonResponse = await response.json();
    //             console.log(jsonResponse);

    //             userID = jsonResponse.id;
    //             const urlToSave = `https://api.spotify.com/v1/users/${userID}/playlists`;
    //             const resp = await fetch(urlToSave, {headers: headers,
    //                                      method: 'POST',
    //                                      body: JSON.stringify({name: playlistName})
    //                                     }
    //                         );
    //             if (resp.ok) {
    //                 const jsonResp = await resp.json();
    //                 const playlistID = jsonResp.id;
    //                 const urlToSavePlaylist = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
    //                 await fetch(urlToSavePlaylist, {headers: headers,
    //                                                             method: 'POST',
    //                                                             uris: trackURIs}); 
    //             }
                
                
    //         }
    //     }
    //     catch(error) {
    //         console.log(error);
    //     }
    // }
}

export default Spotify;