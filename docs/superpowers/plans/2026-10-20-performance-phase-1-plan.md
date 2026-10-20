# 青砚作品集性能优化第一阶段实施计划

## 检查点 0：保护边界

- 确认工作目录为 `qingyan-perf-lab`。
- 确认分支为 `perf/phase-1`。
- 确认没有 Git 远端，避免误推送正式仓库。
- 每次提交前运行 `git diff --check` 和脚本语法检查。

## 提交 1：首屏占位与解码后淡入

修改：`index.html`、`assets/css/v2.css`、`assets/js/v2-main.js`。

- 海报在完整加载并解码前保持透明。
- `.hero__media` 提供稳定的平均色/渐变占位背景。
- 解码成功后添加 `is-ready` 并整体淡入。
- `decode()` 不可用或失败时由 `load` 回退；加载失败时保持占位背景。
- 视频仍在 `loadeddata/canplay` 后淡入，不改变已有回退链。

验证：桌面和手机首屏不空白、不横向溢出；人为延迟图片时不出现半张图；禁用脚本时仍可显示海报。

## 提交 2：响应式首屏图片

新增：派生的 640、1200、1672 像素 WebP/JPEG 文件。修改：`index.html`。

- 使用 `picture` 提供 WebP 与 JPEG 回退。
- 使用 `srcset` 和 `sizes=100vw` 选择档位。
- preload 与 picture 使用一致的候选集。
- 保留原始 `hero-lake.jpg`，不覆盖。

验证：手机、平板、桌面选择合理候选；构图、object-position 和文字覆盖保持不变；记录派生文件体积。

## 提交 3：单段首屏视频转码

新增：`assets/video/hero-day-perf.mp4`。修改：`assets/js/site-data.js`。

- 只处理 `hero-day.mp4`。
- 保持原分辨率或在视觉可接受时降至 1080p，使用 H.264、无音频或保留必要音轨、Fast Start。
- 不处理其他作品视频和夕阳互动视频。

验证：比较文件大小、MP4 atom 顺序、浏览器可播放状态、首帧等待和循环显示；原视频保留可回滚。

## 测量与托管对照

- 本地版本完成后分别做三次冷缓存和三次热缓存。
- 记录 GitHub Pages 正式站为基线，但不发布实验代码到正式站。
- ESA Pages 和 Cloudflare Pages 仅创建独立测试项目；账户或授权不可用时记录阻塞，不自行创建账户或密钥。
- 使用相同实验构建做托管对照；测试 URL、时间、响应头和失败记录写入独立报告。

## 回滚

- 提交 1、2、3 均可分别使用 `git revert <commit>` 回滚。
- 删除整个 `qingyan-perf-lab` 副本不会影响正式仓库；本阶段不自动执行删除。
