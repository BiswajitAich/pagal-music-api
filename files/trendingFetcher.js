import { load } from 'cheerio';

const fetchTrendsByCategory = async (baseUrl, category, page) => {
    const response = await fetch(`${baseUrl}/${category}/${page}.html`);
    const html = await response.text();
    const $ = load(html);
    const trends = [];
    $('div.cat-list').each((i, el) => {
        const songId = $(el).find('a').attr("href").replace(`${baseUrl}/`, "").replace(/^\//, '').replace(/\.html$/, "").trim();
        const img = $(el).find('img').attr('data-src');
        const name = $(el).find('h2').text();
        const tags = $(el).find('.listbox-tags');
        let singers = [];
        let size = "";
        
        if (tags.length >= 1) {
            const firstTagText = tags.eq(0).text().trim();
            if (firstTagText.includes("MB") || firstTagText.includes("KB")) {
                size = firstTagText;
            } else {
                singers = firstTagText.split(',');
                if (tags.length === 2) {
                    size = tags.eq(1).text().trim();
                }
            }
        }

        trends[i] = {
            "songId": songId,
            "img": img,
            "name": name,
            "singers": singers,
            "size": size
        }
    })
    return trends;
}

export default fetchTrendsByCategory;