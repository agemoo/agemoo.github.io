export const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'portfolio-language';

const enCopy = {
  'access.skip': 'Skip to selected work',
  'nav.work': 'Work',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'hero.eyebrow': 'Mukun Sun · Social media operations & marketing',
  'hero.title': 'I turn community context into clearer, safer marketing decisions.',
  'hero.deck': 'Currently working with Vertex Marketing on Reddit community operations, content analysis, and an evidence-aware editorial workflow.',
  'hero.cta': 'View current work',
  'hero.resume': 'Résumé ↗',
  'hero.availability': 'Strategic Communication + Business Analytics · Southern Utah University',
  'work.eyebrow': 'Selected work',
  'work.title': 'Evidence before decoration.',
  'vertex.eyebrow': '01 / Current Internship',
  'vertex.title': 'Building a more evidence-aware community operations workflow',
  'vertex.role': 'Vertex Marketing · Social Media Operations Internship · 2026',
  'vertex.scope': 'I support community operations across consumer technology, smart-home, lifestyle, finance, and family categories, adapting execution to subreddit rules, audience context, and visible content performance.',
  'vertex.portfolioLabel': 'Representative account portfolio',
  'vertex.attribution': 'Portfolio context—not solely post-hire growth. These figures describe representative historical assets from accounts I participated in operating and analyzing.',
  'vertex.metric.accounts': '5 representative accounts',
  'vertex.metric.karma': '15,433 cumulative Karma',
  'vertex.metric.contributions': '472 historical contributions · 226 posts + 246 comments',
  'vertex.metric.views': '793K cumulative views across 15 pieces with visible view counts',
  'vertex.metric.upvotes': '3,548 upvotes across 16 representative pieces',
  'vertex.metric.comments': '482 comments across 16 representative pieces',
  'vertex.evidence.peakLabel': 'Peak observed post',
  'vertex.metric.peakViews': '406K views · 891 upvotes · 90 comments · 100% upvote ratio',
  'vertex.evidence.audienceLabel': 'Audience signal',
  'vertex.metric.usAudience': 'Highest observed US audience share: 91.7% · activity across at least 15 communities',
  'vertex.workflow.eyebrow': 'Self-initiated workflow',
  'vertex.workflow.title': 'Community-Aware Comment Drafting & QA Workflow',
  'vertex.workflow.description': 'I developed a reusable editorial QA workflow for my own work: extract context, inventory facts, check community and brand safety, choose a commentable hook, generate candidates, reject factual or AI-sounding output, and validate the 25–35 word requirement.',
  'vertex.workflow.step1': 'Extract context',
  'vertex.workflow.step2': 'Inventory facts',
  'vertex.workflow.step3': 'Check community fit',
  'vertex.workflow.step4': 'Run brand-safety gate',
  'vertex.workflow.step5': 'Select a concrete hook',
  'vertex.workflow.step6': 'Draft candidates',
  'vertex.workflow.step7': 'Reject weak output',
  'vertex.workflow.step8': 'Validate and review',
  'vertex.workflow.boundary': 'This workflow supports human review. It does not post, vote, or manage accounts, and I do not claim team adoption or measured efficiency gains.',
  'case.learning': 'What changed in my practice',
  'vertex.learning': 'This work taught me to separate historical account assets from personally attributable outcomes, and to treat AI as editorial support rather than a substitute for community judgment.',
  'track.eyebrow': '02 / Academic strategy · In progress',
  'track.title': 'Track & Traction: designing a social launch around a real audience',
  'track.role': 'Social Media Strategies · Southern Utah University · 2026',
  'track.summary': 'A course project that translates audience research into channel roles, content pillars, publishing cadence, and a measurement plan for a motorsport concept.',
  'track.status': '<strong>Status:</strong> Strategy and creative system in progress. Any reach, engagement, or conversion figures shown in planning materials are targets—not campaign results.',
  'track.learning': '<strong>Current value:</strong> a documented reasoning chain from audience insight to content choice, with success criteria defined before publishing.',
  'jazz.eyebrow': '03 / Event communication',
  'jazz.title': 'Turning live jazz into a coherent venue story',
  'jazz.role': 'Ni Jazz Bar × Fengmao Andun Hotel · 2024',
  'jazz.summary': 'I helped coordinate a venue collaboration and shaped the event’s poster and editorial narrative so a one-night performance could support a longer “hotel × arts” brand association.',
  'jazz.result': 'reads on the promotional article; later reposted by Wuhan Cultural Tourism Group’s official account.',
  'jazz.caption': 'Winter Jazz Concert · key visual and poster design ↗',
  'experiments.eyebrow': 'Experiments',
  'experiments.title': 'Small systems, tested in context.',
  'experiments.wechat.title': 'WeChat mini program',
  'experiments.wechat.body': 'Designed and shipped a functional mini program prototype in roughly two weeks, using AI-assisted development while retaining manual product and content decisions.',
  'experiments.analysis.title': 'Content analysis',
  'experiments.analysis.body': 'Use visible post signals, community norms, and structured spreadsheets to turn scattered observations into reviewable editorial choices.',
  'creative.eyebrow': 'Creative archive',
  'creative.title': 'Selected visual work.',
  'creative.hotone1': 'HOTONE · product advertising ↗',
  'creative.hotone2': 'HOTONE · product detail ↗',
  'creative.jazz': 'Jazz Night · poster series ↗',
  'creative.print': 'Eshan folk arts · print design ↗',
  'about.eyebrow': 'About',
  'about.title': 'A communicator who likes traceable decisions.',
  'about.body': 'I study Strategic Communication with a minor in Business Analytics at Southern Utah University. My work sits between community context, editorial judgment, visual production, and the discipline to say what the evidence can—and cannot—prove.',
  'about.cap1': 'Community operations & platform-native writing',
  'about.cap2': 'Content analysis & reporting',
  'about.cap3': 'Campaign and event communication',
  'about.cap4': 'Graphic design, photography & short-form production',
  'contact.eyebrow': 'Contact',
  'contact.title': 'Let’s make the next decision easier to explain.',
  'contact.cta': 'Start a conversation →',
  'footer.top': 'Back to top ↑',
  'archive.fact1': '19,000 campaign impressions',
  'archive.fact2': '525+ promotional article reads',
};

const zhCopy = {
  'access.skip': '跳转至精选作品',
  'nav.work': '作品',
  'nav.about': '关于',
  'nav.contact': '联系',
  'hero.eyebrow': '孙慕坤 · 社交媒体运营与营销',
  'hero.title': '我把社区语境转化为更清晰、更稳妥的营销判断。',
  'hero.deck': '目前在 Vertex Marketing 参与 Reddit 社区运营、内容分析，并开发一套重视证据的编辑工作流。',
  'hero.cta': '查看当前工作',
  'hero.resume': '英文简历 ↗',
  'hero.availability': '战略传播主修 + 商业分析辅修 · 南犹他州立大学',
  'work.eyebrow': '精选作品',
  'work.title': '先讲证据，再谈装饰。',
  'vertex.eyebrow': '01 / 当前实习',
  'vertex.title': '建立一套更重视证据的海外社区运营工作流',
  'vertex.role': 'Vertex Marketing · 社交媒体运营实习 · 2026',
  'vertex.scope': '我参与消费科技、智能家居、生活方式、金融与家庭等方向的海外社区运营，根据 Subreddit 规则、受众语境和可见内容表现调整执行方式。',
  'vertex.portfolioLabel': '代表性账号资产',
  'vertex.attribution': '账号资产背景，并非全部属于入职后增长。这些数字描述的是我参与运营和分析的代表性账号历史资产。',
  'vertex.metric.accounts': '5 个代表性账号',
  'vertex.metric.karma': '15,433 累计 Karma',
  'vertex.metric.contributions': '472 条历史贡献 · 226 帖子 + 246 评论',
  'vertex.metric.views': '15 条可见浏览量内容累计 793K 浏览',
  'vertex.metric.upvotes': '16 条代表内容累计 3,548 点赞',
  'vertex.metric.comments': '16 条代表内容累计 482 评论',
  'vertex.evidence.peakLabel': '单帖峰值',
  'vertex.metric.peakViews': '406K 浏览 · 891 点赞 · 90 评论 · 100% 好评率',
  'vertex.evidence.audienceLabel': '受众信号',
  'vertex.metric.usAudience': '单帖美国受众占比最高 91.7% · 覆盖至少 15 个社区',
  'vertex.workflow.eyebrow': '自主开发的工作流',
  'vertex.workflow.title': '社区语境评论撰写与质量检查工作流',
  'vertex.workflow.description': '我为自己的工作开发了一套可复用的编辑质检流程：提取语境、建立事实清单、检查社区适配与品牌安全、选择具体切入点、生成候选、剔除事实错误或 AI 腔内容，并验证 25–35 词要求。',
  'vertex.workflow.step1': '提取语境',
  'vertex.workflow.step2': '建立事实清单',
  'vertex.workflow.step3': '检查社区适配',
  'vertex.workflow.step4': '执行品牌安全检查',
  'vertex.workflow.step5': '选择具体切入点',
  'vertex.workflow.step6': '起草候选内容',
  'vertex.workflow.step7': '剔除低质量输出',
  'vertex.workflow.step8': '验证并人工审核',
  'vertex.workflow.boundary': '这套工作流服务于人工审核，不会自动发帖、投票或管理账号；我也不声称它已被团队采用或产生经过测量的效率提升。',
  'case.learning': '它如何改变了我的工作方式',
  'vertex.learning': '这段工作让我开始严格区分历史账号资产与个人可归因成果，也让我把 AI 定位为编辑辅助，而不是社区判断的替代品。',
  'track.eyebrow': '02 / 课程策略项目 · 进行中',
  'track.title': 'Track & Traction：围绕真实受众设计社交媒体发布方案',
  'track.role': 'Social Media Strategies · 南犹他州立大学 · 2026',
  'track.summary': '一个把受众研究转化为渠道分工、内容支柱、发布节奏与衡量方案的课程项目，主题为赛车文化概念。',
  'track.status': '<strong>状态：</strong>策略与创意系统仍在进行。策划材料中的触达、互动或转化数字均为目标，并非活动结果。',
  'track.learning': '<strong>当前价值：</strong>形成一条从受众洞察到内容选择的可追溯推理链，并在发布前定义成功标准。',
  'jazz.eyebrow': '03 / 活动传播',
  'jazz.title': '让现场爵士成为连贯的场地品牌故事',
  'jazz.role': 'Ni Jazz Bar × 风貌安坻酒店 · 2024',
  'jazz.summary': '我协助促成场地合作，并设计活动海报与编辑叙事，让一晚演出支持更长期的“酒店 × 艺术”品牌联想。',
  'jazz.result': '活动推广文章阅读，之后获武汉文旅集团官方账号转载。',
  'jazz.caption': '冬日爵士音乐会 · 主视觉与海报设计 ↗',
  'experiments.eyebrow': '实验项目',
  'experiments.title': '在真实语境中测试小型系统。',
  'experiments.wechat.title': '微信小程序',
  'experiments.wechat.body': '约两周内设计并发布可用的小程序原型。AI 辅助开发，但产品与内容判断始终由我完成。',
  'experiments.analysis.title': '内容分析',
  'experiments.analysis.body': '结合可见帖子信号、社区规范与结构化表格，把零散观察转化为可复核的编辑判断。',
  'creative.eyebrow': '创意档案',
  'creative.title': '精选视觉作品。',
  'creative.hotone1': 'HOTONE · 产品广告 ↗',
  'creative.hotone2': 'HOTONE · 产品特写 ↗',
  'creative.jazz': 'Jazz Night · 海报系列 ↗',
  'creative.print': '峨山民艺 · 印刷设计 ↗',
  'about.eyebrow': '关于我',
  'about.title': '一个偏爱可追溯判断的传播者。',
  'about.body': '我在南犹他州立大学主修战略传播、辅修商业分析。我的工作连接社区语境、编辑判断、视觉制作，以及清楚说明证据能够与不能够证明什么的纪律。',
  'about.cap1': '社区运营与平台原生写作',
  'about.cap2': '内容分析与报告',
  'about.cap3': '整合传播与活动执行',
  'about.cap4': '平面设计、摄影与短视频制作',
  'contact.eyebrow': '联系',
  'contact.title': '一起让下一个判断更容易被解释。',
  'contact.cta': '开始交流 →',
  'footer.top': '返回顶部 ↑',
  'archive.fact1': '19,000 impressions 活动传播展示',
  'archive.fact2': '525+ 活动推广文章阅读',
};

export const LANGUAGES = {
  en: {
    title: 'Mukun Sun | Social Media Operations & Marketing',
    description: "Mukun Sun's bilingual portfolio in social media operations, community strategy, campaign execution, and visual communication.",
    navLabel: 'Primary navigation',
    copy: enCopy,
  },
  zh: {
    title: '孙慕坤｜社交媒体运营与营销作品集',
    description: '孙慕坤的双语作品集：社交媒体运营、社区策略、活动执行与视觉传播。',
    navLabel: '主导航',
    copy: zhCopy,
  },
};

export function normalizeLanguage(value) {
  return value === 'zh' ? 'zh' : DEFAULT_LANGUAGE;
}

export function getInitialLanguage(storage = globalThis.localStorage) {
  try {
    return normalizeLanguage(storage?.getItem(STORAGE_KEY));
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export function applyLanguage(value, doc = globalThis.document, storage = globalThis.localStorage, persist = false) {
  const language = normalizeLanguage(value);
  const config = LANGUAGES[language];
  doc.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  doc.documentElement.dataset.language = language;
  doc.title = config.title;
  const meta = doc.querySelector('meta[name="description"]');
  if (meta) meta.content = config.description;
  const nav = doc.querySelector('.site-nav');
  if (nav) nav.setAttribute('aria-label', config.navLabel);
  for (const [key, html] of Object.entries(config.copy)) {
    const element = doc.querySelector(`[data-i18n="${key}"]`);
    if (element) element.innerHTML = html;
  }
  doc.querySelectorAll('[data-alt-en]').forEach((image) => {
    image.alt = language === 'zh' ? image.dataset.altZh : image.dataset.altEn;
  });
  doc.querySelectorAll('[data-lang]').forEach((button) => {
    const active = button.dataset.lang === language;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  if (persist) {
    try { storage?.setItem(STORAGE_KEY, language); } catch { /* Storage may be unavailable. */ }
  }
  return language;
}

function boot() {
  const language = getInitialLanguage();
  applyLanguage(language);
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang, document, localStorage, true));
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}
