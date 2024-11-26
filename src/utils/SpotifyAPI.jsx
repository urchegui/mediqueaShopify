const SpotifyAPI = async () => {
  const encodeToBase64 = btoa(
    `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`
  );

  const authOptions = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodeToBase64}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  };

  return await fetch('https://accounts.spotify.com/api/token', authOptions)
    .then(response => response.json())
    .then(result => {
      return result.access_token;
    })
    .catch(error => {
      console.error('Error fetching token:', error);
    });
};

const fetchWebApi = async (endpoint, season) => {
  let token = await SpotifyAPI();

  const response = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const spotiResponse = await response.json();

  return spotiResponse;

};

const getSeason = async (limit, offset, season) => {
  return await fetchWebApi(
    `v1/shows/1L4j1aGx0WHr4F39Ucg5Zz/episodes?limit=${limit}&offset=${offset}`,
    season
  );
};

export default getSeason;