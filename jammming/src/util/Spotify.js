const clientID = process.env.CLIENT_ID;
const redirectURI = 'http://localhost:3000';
let accessToken;

const Spotify = {
    
    const getAccessToken = () => {
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
    }
};

export default Spotify;