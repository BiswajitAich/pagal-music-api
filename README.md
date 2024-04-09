# Pagal Music API

Welcome to Pagal Music API, your go-to solution for accessing a vast collection of music tracks. This API provides endpoints for searching and retrieving music information based on various parameters.

## Features

- **Search Music**: Search for music tracks by providing keywords or specific parameters.
- **Retrieve Track Information**: Get detailed information about each track, including its name, singer, size, and image.

## Example Usage

### Search Music

#### Request to search a song:
get fetch(https://pagal-music-api.vercel.app/search?id=o mahi o mahi)

#### Response

```json
[
  {
    "searchResult": {
      "1": {
        "songId": "o-mahi-o-mahi-lofi-mp3-song-download",
        "img": "https://www.pagalworld.com.cm/siteuploads/thumb/sft138/68681_1.jpg",
        "name": "O Mahi O Mahi Lofi (Dunki)",
        "singer": "Arijit Singh",
        "size": "3.97 mb"
      },
      "2": {
        "songId": "o-mahi-o-mahi-mp3-song-download",
        "img": "https://www.pagalworld.com.cm/siteuploads/thumb/sft138/68671_1.jpg",
        "name": "O Mahi O Mahi (Dunki)",
        "singer": "Arijit Singh",
        "size": "3.56 mb"
      }
    }
  }
]
```
#### Request to get song details:
get fetch(https://pagal-music-api.vercel.app/song?id=o-mahi-o-mahi-mp3-song-download)

#### Response 
```json
{
  "img": "https://www.pagalworld.com.cm/siteuploads/thumb/sft138/68671_4.jpg",
  "title": "O Mahi O Mahi (Dunki) Song",
  "more": {
    "Category": "New Viral Songs 2024",
    "Singer": "Arijit Singh,",
    "Music": "Pritam,",
    "Lyrics": "Irshad Kamil,",
    "Label": "T-Series",
    "Duration": "3:54",
    "Added On": "30-Dec-2023",
    "Size": "3.56 mb",
    "audio": "https://www.pagalworld.com.cm/files/download/id/68671"
  }
}
```
#### Request to get the audio
get fetch(https://pagal-music-api.vercel.app/audio?id=o-mahi-o-mahi-mp3-song-download)

#### Response
```json
{"url":"https://www.pagalworld.com.cm/files/download/id/68671"}
```
example use in HTML 
```html
<audio controls>
  <source src="https://www.pagalworld.com.cm/files/download/id/68671" type="audio/mpeg" controls>
  Your browser does not support the audio element.
</audio>
```
#### Request to get Lyrics
get fetch(https://pagal-music-api.vercel.app/lyrics?id=o-mahi-o-mahi-mp3-song-download)
#### Response 
```json
{
  "lyrics": [
    "Yaara Teri Kahaani Mein",
    "Ho Zikar Mera",
    "Kahin Teri Khamoshi Mein",
    "Ho Fikar Mera",
    "Rukh Tera Jidhar Ka Ho",
    "Ho Udhar Mera",
    "Teri Baahon Talak Hi Hai",
    "Yeh Safar Mera",
    "O Maahi O Maahi",
    "O Maahi O Maahi",
    "O Maahi O Maahi",
    "O Maahi O Maahi",
    "Meri Wafa Pe",
    ...
  ]
}
```
#### Request to get top viral songs
get fetch(https://pagal-music-api.vercel.app/top-virals)
#### Response
```json
[
  {
    "virals": {
      "1": {
        "songId": "o-mahi-o-mahi-mp3-song-download",
        "img": "https://www.pagalworld.com.cm/siteuploads/thumb/sft138/68671_1.jpg",
        "name": "O Mahi O Mahi (Dunki)",
        "singer": "Arijit Singh",
        "type": "New Viral Songs 2024"
      },
      "2": {
        "songId": "arijit-singh-heeriye-mp3--song-download",
        "img": "https://www.pagalworld.com.cm/siteuploads/thumb/sft135/67444_1.jpg",
        "name": "Heeriye",
        "singer": "Jasleen Royal, Arijit Singh",
        "type": "New Hindi Songs 2022"
      },
      ...
   }
]
```

#### Request to get top new 2024 songs
get fetch(https://pagal-music-api.vercel.app/new-hindi-songs-2024?page=1)
default page value is '1'.
#### Response
```json
[
  {
    "newHindiSongs": {
      "1": {
        "songId": "jiya-mera-mp3-song-download",
        "img": "https://www.pagalworld.com.cm/siteuploads/thumb/sft142/70788_1.jpg",
        "name": "Jiya Mera (EP-Lafz)",
        "singer": "Garvit Soni, Priyansh Srivastava",
        "size": "2.79 mb"
      },
      "2": {
        "songId": "angreji-pk-mp3-song-download",
        "img": "https://www.pagalworld.com.cm/siteuploads/thumb/sft142/70728_1.jpg",
        "name": "Angreji PK",
        "singer": "Miss Pooja",
        "size": "2.5 mb"
      },
     ...
   }
]
```
#### Request to get top song updates
get fetch([Link Text](https://pagal-music-api.vercel.app/top-songs-updats?page=1))
default page value is '1'.
```json
[
  {
    "topSongsUpdats": {
      "1": {
        "songId": "yimmy-yimmy-summer-mushup-dip-sr-mp3-song-download",
        "img": "https://www.pagalworld.com.cm/siteuploads/thumb/sft142/70792_1.jpg",
        "name": "Yimmy Yimmy (Summer Mushup) Dip SR",
        "singer": "Various Artist",
        "size": "2.51 mb"
      },
      "2": {
        "songId": "ke-janam-pyar-tumse-hai-mp3-song-download",
        "img": "https://www.pagalworld.com.cm/siteuploads/thumb/sft142/70791_1.jpg",
        "name": "Ke Janam Pyar Tumse Hai",
        "singer": "Aashir Wajahat, NAYEL",
        "size": "3.12 mb"
      },
     ...
   }
]
```
