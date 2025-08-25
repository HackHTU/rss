import { Hono } from 'hono';
// import bilibili_user_dynamic from './lib/bilibili/user/dynamic';
// import bilibili_user_video from './lib/bilibili/user/video';
// import telegram_channel from './lib/telegram/channel';
// import weibo_user from './lib/weibo/user';
// import xiaohongshu_user from './lib/xiaohongshu/user';
import www from './lib/htu/www.js';
import teaching from './lib/htu/teaching.js';

const route = new Hono();

let plugins = [www, teaching];

for (let plugin of plugins) {
	plugin.setup(route);
}

export default route;
