/**
 * 教务处新闻 rss
 */
/// <reference path="../../../worker-configuration.d.ts" />
import { cleanedHTML } from '../../utils/cleaned';
import { parseDate } from '../../utils/parse-date';
import { renderRss2 } from '../../utils/util';
import { load } from 'cheerio';

let deal = async (ctx) => {
	const { category = 8954 } = ctx.req.param();

	const ROOT_URL = 'https://www.htu.edu.cn/';
	const HEADERS = {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
		'Accept-Language': 'zh-CN,zh;q=0.9',
	};
	const TIMEOUT = 10000;

	const link = `${ROOT_URL}${category}/list.htm`;
	const response = await fetch(link, {
		headers: HEADERS,
		signal: AbortSignal.timeout(TIMEOUT),
	});

	if (!response.ok) {
		return ctx.body('Failed to fetch data', 500);
	}

	const responseText = await response.text();

	const $ = load(responseText);

	const lists = $('ul.news_list li.news')
		.toArray()
		.map((item) => {
			const element = $(item);

			const titleRaw = element.find('div.wz div.news_title').first().text().trim();
			const title = titleRaw || '';

			const href = element.find('div.wz a').first().attr('href');
			const link = href ? new URL(href, ROOT_URL).href : undefined;

			const descRaw = element.find('div.wz div.news_text').first().text().trim();
			const description = descRaw || undefined;

			const timeRaw = element.find('div.wz div.news_time').first().text().trim();
			const pubDate = timeRaw ? parseDate(timeRaw) : undefined;

			const imgSrc = element.find('div.imgs img').first().attr('src') || element.find('div.wz a img').first().attr('src');
			const enclosure = {
				url: imgSrc ? new URL(imgSrc, ROOT_URL).href : undefined,
			};

			return {
				title,
				link,
				description,
				pubDate,
				enclosure,
			};
		});

	// and try to extract the main content
	const items = await Promise.all(
		lists.map(async (item) => {
			const link = item.link;
			// Filter out items without a link
			if (!link) return item;

			// Filter file links
			if (/\.(pdf|docx?|xlsx?|xls|zip|rar|png|jpe?g|gif|bmp|mp4|mp3|txt)$/i.test(link)) {
				return item;
			}

			// Filter external links
			if (new URL(link).origin !== new URL(ROOT_URL).origin) {
				return item;
			}

			try {
				const response = await fetch(link, { headers: HEADERS, signal: AbortSignal.timeout(TIMEOUT) });
				const responseText = await response.text();
				const $a = load(responseText);

				const readEl = $a('div.read').first();
				const html = readEl.length ? readEl.html() : null;

				if (html) {
					item.description = cleanedHTML(html);
				}

				if (!item.enclosure) {
					const img = $a('div.read img').first().attr('src');
					const imgUrl = img ? new URL(img, ROOT_URL).href : undefined;
					if (img) {
						item.enclosure = { url: imgUrl };
					}
				}
				return item;
			} catch (error) {
				console.error(error);
				return item;
			}
		})
	);

	const channel = $('title').text();
	const rss = renderRss2({
		title: `河南师范大学 - ${channel}`,
		link: link,
		items: items,
		language: 'zh-CN',
		category: channel,
	});

	return new Response(rss, {
		status: 200,
		headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
	});
};

let setup = (route) => {
	route.get('/htu/www/:category', deal);
};

export default { setup };
