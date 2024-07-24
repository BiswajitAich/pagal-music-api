import express from "express";
import { load } from 'cheerio';
import fetchUpdatesForCategory from "./files/updateFetcher.js";
import fetchTrendsByCategory from "./files/trendingFetcher.js";
import cors from "cors"

const app = express();
const port = 8888;
//const baseUrl = "https://www.pagalworld.com.cm";
const baseUrl = "https://pagalworld.gay";


app.use(cors());
// app.get('/search', async (req, res) => {
//     try {
//         const query = req.query.q; 
//         const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&as_sitesearch=${encodeURIComponent(baseUrl)}`;
//         console.log((searchUrl));
//         const response = await fetch(searchUrl);
//         const html = response.data;

//         res.json(html);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });


// app.get('/audio', async (req, res) => {
//     try {
//         const id = req.query.id;
//         if (!id) {
//             return res.status(400).send("ID parameter is missing");
//         }
//         const response = await fetch(`${baseUrl}/${id}.html`)
//         const html = await response.text();
//         const $ = load(html);
//         const url = $("audio").attr("src");
//         const audioSrcUrl = { "url": url };
//         res.send(audioSrcUrl);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// })

app.get('/download-urls', async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).send("ID parameter is missing");
        }
        const response = await fetch(`${baseUrl}/${id}.html`)
        const html = await response.text();
        const $ = load(html);
        const downloadData = []
        $('div.downloaddiv').each((i, el) => {
            const link = $(el).find('a.dbutton').attr('href')
            const kbps = $(el).find('a.dbutton span span').first().text().trim().replace('Download in ', '');
            const size = $(el).find('a.dbutton span span').last().text().trim().replace('Size ', '')
            downloadData.push({
                link: link,
                kbps: kbps,
                size: size
            });
        });
        res.send(downloadData);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})

// app.get('/lyrics', async (req, res) => {
//     try {
//         const id = req.query.id;
//         if (!id) {
//             return res.status(400).send("ID parameter is missing");
//         }
//         const response = await fetch(`${baseUrl}/${id}.html`)
//         const html = await response.text();
//         const $ = load(html);
//         const lines = [];
//         $('div.bpan.j > div').each((_i, el) => {
//             const line = $(el).text().trim();
//             if (line !== "") lines.push(line);
//         });
//         res.send({ "lyrics": lines });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// })

// app.get('/song', async (req, res) => {
//     try {
//         const id = req.query.id;
//         if (!id) {
//             return res.status(400).send("ID parameter is missing");
//         }
//         const response = await fetch(`${baseUrl}/${id}.html`)
//         const html = await response.text();
//         const $ = load(html);
//         const img = $('body > main > div.mpan.c > img').attr("src");
//         const title = $('body > main > h1.heading.cd').text().replace("Download", "").trim();

//         const more = {};
//         $('body > main > div.bpan.cn > table > tbody').find('tr').each((index, element) => {
//             let key = $(element).find('td:nth-child(1)').text().trim();
//             let value;
//             if (key !== "Play Online") {
//                 value = $(element).find('td:nth-child(2)').text().trim();
//             } else {
//                 value = $(element).find('td:nth-child(2)').find('audio').attr('src');
//                 key = "audio";
//             }
//             if (key !== "Share This Page!") {
//                 more[key] = value;
//             }
//         });
//         const details = {
//             "img": `${baseUrl}${img}`,
//             "title": title,
//             "more": more
//         };
//         res.send(details);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// })







// -----------------------------
app.get('/songData', async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).send("ID parameter is missing");
        }
        const response = await fetch(`${baseUrl}/${id}.html`)
        const html = await response.text();
        const $ = load(html);
        const title = $('h1.title').text().replace("Download Pagalworld", "").trim();
        const img = $('div.alb-img-det > img').attr("data-src");
        const name = $('div.row.file-details h2').text().trim().replace(/\u2013.*$/, '');
        const type = $('div.row.file-details .f-desc').eq(0).text().trim();
        const artists = $('div.row.file-details').find('a[title]').text().trim();
        const audio = $('audio').attr('src')
        const downloadData = [];
        $('div.downloaddiv').each((i, el) => {
            const link = $(el).find('a.dbutton').attr('href')
            downloadData.push(link);
        });
        const similar = [];
        $('ul.sglist > li').each((i, el) => {
            const href = $(el).find('a.sdown').attr('href');
            const text = $(el).find('a.sdown h4').text().trim();
            similar.push({ "href": href, "text": text });
        });
        const details = {
            "img": img,
            "title": title,
            "name": name,
            "type": type,
            "artists": artists,
            "audio": `${baseUrl}${audio}`,
            "downloadData": downloadData,
            "similar": similar
        };
        res.send(details);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})



app.get('/updates', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const updates = await fetchUpdatesForCategory(baseUrl, 'updates', page);
        res.send(updates);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/top-updates', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const updates = await fetchUpdatesForCategory(baseUrl, 'all-top-updates', page);
        res.send(updates);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/bengali-latest-updates', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const updates = await fetchUpdatesForCategory(baseUrl, 'bengali-latest-updates', page);
        res.send(updates);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/bhakti-latest-updates', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const updates = await fetchUpdatesForCategory(baseUrl, 'bhakti-latest-updates', page);
        res.send(updates);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});





app.get('/featured', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await fetchTrendsByCategory(baseUrl, 'featured', page);
        res.send(response);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})
app.get('/reels-viral-trending', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await fetchTrendsByCategory(baseUrl, 'files/8231/reels-viral-trending-mp3-songs/new2old', page)
        res.send(response);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})
app.get('/old-is-gold-hindi', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await fetchTrendsByCategory(baseUrl, 'files/3192/bollywood-old-is-gold-hindi-mp3-songs/new2old', page)
        res.send(response);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.get('/albums', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await fetch(`${baseUrl}/trending-album-updates/${page}.html`)
        const html = await response.text();
        const $ = load(html);
        const albums = []
        $('div.tnned.alt-bg-gray').each((i, el) => {
            const songId = $(el).find('a').attr('href').replace(`${baseUrl}/`, "").replace(/^\//, "").replace(/\.html/, "").split('/').slice(0, -1).join('/');
            const img = $(el).find('img').attr('data-src');
            const name = $(el).find('h3 > a').text()
            albums[i] = {
                "songId": songId,
                "img": img,
                "name": name
            }
        })
        res.send(albums)
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.get('/album-songs', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const songId = req.query.songId;
        if (!songId) return;
        const response = await fetch(`${baseUrl}/${songId}/${page}.html`)
        const html = await response.text();
        const $ = load(html);
        const albumSongs = [];
        $('div.listbox').each((i, el) => {
            const songId = $(el).find('a').attr('href').replace(`${baseUrl}/`, "").replace(/^\//, "").replace(/\.html/, "");
            const img = $(el).find('img').attr('data-src');
            const name = $(el).find('h2').text();
            const size = $(el).find('div.listbox-tags').last().text()

            albumSongs.push({
                "songId": songId,
                "img": img,
                "name": name,
                "size": size
            })
        })
        res.send(albumSongs)
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})
// ----------------------------------------





// app.get('/top-virals', async (_req, res) => {
//     try {
//         const response = await fetch(`${baseUrl}`)
//         const html = await response.text();
//         const $ = load(html);
//         const virals = []
//         $('body > main > div.block:eq(0) > ul.list > li').each((i, el) => {
//             const songId = $(el).find('a').attr("href").replace(`${baseUrl}/`, "").replace(/^\//, '').replace(/\.html$/, "").trim();
//             const img = $(el).find('img').attr('src');
//             const name = $(el).find('p.b.bk').text();
//             const singer = $(el).find('p.bk.s:eq(0)').text();
//             const type = $(el).find('p.bk.s:eq(1)').text();
//             virals[i] = {
//                 "songId": songId,
//                 "img": `${baseUrl}/${img}`,
//                 "name": name,
//                 "singer": singer,
//                 "type": type
//             }
//         })
//         res.send(virals);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// })

// app.get('/new-hindi-songs-2024', async (req, res) => {
//     try {
//         const page = req.query.page || 1;
//         const response = await fetch(`${baseUrl}/album/new-hindi-songs-2024/${page}.html`)
//         const html = await response.text();
//         const $ = load(html);
//         const newHindiSongs = {}
//         $('body > main > div.block:eq(1) > ul.list > li').each((i, el) => {
//             const songId = $(el).find('a').attr("href").replace(`${baseUrl}/`, "").replace(/^\//, '').replace(/\.html$/, "").trim();
//             const img = $(el).find('img').attr('src');
//             const name = $(el).find('p.b.bk').text();
//             const singer = $(el).find('p.gy.s').text();
//             const size = $(el).find('p').last().text();
//             newHindiSongs[i + 1] = {
//                 "songId": songId,
//                 "img": `${baseUrl}/${img}`,
//                 "name": name,
//                 "singer": singer,
//                 "size": size
//             }
//         })
//         res.send([{ "newHindiSongs": newHindiSongs }]);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// })

app.use("/", (req, res) => {
    res.json({ message: "backend api for music see 'https://github.com/BiswajitAich/pagal-music-api' for more details" });
})

app.listen(8888, () => {
    console.log(`Server port:${port}`)
})
