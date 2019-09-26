const clientID = process.env.CLIENT_ID;
const redirectURI = 'http://localhost:3000';
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

    async search(term) {
        const searchTerm = term;
        const urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
        const accessToken = this.getAccessToken();
        const headers = {
            headers: {Authorization: `Bearer ${accessToken}`}
        }
        try {
            const response = await fetch(urlToFetch, headers);
            if(response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);

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
        }
        catch(error) {
            console.log(error);
        }
    }
}

export default Spotify;