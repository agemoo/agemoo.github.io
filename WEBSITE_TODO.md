# Personal Website — 待细化事项

> 状态：持续维护。已完成事项标注 (Done) 并记录落地位置，未完成事项保留为待办。

## 1. Dark / Light 模式 (Done)

- 深色 / 浅色双主题视觉系统已实现（`tokens.css` 语义令牌 + `theme.js`）。
- 现状（2026-08）：公开站点暂时强制深色（`theme.js` 中 `publicThemesEnabled = false`），浅色系统保留在源码中但未公开，且不提供切换控件。详见 `DESIGN.md`。

## 2. Hero 页面优化 (In progress)

- 重新评估 Hero 的文案、信息层级、留白、视觉重心和首屏高度。
- 已迭代：聚焦聚光动画收敛（不无限循环）、导航玻璃效果、深色画廊质感。
- 保持简洁，避免首屏过满；同时保留现有网站的质感与动效。

## 3. Internship 页面细化 (Done)

- Vertex Marketing：`projects/vertex-reddit.html`，数据以 knowledge-base 的 vertex 交接文档为准。
- SUU Teaching Assistant：`projects/suu-teaching-assistant.html`。
- 两页信息结构、文案、媒体均已落地，中英双语完整。

## 4. 走马灯移动端问题 (Done)

- 结论：移动端 / 粗指针 / `prefers-reduced-motion` 下**有意抑制**走马灯动画（能力门控），而非 bug。
- 依据：`DESIGN.md` Motion 契约，桌面端细指针才启用滚动动画。无需修复。

## 5. Projects 页面细化 (Done)

- 详情页：`projects/campus-campaign.html`、`projects/hotel-jazz.html`、`projects/visual-work.html`。
- 首页保持三个编辑式入口，详情页承载深度叙事与媒体。

## 6. Selected Work 整理 (Done)

- 作品已按 `assets/visual_work/` 重组，白框问题已修复（自然比例展示）。
- 精选（Lead）3 件 + 归档（Archive）8 件已确定，顺序与比例已定型。

## 7. Outside Work 各页面细化 (Done)

- Music：`music.html`，表演与幕后工作完整叙事。
- Photography：`photography.html`，标题样式、排版、图片序列已重构。
- Travel：`travel.html`，保留 `Travel` 名称（最终决定不用 `Explore the World`）。
- 三个路由共用 `outside-work.html` 网关入口。

## 后续执行原则

- 开始实施前，先为对应事项补充明确范围和验收标准。
- 保留当前网站的质感、动效和中英文能力，避免在局部改造中发生退化。
- 修改后运行 `node --test tests/*.test.mjs`（当前基准 109 项全过）。
