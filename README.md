# Pagal Music API

Welcome to Pagal Music API, your go-to solution for accessing a vast collection of music tracks. This API provides endpoints for searching and retrieving music information based on various parameters.

## Features

- **Search Music**: Search for music tracks by providing keywords or specific parameters.
- **Retrieve Track Information**: Get detailed information about each track, including its name, singer, size, and image.

## Example Usage

### Search Music

#### Request to search a song:
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
```
#### Request to get song details:
https://pagal-music-api.vercel.app/song?id=kurte-pathani-mp3-song-download

#### Response 
```json
{
  "img": "https://www.pagalworld.com.cm/siteuploads/thumb/sft141/70114_4.jpg",
  "title": "Kurte Pathani Song",
  "more": {
    "Category": "New Punjabi Song 2024",
    "Singer": "Gunjazz,",
    "Music": "Gurmeet Singh,",
    "Lyrics": "Jaggi Jagowal,",
    "Label": "SagaHits",
    "Duration": "3:09",
    "Added On": "12-Feb-2024",
    "Size": "2.89 mb",
    "audio": "https://www.pagalworld.com.cm/files/download/id/70114"
  }
}
```
#### Request to get the audio
https://pagal-music-api.vercel.app/audio?id=kurte-pathani-mp3-song-download

#### Response
```json
{"url":"https://www.pagalworld.com.cm/files/download/id/70114"}
```
example use in HTML 
```html
<audio controls>
  <source src="https://www.pagalworld.com.cm/files/download/id/70114" type="audio/mpeg" controls>
  Your browser does not support the audio element.
</audio>
```
