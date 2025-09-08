import { Hono } from 'hono';
import www from './lib/htu/www.js';
import teaching from './lib/htu/teaching.js';

const route = new Hono();

let plugins = [www, teaching];

for (let plugin of plugins) {
	plugin.setup(route);
}

export default route;
