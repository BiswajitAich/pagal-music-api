# Pagal Music API

Welcome to Pagal Music API, your go-to solution for accessing a vast collection of music tracks. This API provides endpoints for searching and retrieving music information based on various parameters.

## Features

- **Search Music**: Search for music tracks by providing keywords or specific parameters.
- **Retrieve Track Information**: Get detailed information about each track, including its name, singer, size, and image.

## Example Usage

### Search Music

#### Request￼Enter
https://pagal-music-api.vercel.app/search?id=pathan

#### Response

```json
[
  {
    "searchResult": {
      "1": {
        "songId": "kurte-pathani-mp3-song-download",
        "img": "https://www.pagalworld.com.cm//siteuploads/thumb/sft141/70114_1.jpg",
        "name": "Kurte Pathani",
        "singer": "Gunjazz",
        "size": "2.89 mb"
      },
      "2": {
        "songId": "jass-patwari-trend-mp3-song-download",
        "img": "https://www.pagalworld.com.cm//siteuploads/thumb/sft133/66161_1.jpg",
        "name": "Trend",
        "singer": "Jass Patwari, Gurlez Akhtar",
        "size": "3.18 mb"
      },
      ...
    }
  }
]

