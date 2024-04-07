import express from "express";
import { load } from 'cheerio';

const app = express();
const port = 8888;
const baseUrl = "https://www.pagalworld.com.cm";

app.get('/search', async (req, res) => {
    try {
        const id = req.query.id;
        const page = req.query.page || 1;
        if (!id) {
            return res.status(400).send("ID parameter is missing");
        }
        const response = await fetch(`${baseUrl}/find/${id}/${page}.html`)
        const html = await response.text();
        const $ = load(html);
        const searchResult = {};
        $('div.list > div.block > ul.list > li').each((i, el) => {
            const songId = $(el).find('a').attr("href").replace(`${baseUrl}/`, "").replace(/^\//, '').replace(/\.html$/, "").trim();
            const img = $(el).find('img').attr('src');
            const name = $(el).find('p.b.bk').text();
            const singer = $(el).find('p.gy.s').text();
            const size = $(el).find('p').last().text();
            searchResult[i + 1] = {
                "songId": songId,
                "img": `${baseUrl}/${img}`,
                "name": name,
                "singer": singer,
                "size": size
            }
        })
        res.send([{ "searchResult": searchResult }]);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.get('/audio', async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).send("ID parameter is missing");
        }
        const response = await fetch(`${baseUrl}/${id}.html`)
        const html = await response.text();
        const $ = load(html);
        const url = $("audio").attr("src");
        const audioSrcUrl = { "url": url };
        res.send(audioSrcUrl);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.get('/lyrics', async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).send("ID parameter is missing");
        }
        const response = await fetch(`${baseUrl}/${id}.html`)
        const html = await response.text();
        const $ = load(html);
        const lines = [];
        $('div.bpan.j > div').each((_i, el) => {
            const line = $(el).text().trim();
            if (line !== "") lines.push(line);
        });
        res.send({ "lyrics": lines });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.get('/song', async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).send("ID parameter is missing");
        }
        const response = await fetch(`${baseUrl}/${id}.html`)
        const html = await response.text();
        const $ = load(html);
        const img = $('body > main > div.mpan.c > img').attr("src");
        const title = $('body > main > h1.heading.cd').text().replace("Download", "").trim();

        const more = {};
        $('body > main > div.bpan.cn > table > tbody').find('tr').each((index, element) => {
            let key = $(element).find('td:nth-child(1)').text().trim();
            let value;
            if (key !== "Play Online") {
                value = $(element).find('td:nth-child(2)').text().trim();
            } else {
                value = $(element).find('td:nth-child(2)').find('audio').attr('src');
                key = "audio";
            }
            if (key !== "Share This Page!") {
                more[key] = value;
            }
        });
        const details = {
            "img": `${baseUrl}${img}`,
            "title": title,
            "more": more
        };
        res.send(details);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.get('/top-songs-updats', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await fetch(`${baseUrl}/top-songs-updats/${page}`)
        const html = await response.text();
        const $ = load(html);
        const topSongsUpdats = {}
        $('body > main > div.block:eq(1) > ul.list > li').each((i, el) => {
            const songId = $(el).find('a').attr("href").replace(`${baseUrl}/`, "").replace(/^\//, '').replace(/\.html$/, "").trim();
            const img = $(el).find('img').attr('src');
            const name = $(el).find('p.b.bk').text();
            const singer = $(el).find('p.gy.s').text();
            const size = $(el).find('p').last().text();
            topSongsUpdats[i + 1] = {
                "songId": songId,
                "img": `${baseUrl}/${img}`,
                "name": name,
                "singer": singer,
                "size": size
            }
        })
        res.send([{ "topSongsUpdats": topSongsUpdats }]);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.get('/top-virals', async (_req, res) => {
    try {
        const response = await fetch(`${baseUrl}`)
        const html = await response.text();
        const $ = load(html);
        const virals = {}
        $('body > main > div.block:eq(0) > ul.list > li').each((i, el) => {
            const songId = $(el).find('a').attr("href").replace(`${baseUrl}/`, "").replace(/^\//, '').replace(/\.html$/, "").trim();
            const img = $(el).find('img').attr('src');
            const name = $(el).find('p.b.bk').text();
            const singer = $(el).find('p.bk.s:eq(0)').text();
            const type = $(el).find('p.bk.s:eq(1)').text();
            virals[i + 1] = {
                "songId": songId,
                "img": `${baseUrl}/${img}`,
                "name": name,
                "singer": singer,
                "type": type
            }
        })
        res.send([{ "virals": virals }]);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.get('/new-hindi-songs-2024', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await fetch(`${baseUrl}/album/new-hindi-songs-2024/${page}.html`)
        const html = await response.text();
        const $ = load(html);
        const newHindiSongs = {}
        $('body > main > div.block:eq(1) > ul.list > li').each((i, el) => {
            const songId = $(el).find('a').attr("href").replace(`${baseUrl}/`, "").replace(/^\//, '').replace(/\.html$/, "").trim();
            const img = $(el).find('img').attr('src');
            const name = $(el).find('p.b.bk').text();
            const singer = $(el).find('p.gy.s').text();
            const size = $(el).find('p').last().text();
            newHindiSongs[i + 1] = {
                "songId": songId,
                "img": `${baseUrl}/${img}`,
                "name": name,
                "singer": singer,
                "size": size
            }
        })
        res.send([{ "newHindiSongs": newHindiSongs }]);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.use("/", (req, res) => {
    res.json({ message: "Pagal world backend api" });
})

app.listen(8888, () => {
    console.log(`Server port:${port}`)
})
