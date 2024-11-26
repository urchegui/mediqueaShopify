const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: './.env.local' });

const API_KEY = process.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.VITE_CHANNEL_ID;
const YOUTUBE_URL = 'https://www.youtube.com/embed/';
const maxResults = 50;

async function fetchYouTubeVideos() {
  let videoList = [];
  let nextPageToken = '';

  try {
    do {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&pageToken=${nextPageToken}`
      );

      const items = response.data.items;
      nextPageToken = response.data.nextPageToken || '';  

      items.forEach((item) => {
        if (item.id.videoId) {
          const videoId = item.id.videoId;
          const videoUrl = `${YOUTUBE_URL}${videoId}`;
          videoList.push({ url: videoUrl });
        }
      });
    } while (nextPageToken);

    return videoList;
  } catch (error) {
    console.error('Error al obtener los videos:', error);
  }
}

async function generateYouTubeJSON() {
  const videos = await fetchYouTubeVideos();

  const jsonOutput = {
    youtubeIframes: videos,
  };

  // Ruta al archivo JSON en la misma carpeta que el script
  const filePath = path.join(__dirname, 'youtubeVideos.json');

  // Guardar el JSON en un archivo
  fs.writeFileSync(filePath, JSON.stringify(jsonOutput, null, 2), 'utf-8');

  console.log('Archivo JSON generado con éxito en la ruta:', filePath);
}

generateYouTubeJSON();
