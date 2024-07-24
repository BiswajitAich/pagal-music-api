import { load } from 'cheerio';

const fetchUpdatesForCategory = async (baseUrl, category, page) => {
    const response = await fetch(`${baseUrl}/${category}/${page}.html`);
    const html = await response.text();
    const $ = load(html);
    const updates = [];
    $('li.tnned.col-md-6.col-sm-12').each((i, el) => {
        const songId = $(el).find('a').attr("href").replace(`${baseUrl}/`, "").replace(/^\//, '').replace(/\.html$/, "").trim();
        const img = $(el).find('img').attr('data-src');
        const name = $(el).find('h3 > a').text();
        const singer = $(el).find('h3 + p').text().split(",").map(s => s.trim());
        updates.push({
            "songId": songId,
            "img": img,
            "name": name,
            "singer": singer
        });
    });
    return updates;
}

export default fetchUpdatesForCategory;