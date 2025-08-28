# RSS

<table align="center">
    <tr>
        <td align="center" valign="middle">
            <img src="assets/icon.svg" alt="HackHTU icon" width="100" height="100" />
        </td>
    </tr>
    <tr>
        <td align="center" valign="middle">
            📰 RSSWorker For HTUers ❤️ <br>
						<a href="https://rss.htu.me">RSS Feed</a>
        </td>
    </tr>
</table>

## Quick Start

### 首页新闻

河南师范大学首页列出的新闻信息，并能够获取来自本站的部分全文。
`/rss/htu/www/:category`
| 实例名称 | 对应分类 ID | 有无图片 |
| -------- | ----------- | -------- |
| 师大要闻 | 8954 | 有 |
| 新闻速递 | 8957 | 有 |
| 媒体师大 | 9008 | 有 |
| 通知公告 | 8955 | 无 |
| 师大故事 | 21034 | 有 |
| 影像师大 | 14555 | 有 |
| 学术论坛 | 21032 | 有 |
| 学术预告 | xsygcs | 无 |
| 活力师大 | hlsd | 有 |

### 教务处新闻

河南师范大学教务处列出的新闻信息，并能够获取来自本站的部分全文。
`/rss/htu//teaching/:category`
| 名称 | 对应分类 ID |
| -------- | ----------- |
| 教学新闻 | 3257 |
| 教务通知 | 3251 |
| 公示公告 | 3258 |
| 办事指南 | 3255 |
| 下载园地 | 3254 |
| 考务管理 | kwgl |
| 院部动态 | ybdt |

## 致谢与改版说明

- 原始项目：本项目基于 yllhwa 的 [RSSWorker](https://github.com/yllhwa/RSSWorker) 改版与本地化开发，删减了一些 Router，更新了依赖等，在此感谢原项目。
- 致谢：感谢原始作者 yllhwa 及其贡献者提供的基础项目；同时感谢开源社区如 [RSSHub](https://github.com/DIYgod/RSSHub) 提供灵感与参考。


## TODO

- [ ] 保留 HTML 格式，解析图片，文件等媒体文件
- [ ] 新增仓库，使用 TypeScript, Hono, Feedsmith 重构，并增加多 RSS Feed 合并，AI 总结功能
