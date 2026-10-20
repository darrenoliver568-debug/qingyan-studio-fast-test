# 青砚作品集性能优化第一阶段报告

日期：2026-10-20

正式站：https://darrenoliver568-debug.github.io/qingyan-studio/

正式基线：`28f5b91`
独立实验分支：`perf/phase-1`

## 1. 保护状态

- 正式仓库 `main` 仍为 `28f5b91`，工作区干净并与 `origin/main` 一致。
- 实验位于独立副本 `qingyan-perf-lab`。
- 实验副本已移除 Git 远端，无法误推送到正式仓库。
- 未修改正式网站、正式域名、DNS 或任何生产部署配置。
- 未购买套餐，未创建 AccessKey、API Token 或新账户。

## 2. 正式站性能基线

### 2.1 页面和首屏媒体

| 项目 | 大小 | 当前行为 |
|---|---:|---|
| 首页 HTML | 24.4 KB | GitHub Pages 静态页面 |
| 首屏海报 | 424.1 KB | 基线 JPEG；`fetchpriority=high`、`decoding=async` |
| 白天首屏视频 | 14.08 MB | 首页加载时自动播放，H.264 2560×1424、24fps、约23.3Mbps |
| 夕阳互动视频 | 8.68 MB | 桌面细指针环境延迟加载 |

白天和夕阳 MP4 的 `moov` 均在 `mdat` 之前，已满足 Fast Start。视频索引位置不是主要问题。

### 2.2 当前网络的重复测量

以下结果来自同一设备、当前网络和同一命令行客户端。命令行连接经过当前系统网络路径，因此 TCP 数字不能代表所有访客。

| 资源 | 测试次数 | DNS | TLS | TTFB | 完成时间 |
|---|---:|---:|---:|---:|---:|
| HTML 冷查询参数 | 3 | 0.03ms 左右 | 1.26–1.74s | 1.69–2.14s | 1.95–2.42s |
| 424KB 海报冷查询参数 | 3 | 0.03ms 左右 | 1.39–1.59s | 1.87–2.25s | 3.09–3.81s |
| 白天视频前 1MB | 3 | 0.03ms 左右 | 1.24–1.57s | 1.65–2.08s | 3.47–4.91s |

重复 URL 的 HTML TTFB 为 1.65–2.11 秒，没有出现稳定的热缓存提速。海报重复测试第一笔为 4.34 秒；后续长连接在进入视频组前中断，因此未把不完整数据包装成三次热缓存结论。

### 2.3 缓存和分段请求

GitHub Pages 对 HTML、海报和首页视频返回：

- `Cache-Control: max-age=600`
- `Accept-Ranges: bytes`
- `X-Cache: HIT`
- `Via: 1.1 varnish`

缓存时间仅十分钟。即使边缘命中，当前线路的 TLS、TTFB 和吞吐仍可能较慢。

### 2.4 无法可靠测量的项目

- 当前浏览器自动化环境不暴露 Resource Timing / Navigation Timing，因此不能可靠给出浏览器 LCP、图片解码毫秒数和视频首帧毫秒数。
- 没有把命令行下载完成时间冒充浏览器首帧时间。
- 尚未取得不同省份、运营商和真实大陆访客的样本。

## 3. 前端最小实验

### 3.1 实验一：稳定占位和解码后淡入

提交：`63ba6c2`

修改文件：

- `index.html`
- `assets/css/v2.css`
- `assets/js/v2-main.js`

结果：

- 首屏先显示稳定渐变占位，不再依赖半张基线 JPEG 填充画面。
- 海报在 `decode()` 完成后添加 `is-ready`，以 420ms 整体淡入。
- `decode()` 不可用或失败时使用 `load/complete` 回退。
- 图片失败时保留占位背景；JavaScript 禁用时仍显示普通海报。
- 手机端实测无横向溢出，淡入完成后海报透明度为 1。

该实验改善的是加载观感，不会缩短服务器 TTFB。

### 3.2 实验二：响应式首屏海报

提交：`70b52e2`

| 候选 | 大小 | 相对原图 |
|---|---:|---:|
| 原图 1672px | 424.1 KB | 基线 |
| 手机 640px | 55.9 KB | 减少 86.8% |
| 平板 1200px | 172.4 KB | 减少 59.4% |
| 桌面 1672px | 338.6 KB | 减少 20.2% |

结果：

- 手机浏览器实测选择 640px 文件。
- 1440px 桌面浏览器实测选择 1672px 文件。
- `preload` 与 `<img srcset>` 使用相同候选和 `sizes=100vw`。
- 保持 `loading=eager`、`fetchpriority=high`、宽高属性和原有构图。
- 原始海报没有覆盖或删除。

偏差记录：本机没有 WebP/AVIF 编码器，本实验未临时安装依赖，先完成响应式 JPEG 验证。WebP/AVIF 的额外收益尚未实测。

### 3.3 实验三：单段视频转码

提交：`2c902a9`

| 版本 | 参数 | 大小 |
|---|---|---:|
| 原视频 | H.264，2560×1424，24fps，含 AAC，约23.3Mbps | 14.08 MB |
| 实验视频 | H.264，1920×1068，24fps，无音频，最大约5Mbps | 3.18 MB |

结果：

- 文件减少约 77.4%。
- `moov` 位于 `mdat` 前，保持 Fast Start。
- 浏览器实测分辨率 1920×1068、`readyState=4`、自动循环播放正常。
- 只替换实验分支中的白天首页视频；原视频及其他视频均未改动。

## 4. 托管方案对照

| 方案 | 当前结论 | 中国大陆条件 | 本轮实测状态 |
|---|---|---|---|
| GitHub Pages | 免费、部署简单，但当前线路 TLS/TTFB/吞吐不稳定 | 没有大陆本地节点承诺 | 已建立正式站基线 |
| 阿里云 ESA Pages 免费版 | 0元，适合开发测试；无 SLA，带宽与单请求速率有限制 | 使用中国大陆或全球节点需要 ICP 备案；免费临时公共链接需要 Token，60分钟有效 | 未创建，缺少阿里云账户会话、实名认证状态和 GitHub 授权 |
| Cloudflare Pages 免费版 | 静态资源免费，500次构建/月，单文件25MiB | 免费版不提供 Cloudflare 中国网络；中国网络要求 Enterprise、单独订阅和 ICP | 未创建，缺少 Cloudflare 账户授权 |

ESA 官方资料：

- https://help.aliyun.com/zh/edge-security-acceleration/esa/product-overview/free-plan
- https://help.aliyun.com/zh/edge-security-acceleration/esa/user-guide/functions-and-pages-quick-start/
- https://help.aliyun.com/zh/edge-security-acceleration/esa/support/site-access-related-issues

Cloudflare 官方资料：

- https://developers.cloudflare.com/pages/platform/limits/
- https://developers.cloudflare.com/china-network/get-started/

## 5. 托管测试阻塞与最短手动步骤

### 阿里云 ESA Pages

1. 登录已实名认证的阿里云账号并开通函数和 Pages。
2. 在控制台选择“导入 GitHub 仓库”。
3. 仅授权独立测试仓库，不选择正式仓库的生产分支。
4. 部署后复制带 Token 的临时公共链接；不绑定自定义域名。

### Cloudflare Pages

1. 登录 Cloudflare 账号并创建独立 Pages 项目。
2. 连接独立测试仓库或使用 Direct Upload。
3. 使用平台分配的 `pages.dev` 域名；不添加正式域名。
4. 保持视频单文件小于25MiB。

完成以上授权后，才能使用完全相同的实验构建做真实托管对照。当前阶段不请求长期 AccessKey 或主账号密钥。

## 6. 修改清单与回滚

| 提交 | 作用 | 回滚命令 |
|---|---|---|
| `63ba6c2` | 海报解码后淡入 | `git revert 63ba6c2` |
| `70b52e2` | 响应式首屏海报 | `git revert 70b52e2` |
| `2c902a9` | 单段轻量首屏视频 | `git revert 2c902a9` |

这些命令只应在独立实验副本中运行。直接删除整个 `qingyan-perf-lab` 也不会影响正式仓库，但本阶段不执行删除。

## 7. 当前结论

前端实验值得保留到下一轮托管测试：首屏视觉跳出已被消除，手机海报传输量降低 86.8%，首屏视频体积降低 77.4%，且桌面与手机基本布局验证通过。

现在仍不建议正式迁移。原因是 ESA 和 Cloudflare 尚未用相同构建在真实访问地址上测试，且主要访客位于中国大陆。通过 Verification Gate 之前，至少还需要：

1. 获得两个平台的独立测试 URL；
2. 同一设备和网络分别完成三次冷缓存、三次热缓存；
3. 补充至少两种中国大陆运营商或地区样本；
4. 确认视觉质量和首帧等待均可接受；
5. 确认免费额度、临时 Token 和 ICP 条件与长期使用目标兼容。
