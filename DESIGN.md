# Design

## Theme
暗夜画廊（Gallery in the Dark）。近黑暖炭画布像美术馆的墙，孙慕坤的彩色作品被「聚光」成展品。质感来自暖调近黑、细线、胶片颗粒与余烬辉光；电影感的滚动揭示与光标聚光是签名交互。中文为主、英文为辅（英文作展签 / 数据 / 署名）。Image-led：彩色作品本身提供色彩，避免落入灰白「编辑杂志」单色反射。

## Color
OKLCH。策略：Committed —— 暖琥珀/余烬作为唯一强调色贯穿全站，其余为暖近黑层级。

| Token | 值 | 用途 |
|---|---|---|
| `--bg` | oklch(0.155 0.006 60) ≈ #100D0A | 画布（展墙） |
| `--bg-1` | oklch(0.185 0.008 58) | 次级背景 / 分区 |
| `--surface` | oklch(0.225 0.010 55) | 抬升面板 / 展签 |
| `--ink` | oklch(0.93 0.012 75) ≈ #F2EBDF | 主文字（暖骨白） |
| `--ink-2` | oklch(0.80 0.013 72) | 正文 |
| `--muted` | oklch(0.62 0.012 65) | 次要 / 标签（仅大字或标签） |
| `--faint` | oklch(0.45 0.010 60) | 极次要 / 线注 |
| `--ember` | oklch(0.64 0.15 47) ≈ #C9683A | 强调（大字 / 辉光 / 描边） |
| `--amber` | oklch(0.80 0.12 70) ≈ #E6A85A | 高亮强调（小字安全） |
| `--line` | rgba(236,222,196,0.10) | 细分隔线 / 边框 |

对比：`--ink`/`--ink-2` 落在 `--bg` 上 ≥ 7:1。`--ember` 仅用于大字/图形；小号强调文字用 `--amber`（≥4.5:1）。强调色不在边缘用中性色稀释——Committed 即贯穿。

## Typography
配对轴 = 中文衬线 × 英文等宽（gallery placard / 数据气质），非相似族堆叠。

- **显示 / 标题（中文）**：`'Noto Serif SC'`（思源宋体），weight 500–700。本机已装；`@font-face` 用 `local()` + 本地字体文件兜底，栈回退 `'Source Han Serif SC','Songti SC',serif`。这是英雄字体（孙慕坤、案例标题）。
- **正文（中文）**：`'Noto Sans SC'`，weight 300–500，回退 `'PingFang SC','Microsoft YaHei',sans-serif`。亮字在暗底上 line-height +0.05~0.1。
- **英文标签 / kicker / 数据 / 署名**：`'Fragment Mono'`（Google Fonts，仅拉丁，体积小），回退 `ui-monospace,Menlo,monospace`。仅用于小号展签与数字——是「美术馆展签 + 数据终端」的质感，不是开发者 costume；不用于正文。
- 标度：fluid `clamp()`，步进 ≥1.25；显示标题上限 ≤ 6rem；display 字距 ≥ -0.04em。h1–h3 `text-wrap:balance`，长段 `pretty`。

## Components
- **展签（placard）**：作品 / 案例的说明牌——标题 + 媒介 + 年份 + 角色（有信息量的元数据，非空泛眉标）。这是刻意的品牌系统，替代「每节一个 uppercase 眉标」。
- **案例展厅**：案例 01/02/03 是真实有序的展览序列，编号成立；含 approach / results / 引述 / 配图，逐厅换版式（art direction per room）。
- **影响数据**：编辑式数字行 + 入场计数动效 + 上下文，避免 SaaS hero-metric 模板与等大卡片网格。
- **教育（分学院）**：账本/时间轴式，按学院分条——武汉轻工大学·人文与传媒学院 / 南犹他州立大学·人文与社会科学学院 / 南犹他州立大学·里维特商学院（Leavitt School of Business）。
- 禁用：侧边色条、渐变文字、默认玻璃拟态、等大图标卡网格、每节眉标、溢出容器的文字。

## Motion
全部自包含 vanilla JS，无外部运行时依赖（离线可用）；`<html>.js` 同步置类，无 JS 时内容默认可见。曲线 ease-out-expo/quint，无弹跳。
- **入场编排**：颗粒沉降 → 聚光扫过 → 名字/列上升 → kicker 淡入 → 联系行展开。
- **滚动揭示**：IntersectionObserver 加 `.in`，按 `--i` 错峰；逐节不同性格（标题上升、图像 clip-path/缩放点亮、数字计数、细线绘制），非统一淡入。
- **画廊**：作品默认微暗（未打光），hover 提亮上浮（被聚光）；桌面端柔光光标跟随（gallery spotlight 签名）。
- **其它**：作品视差（rAF，轻）、关键词跑马灯、磁吸联系按钮、顶部滚动进度细线。
- **Reduced motion**：关闭视差/聚光/颗粒动画/计数，揭示降级为即时；所有动效有 `@media (prefers-reduced-motion: reduce)` 替代。

## Layout
容器 max ~1240px，留白用 `clamp()` 呼吸、节奏有疏密；画廊与跑马灯可通栏。构图允许非对称、为强调破格。响应式：移动端单列、字阶收敛防溢出，聚光/视差等指针特性在触屏关闭。
