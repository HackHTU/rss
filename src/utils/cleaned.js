import sanitizeHtml from 'sanitize-html';

export const cleanedHTML = (rawHtml) => sanitizeHtml(rawHtml, {
	allowedTags: [
		'p',
		'a',
		'img',
		'ul',
		'ol',
		'li',
		'strong',
		'em',
		'blockquote',
		'pre',
		'code',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'br',
		'hr',
		'figure',
		'figcaption',
	],
	allowedAttributes: {
		a: ['href', 'name', 'target', 'title'],
		img: ['src', 'alt', 'title', 'width', 'height'],
	},
	transformTags: {
		a: (tagName, attribs) => {
			return {
				tagName: 'a',
				attribs: {
					...attribs,
					rel: 'nofollow noopener noreferrer',
					target: '_blank',
				},
			};
		},
	},
	exclusiveFilter: (frame) => {
		// 去掉空节点
		return frame.text.trim().length === 0;
	},
});
