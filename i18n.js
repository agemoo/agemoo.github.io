export const DEFAULT_LANGUAGE = 'en';
export const STORAGE_KEY = 'portfolio-language';
export const I18N_CACHE_KEY = '20260729-personal-site';
export const PAGE_KEYS = ['home', 'vertex', 'campus', 'hotel', 'visual', 'outside'];

const en = {
  title: 'Mukun Sun | Communication, Community, and Music',
  description: 'A professional and personal portfolio of communication, community work, visual projects, education, music, and photography by Mukun Sun.',
  metadata: {
    home: {
      title: 'Mukun Sun | Communication, Community, and Music',
      description: 'A professional and personal portfolio of communication, community work, visual projects, education, music, and photography by Mukun Sun.',
      imageAlt: 'International Museum Day banner designed for Wuhan Museum',
    },
    vertex: {
      title: 'Vertex Reddit Internship Evidence | Mukun Sun',
      description: "A scoped, bilingual evidence record for Mukun Sun's Reddit community operations internship at Vertex Marketing.",
    },
    campus: {
      title: 'Campus Integrated Campaign | Mukun Sun',
      description: 'Promotion coordination for campus welcome and New Year events across online and offline channels.',
    },
    hotel: {
      title: 'Hotel 脳 Jazz | Mukun Sun',
      description: 'Event concept, partner coordination, WeChat promotion, and visual identity for a hotel and jazz collaboration.',
    },
    visual: {
      title: 'Selected Visual Work | Mukun Sun',
      description: 'A selected archive of posters, print design, event visuals, and photography by Mukun Sun.',
    },
    outside: {
      title: 'Outside Work | Mukun Sun',
      description: 'Music, photography, and places that shape how Mukun Sun pays attention to people and atmosphere.',
    },
  },
  navLabels: { home: 'Primary navigation', vertex: 'Project navigation' },
  attributes: {
    '#nav .lang-switch': { 'aria-label': 'Language' },
    '#nav .compact-nav summary': { 'aria-label': 'Open section navigation' },
    '#nav .compact-links': { 'aria-label': 'Section navigation' },
    '#experience .experience-media img': { alt: 'Mukun Sun supporting an English writing class in Wuhan' },
    '#projects .project-row:nth-child(1) img': { alt: 'A large campus gala audience facing a lit stage' },
    '#projects .project-row:nth-child(2) img': { alt: 'Jazz musicians performing at a hotel beside an upright bass' },
    '#projects .project-row:nth-child(3) img': { alt: 'HOTONE tenth-anniversary product poster for the Ampero II Stomp' },
    '#outside-work .outside-card:nth-child(1) img': { alt: 'Mukun Sun performing upright bass on stage' },
    '#outside-work .outside-card:nth-child(2) img': { alt: 'Night photograph of a white bass guitar against a tree' },
    '#vertex-nav .lang-switch': { 'aria-label': 'Language' },
    '#vertex-nav .compact-nav summary': { 'aria-label': 'Open project navigation' },
    '#vertex-nav .compact-links': { 'aria-label': 'Project sections' },
  },
  alts: {
    'portrait.jpg': 'Portrait of Mukun Sun',
    'jazz_winter.jpg': 'Winter Jazz Concert key visual poster designed for a hotel jazz event',
    'hotone_main.jpg': 'HOTONE tenth-anniversary product poster for the Ampero II Stomp',
    'hotone_guitar.jpg': 'HOTONE product poster featuring an electric guitar and effects processor',
    'hotone_pedal.jpg': 'HOTONE Ampero II Stomp product-detail poster',
    'jazz_coast_a.jpg': 'Coastline JAZZ NIGHT concert poster in magenta and deep blue',
    'jazz_coast_b.jpg': 'Coastline JAZZ NIGHT poster variation in orange and dark red',
    'piano_a.jpg': 'Minimal PIANO DUO concert poster',
    'piano_b.jpg': 'PIANO DUO concert poster variation',
    'trifold_out.jpg': 'Laoshan folk-arts trifold brochure exterior',
    'trifold_in.jpg': 'Laoshan folk-arts trifold brochure interior',
    'banner_museum.jpg': 'International Museum Day banner for Wuhan Museum',
    'bass1.jpg': 'Night photograph of a white bass guitar against a tree',
    'bass2.jpg': 'Bass guitar atmosphere photography, study two',
    'bass3.jpg': 'Bass guitar atmosphere photography, study three',
  },
  copy: {
    '#nav .brand': 'Mukun Sun<span class="en">孙慕坤</span>',
    '#nav .links': '<a href="#about">About</a><a href="#experience">Work</a><a href="#outside-work">Outside Work</a><a href="#contact">Contact</a>',
    '#nav .compact-nav summary': 'Sections',
    '#nav .compact-links': '<a href="#about">About</a><a href="#experience">Work</a><a href="#outside-work">Outside Work</a><a href="#contact">Contact</a>',
    '.hero h1': 'Mukun Sun',
    '.hero .role': 'Communication, community, and music.',
    '.hero .scrollcue': 'Scroll to explore<span class="bar" aria-hidden="true"></span>',
    '#about .stitle': 'About Me',
    '#about .about-copy p:nth-child(1)': 'I study Strategic Communication at Southern Utah University, with a minor in Business Analytics. My work spans social media, community operations, visual communication, and event promotion. I like learning how an audience actually behaves before deciding what to make.',
    '#about .about-copy p:nth-child(2)': 'Outside work, I play upright and electric bass in SUU ensembles. Music has also taken me into concert planning, photography, and the small details that make an event feel memorable.',
    '#vertex-nav .brand': 'Mukun Sun<span class="en">Vertex Evidence</span>',
    '#vertex-nav .links': '<a href="#vertex-scope">Scope</a><a href="#vertex-evidence">Evidence</a><a href="#vertex-attribution">Attribution</a>',
    '#vertex-nav .compact-nav summary': 'Sections',
    '#vertex-nav .compact-links': '<a href="#vertex-scope">Scope</a><a href="#vertex-evidence">Evidence</a><a href="#vertex-community">Community</a><a href="#vertex-attribution">Attribution</a><a href="../index.html#experience">Portfolio index</a>',
    '#vertex-nav .back-link': '← Portfolio index',
    '#experience .placard': 'Internship Experience',
    '#experience .experience-row--vertex .experience-company': 'Vertex Marketing',
    '#experience .experience-row--vertex .experience-role': 'Reddit Community Operations Intern',
    '#experience .experience-row--vertex .experience-dates': '2026 · Current',
    '#experience .experience-row--vertex .experience-responsibility': 'I participate in Reddit community operations across consumer technology, smart-home, lifestyle, finance, and family-oriented communities, adapting content and interaction to subreddit rules, audience context, and visible performance.',
    '#experience .experience-row--teaching .experience-company': 'Southern Utah University × Wuhan Polytechnic University',
    '#experience .experience-row--teaching .experience-role': 'English Writing Teaching Assistant',
    '#experience .experience-row--teaching .experience-dates': 'May 2026',
    '#experience .experience-row--teaching .experience-responsibility': 'Supported an SUU instructor in English writing courses serving 200+ students in Wuhan. Provided bilingual classroom support, managed attendance and assignment grading, delivered written feedback, and organized final-grade data and course completion reporting in Excel.',
    '#experience .experience-proofline': '<strong>5</strong> representative accounts · <strong>793K</strong> representative views · up to <strong>91.7%</strong> U.S. audience share',
    '#experience .experience-attribution': '<strong>Attribution:</strong> These figures describe representative account assets and representative content I participated in operating; they are not all net-new results created during my internship.',
    '#experience .experience-link': 'View internship evidence <span aria-hidden="true">→</span>',
    '#vertex-hero': `<p class="eyebrow">Vertex Marketing · Internship Evidence</p>
      <h1>Reddit community operations, with the evidence boundary made visible.</h1>
      <p class="hero-deck">A scoped record of representative account assets and content I participated in operating during my Reddit Community Operations internship.</p>
      <p class="hero-meta">Reddit Community Operations Intern · 2026 · Current</p>`,
    '#vertex-scope': `<h2 id="vertex-scope-title">Scope</h2>
      <div class="section-copy">
        <p>This review covers five representative Reddit accounts and 16 representative posts available during the internship. I participated in operating and analyzing content across consumer technology, smart-home, lifestyle, finance, family, and other communities.</p>
        <p class="evidence-note">The selection is an evidence sample, not a complete account census and not a claim that all visible performance was generated after I joined.</p>
      </div>`,
    '#vertex-evidence': `<h2 id="vertex-evidence-title">Evidence table</h2>
      <div class="section-copy">
        <table class="evidence-table"><tbody>
          <tr><th scope="row">Accounts</th><td><strong>5</strong> representative accounts</td></tr>
          <tr><th scope="row">Account history</th><td><strong>15,433</strong> cumulative Karma</td></tr>
          <tr><th scope="row">Contributions</th><td><strong>472</strong> cumulative contributions</td></tr>
          <tr><th scope="row">Visible views</th><td><strong>793K</strong> views across 15 view-visible representative posts</td></tr>
          <tr><th scope="row">Engagement</th><td><strong>3,548</strong> upvotes and <strong>482</strong> comments across 16 representative posts</td></tr>
          <tr><th scope="row">Single-post peak</th><td><strong>406K</strong> views / <strong>891</strong> upvotes / <strong>90</strong> comments / <strong>100%</strong> upvote ratio</td></tr>
          <tr><th scope="row">Audience</th><td><strong>91.7%</strong> highest observed U.S. audience share</td></tr>
          <tr><th scope="row">Community coverage</th><td>At least <strong>15</strong> communities</td></tr>
        </tbody></table>
      </div>`,
    '#vertex-community': `<h2 id="vertex-community-title">Community context</h2>
      <div class="section-copy">
        <p>The representative activity spans broad-interest and vertical communities. I adapted research, content, and interaction to each Subreddit's rules and audience language, and participated in early setup and moderation work for an official brand community.</p>
        <ul class="community-list" aria-label="Representative community themes"><li>Consumer technology</li><li>Smart home</li><li>Gaming</li><li>Programming</li><li>Finance</li><li>Food &amp; drink</li><li>Parenting</li><li>Mental health</li><li>Relationships</li><li>Careers</li></ul>
      </div>`,
    '#vertex-attribution': `<h2 id="vertex-attribution-title">Attribution boundary</h2>
      <div class="section-copy">
        <div class="boundary-grid">
          <article><h3>Historical account assets</h3><p>The aggregate figures include account history and representative content that existed before or outside my individual internship contributions.</p></article>
          <article><h3>Net-new internship outcomes</h3><p>This page does not isolate or quantify net-new performance created during the internship. Those outcomes require separate, time-bounded tracking.</p></article>
        </div>
        <p class="ownership-note">I participated in operating and analyzing the representative accounts and content. This page does not claim sole ownership of the aggregate performance.</p>
      </div>`,
    '.marquee .track': '<span>Community Operations<span class="mut">·</span>Teaching<span class="mut">·</span>Campaigns<span class="mut">·</span>Jazz Performance<span class="mut">·</span>Visual Communication<span class="mut">·</span></span><span>Community Operations<span class="mut">·</span>Teaching<span class="mut">·</span>Campaigns<span class="mut">·</span>Jazz Performance<span class="mut">·</span>Visual Communication<span class="mut">·</span></span>',
    '#projects .stitle': 'Projects',
    '#projects .section-intro': 'Three selected routes into campaign coordination, event promotion, and visual communication.',
    '#projects .project-row:nth-child(1) .project-copy strong': 'Campus Integrated Campaign',
    '#projects .project-row:nth-child(1) .project-copy span': 'Promotion coordination for campus welcome and New Year events across online and offline channels.',
    '#projects .project-row:nth-child(1) .project-action': 'View project <span aria-hidden="true">→</span>',
    '#projects .project-row:nth-child(2) .project-copy strong': 'Hotel × Jazz Brand Event',
    '#projects .project-row:nth-child(2) .project-copy span': 'Event concept, partner coordination, WeChat promotion, and visual identity for a hotel × jazz collaboration.',
    '#projects .project-row:nth-child(2) .project-action': 'View project <span aria-hidden="true">→</span>',
    '#projects .project-row:nth-child(3) .project-copy strong': 'Selected Visual Work',
    '#projects .project-row:nth-child(3) .project-copy span': 'A selected archive of posters, print design, event visuals, and photography.',
    '#projects .project-row:nth-child(3) .project-action': 'View project <span aria-hidden="true">→</span>',
    '#edu .stitle': 'Education',
    '#edu .edu-entry:nth-child(1) .edu-school': 'Southern Utah University',
    '#edu .edu-entry:nth-child(1) .edu-dates': 'Aug 2025 — May 2027',
    '#edu .edu-entry:nth-child(1) .edu-degree': 'B.S. in Strategic Communication',
    '#edu .edu-entry:nth-child(1) .edu-secondary': 'Minor · Business Analytics',
    '#edu .edu-entry:nth-child(1) .edu-focus': 'Coursework: Social Media Strategy, Social Media Branding, Strategic Campaigns, Content Creation, Statistical Inference, Data Analytics.',
    '#edu .edu-entry:nth-child(2) .edu-school': 'Wuhan Polytechnic University',
    '#edu .edu-entry:nth-child(2) .edu-dates': 'Sep 2023 — Jun 2025',
    '#edu .edu-entry:nth-child(2) .edu-degree': 'B.A. in Advertising',
    '#edu .edu-entry:nth-child(2) .edu-secondary': 'Degree awarded upon completion at SUU',
    '#edu .edu-entry:nth-child(2) .edu-focus': 'Coursework: Writing for Communication, Digital Copy Layout &amp; Design, Advertising Investigation &amp; Analysis, Organizational Communication.',
    '#outside-work .stitle': 'Outside Work',
    '#outside-work .section-intro': 'Music, photography, and places shape how I pay attention to people and atmosphere.',
    '#outside-work .outside-card:nth-child(1) strong': 'Music',
    '#outside-work .outside-card:nth-child(1) p': 'Upright and electric bass performance, ensemble work, and the planning behind live events.',
    '#outside-work .outside-card:nth-child(2) strong': 'Photography',
    '#outside-work .outside-card:nth-child(2) p': 'Small studies in performance, objects, light, and atmosphere.',
    '#outside-work .outside-card:nth-child(3) strong': 'Places',
    '#outside-work .outside-card:nth-child(3) p': 'Notes from cities and landscapes that sharpen how I notice culture, rhythm, and everyday detail.',
    '#outside-work .outside-action': 'Explore outside work <span aria-hidden="true">→</span>',
    '#contact h2': 'Get in touch.',
    '#contact .contact-intro': 'You can reach me by email or LinkedIn.',
    '#contact .contact-action:nth-child(1) .contact-label': 'Email Me',
    '#contact .contact-action:nth-child(2) .contact-label': 'LinkedIn',
    '#contact .sign': '— Mukun Sun / 孙慕坤',
    '#site-footer span:first-child': '© 2026 Mukun Sun',
    '#vertex-footer span:first-child': 'Mukun Sun · Vertex internship evidence',
    '#vertex-footer span:last-child': 'Representative account scope · 2026',
  },
};

const zh = {
  title: '孙慕坤｜传播、社群与音乐',
  description: '孙慕坤的个人网站：社交媒体与社群运营、传播项目、视觉作品、教育经历，以及音乐与摄影。',
  metadata: {
    home: {
      title: '孙慕坤｜传播、社群与音乐',
      description: '孙慕坤的个人网站：社交媒体与社群运营、传播项目、视觉作品、教育经历，以及音乐与摄影。',
      imageAlt: '为武汉博物馆设计的国际博物馆日活动横幅',
    },
    vertex: {
      title: 'Vertex Reddit 实习证据 | 孙慕坤',
      description: '孙慕坤在 Vertex Marketing 参与 Reddit 社区运营实习的双语证据记录，明确区分代表账号历史资产与实习期间新增成果。',
    },
    campus: {
      title: '校园整合传播｜孙慕坤',
      description: '面向校园迎新与新年活动的线上线下宣传协调项目。',
    },
    hotel: {
      title: '酒店 脳 爵士｜孙慕坤',
      description: '一场酒店与爵士合作活动的概念策划、合作方协调、微信推广与视觉识别。',
    },
    visual: {
      title: '视觉作品精选｜孙慕坤',
      description: '孙慕坤的海报、印刷设计、活动视觉与摄影作品精选。',
    },
    outside: {
      title: '工作之外｜孙慕坤',
      description: '音乐、摄影与地方经验，以及它们如何影响孙慕坤对人和氛围的观察。',
    },
  },
  navLabels: { home: '主导航', vertex: '项目导航' },
  attributes: {
    '#nav .lang-switch': { 'aria-label': '语言' },
    '#nav .compact-nav summary': { 'aria-label': '打开章节导航' },
    '#nav .compact-links': { 'aria-label': '章节导航' },
    '#experience .experience-media img': { alt: '孙慕坤在武汉协助英语写作课堂' },
    '#projects .project-row:nth-child(1) img': { alt: '大型校园晚会观众面向灯光舞台' },
    '#projects .project-row:nth-child(2) img': { alt: '爵士乐手在酒店演出，旁边摆放着低音提琴' },
    '#projects .project-row:nth-child(3) img': { alt: 'HOTONE Ampero II Stomp 十周年产品海报' },
    '#outside-work .outside-card:nth-child(1) img': { alt: '孙慕坤在舞台上演奏低音提琴' },
    '#outside-work .outside-card:nth-child(2) img': { alt: '白色贝斯倚靠树干的夜色摄影' },
    '#vertex-nav .lang-switch': { 'aria-label': '语言' },
    '#vertex-nav .compact-nav summary': { 'aria-label': '打开项目导航' },
    '#vertex-nav .compact-links': { 'aria-label': '项目章节' },
  },
  alts: {
    'portrait.jpg': '孙慕坤 Mukun Sun 肖像照',
    'jazz_winter.jpg': '为酒店爵士演出设计的冬日爵士主视觉海报',
    'hotone_main.jpg': 'HOTONE Ampero II Stomp 十周年产品海报',
    'hotone_guitar.jpg': '电吉他与效果器构成的 HOTONE 产品海报',
    'hotone_pedal.jpg': 'HOTONE Ampero II Stomp 产品特写海报',
    'jazz_coast_a.jpg': '洋红与深蓝配色的海岸线 JAZZ NIGHT 演出海报',
    'jazz_coast_b.jpg': '暖橙与暗红配色的海岸线 JAZZ NIGHT 海报变体',
    'piano_a.jpg': '极简 PIANO DUO 演出海报',
    'piano_b.jpg': 'PIANO DUO 演出海报变体',
    'trifold_out.jpg': '崂山民艺文化三折页外页',
    'trifold_in.jpg': '崂山民艺文化三折页内页',
    'banner_museum.jpg': '武汉博物馆国际博物馆日活动 Banner',
    'bass1.jpg': '白色贝斯倚靠树干的夜色氛围摄影',
    'bass2.jpg': '贝斯氛围摄影系列之二',
    'bass3.jpg': '贝斯氛围摄影系列之三',
  },
  copy: {
    '#nav .brand': '孙慕坤<span class="en">Mukun&nbsp;Sun</span>',
    '#nav .links': '<a href="#about">关于</a><a href="#experience">工作</a><a href="#outside-work">工作之外</a><a href="#contact">联系</a>',
    '#nav .compact-nav summary': '章节',
    '#nav .compact-links': '<a href="#about">关于</a><a href="#experience">工作</a><a href="#outside-work">工作之外</a><a href="#contact">联系</a>',
    '.hero h1': '孙慕坤',
    '.hero .role': '传播、社区与音乐。',
    '.hero .scrollcue': '向下浏览<span class="bar" aria-hidden="true"></span>',
    '#about .stitle': '关于我',
    '#about .about-copy p:nth-child(1)': '我在南犹他大学学习战略传播，辅修商业分析。我的实践涉及社交媒体、社群运营、视觉传播和活动推广。我习惯先理解受众实际如何参与，再决定要做什么内容。',
    '#about .about-copy p:nth-child(2)': '工作之外，我在 SUU 的乐团中演奏低音提琴和电贝斯。音乐也让我参与音乐会策划、摄影，以及那些真正影响一场活动体验的细节。',
    '#vertex-nav .brand': '孙慕坤<span class="en">Vertex 实习证据</span>',
    '#vertex-nav .links': '<a href="#vertex-scope">范围</a><a href="#vertex-evidence">证据</a><a href="#vertex-attribution">归因</a>',
    '#vertex-nav .compact-nav summary': '章节',
    '#vertex-nav .compact-links': '<a href="#vertex-scope">范围</a><a href="#vertex-evidence">证据</a><a href="#vertex-community">社区</a><a href="#vertex-attribution">归因</a><a href="../index.html#experience">返回作品集</a>',
    '#vertex-nav .back-link': '← 返回作品集',
    '#experience .placard': '实习经历',
    '#experience .experience-row--vertex .experience-company': 'Vertex Marketing',
    '#experience .experience-row--vertex .experience-role': 'Reddit 社区运营实习生',
    '#experience .experience-row--vertex .experience-dates': '2026 · 至今',
    '#experience .experience-row--vertex .experience-responsibility': '我参与运营消费科技、智能家居、生活方式、金融与家庭等方向的 Reddit 社区内容，并根据 Subreddit 规则、受众语境与可见表现调整内容和互动方式。',
    '#experience .experience-row--teaching .experience-company': '南犹他大学 × 武汉轻工大学',
    '#experience .experience-row--teaching .experience-role': '英语写作课程助教',
    '#experience .experience-row--teaching .experience-dates': '2026 年 5 月',
    '#experience .experience-row--teaching .experience-responsibility': '在武汉协助 SUU 教师为 200 多名学生开展英语写作课程，提供中英双语课堂支持；负责考勤、作业评分与书面反馈，并使用 Excel 整理期末成绩和课程完成情况。',
    '#experience .experience-proofline': '<strong>5</strong> 个代表账号 · <strong>793K</strong> 代表内容浏览量 · 最高 <strong>91.7%</strong> 美国受众占比',
    '#experience .experience-attribution': '<strong>归因说明：</strong>这些数据来自我参与运营的代表账号资产与代表内容，并非全部都是实习期间新增的个人成果。',
    '#experience .experience-link': '查看实习证据 <span aria-hidden="true">→</span>',
    '#vertex-hero': `<p class="eyebrow">Vertex Marketing · 实习证据</p>
      <h1>展示 Reddit 社区运营，也把证据边界说清楚。</h1>
      <p class="hero-deck">这是一份范围明确的证据记录，展示我在 Reddit 社区运营实习期间参与运营的代表账号资产与代表内容。</p>
      <p class="hero-meta">Reddit 社区运营实习生 · 2026 · 至今</p>`,
    '#vertex-scope': `<h2 id="vertex-scope-title">盘点范围</h2>
      <div class="section-copy">
        <p>本次盘点覆盖实习期间可接触的 5 个代表账号与 16 条代表内容。我参与运营和分析消费科技、智能家居、生活方式、金融、家庭等不同社区中的内容。</p>
        <p class="evidence-note">这是一组代表性证据样本，并非全部账号统计，也不表示所有可见表现都产生于我入职之后。</p>
      </div>`,
    '#vertex-evidence': `<h2 id="vertex-evidence-title">证据表</h2>
      <div class="section-copy">
        <table class="evidence-table"><tbody>
          <tr><th scope="row">账号</th><td><strong>5</strong> 个代表账号</td></tr>
          <tr><th scope="row">账号历史</th><td><strong>15,433</strong> 累计 Karma</td></tr>
          <tr><th scope="row">内容贡献</th><td><strong>472</strong> 条累计 Contributions</td></tr>
          <tr><th scope="row">可见浏览量</th><td>15 条可见浏览量的代表内容累计 <strong>793K</strong> 浏览</td></tr>
          <tr><th scope="row">互动</th><td>16 条代表内容累计 <strong>3,548</strong> 点赞与 <strong>482</strong> 评论</td></tr>
          <tr><th scope="row">单帖峰值</th><td><strong>406K</strong> 浏览 / <strong>891</strong> 点赞 / <strong>90</strong> 评论 / <strong>100%</strong> Upvote Ratio</td></tr>
          <tr><th scope="row">受众</th><td>单帖美国受众占比最高 <strong>91.7%</strong></td></tr>
          <tr><th scope="row">社区覆盖</th><td>至少 <strong>15</strong> 个社区</td></tr>
        </tbody></table>
      </div>`,
    '#vertex-community': `<h2 id="vertex-community-title">社区语境</h2>
      <div class="section-copy">
        <p>代表性活动覆盖泛兴趣与垂直社区。我根据不同 Subreddit 的规则与受众语言调整调研、内容和互动方式，也参与一个品牌官方社区的早期搭建与管理工作。</p>
        <ul class="community-list" aria-label="代表社区主题"><li>消费科技</li><li>智能家居</li><li>游戏</li><li>编程</li><li>金融</li><li>食品饮料</li><li>母婴</li><li>心理健康</li><li>家庭关系</li><li>职业发展</li></ul>
      </div>`,
    '#vertex-attribution': `<h2 id="vertex-attribution-title">归因边界</h2>
      <div class="section-copy">
        <div class="boundary-grid">
          <article><h3>历史账号资产</h3><p>汇总数据包含在我个人实习贡献之前或之外已经存在的账号历史与代表内容。</p></article>
          <article><h3>实习期间新增成果</h3><p>本页不单独量化实习期间新增的表现；这部分成果需要按明确时间范围另行追踪。</p></article>
        </div>
        <p class="ownership-note">我参与运营和分析这些代表账号与代表内容；本页不主张由我一人承担这些汇总表现的全部归属。</p>
      </div>`,
    '.marquee .track': '<span>社群运营<span class="mut">·</span>教学<span class="mut">·</span>活动传播<span class="mut">·</span>爵士演奏<span class="mut">·</span>视觉传播<span class="mut">·</span></span><span>社群运营<span class="mut">·</span>教学<span class="mut">·</span>活动传播<span class="mut">·</span>爵士演奏<span class="mut">·</span>视觉传播<span class="mut">·</span></span>',
    '#projects .stitle': '项目',
    '#projects .section-intro': '三条精选入口，分别呈现活动统筹、推广与视觉传播。',
    '#projects .project-row:nth-child(1) .project-copy strong': '校园整合传播',
    '#projects .project-row:nth-child(1) .project-copy span': '为迎新晚会、元旦晚会等校园活动协调线上线下宣发。',
    '#projects .project-row:nth-child(1) .project-action': '查看项目 <span aria-hidden="true">→</span>',
    '#projects .project-row:nth-child(2) .project-copy strong': '酒店 × 爵士品牌活动',
    '#projects .project-row:nth-child(2) .project-copy span': '为酒店 × 爵士合作完成活动概念、合作方协调、微信推广与视觉识别。',
    '#projects .project-row:nth-child(2) .project-action': '查看项目 <span aria-hidden="true">→</span>',
    '#projects .project-row:nth-child(3) .project-copy strong': '精选视觉作品',
    '#projects .project-row:nth-child(3) .project-copy span': '海报、印刷设计、活动视觉与摄影作品精选。',
    '#projects .project-row:nth-child(3) .project-action': '查看项目 <span aria-hidden="true">→</span>',
    '#edu .stitle': '教育经历',
    '#edu .edu-entry:nth-child(1) .edu-school': '南犹他州立大学',
    '#edu .edu-entry:nth-child(1) .edu-dates': '2025.08 — 2027.05',
    '#edu .edu-entry:nth-child(1) .edu-degree': '战略传播理学学士（在读）',
    '#edu .edu-entry:nth-child(1) .edu-secondary': '辅修 · 商业分析',
    '#edu .edu-entry:nth-child(1) .edu-focus': '课程：社交媒体策略、社交媒体品牌、战略传播活动、内容创作、统计推断、数据分析。',
    '#edu .edu-entry:nth-child(2) .edu-school': '武汉轻工大学',
    '#edu .edu-entry:nth-child(2) .edu-dates': '2023.09 — 2025.06',
    '#edu .edu-entry:nth-child(2) .edu-degree': '广告学文学学士',
    '#edu .edu-entry:nth-child(2) .edu-secondary': '完成 SUU 学位后同步授予',
    '#edu .edu-entry:nth-child(2) .edu-focus': '课程：传播写作、数字文案编排与设计、广告调查与分析、组织传播。',
    '#outside-work .stitle': '工作之外',
    '#outside-work .section-intro': '音乐、摄影与地方经历，塑造了我观察人与氛围的方式。',
    '#outside-work .outside-card:nth-child(1) strong': '音乐',
    '#outside-work .outside-card:nth-child(1) p': '低音提琴与电贝斯演奏、乐团合作，以及现场活动背后的策划。',
    '#outside-work .outside-card:nth-child(2) strong': '摄影',
    '#outside-work .outside-card:nth-child(2) p': '对演出、物件、光线与氛围的小型观察。',
    '#outside-work .outside-card:nth-child(3) strong': '地方',
    '#outside-work .outside-card:nth-child(3) p': '来自城市与风景的记录，让我更敏锐地观察文化、节奏与日常细节。',
    '#outside-work .outside-action': '探索工作之外 <span aria-hidden="true">→</span>',
    '#contact h2': '联系我。',
    '#contact .contact-intro': '你可以通过电子邮件或 LinkedIn 联系我。',
    '#contact .contact-action:nth-child(1) .contact-label': '给我发邮件',
    '#contact .contact-action:nth-child(2) .contact-label': 'LinkedIn',
    '#contact .sign': '— 孙慕坤 / Mukun Sun',
    '#site-footer span:first-child': '© 2026 孙慕坤',
    '#vertex-footer span:first-child': '孙慕坤 · Vertex 实习证据',
    '#vertex-footer span:last-child': '代表账号范围 · 2026',
  },
};

export const LANGUAGES = { en, zh };

function getPageKey(doc) {
  const key = doc?.documentElement?.dataset?.page;
  return PAGE_KEYS.includes(key) ? key : 'home';
}

export function normalizeLanguage(value) {
  return value === 'zh' ? 'zh' : DEFAULT_LANGUAGE;
}

export function getInitialLanguage(storage = globalThis.localStorage) {
  try { return normalizeLanguage(storage?.getItem(STORAGE_KEY)); }
  catch { return DEFAULT_LANGUAGE; }
}

export function applyLanguage(value, doc = globalThis.document, storage = globalThis.localStorage, persist = false) {
  const language = normalizeLanguage(value);
  const config = LANGUAGES[language];
  const pageKey = getPageKey(doc);
  const metadata = config.metadata[pageKey] ?? config.metadata.home;
  doc.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  doc.documentElement.dataset.language = language;
  doc.title = metadata.title;
  const meta = doc.querySelector('meta[name="description"]');
  if (meta) meta.content = metadata.description;
  if (metadata.imageAlt) {
    const openGraphImageAlt = doc.querySelector('meta[property="og:image:alt"]');
    const twitterImageAlt = doc.querySelector('meta[name="twitter:image:alt"]');
    if (openGraphImageAlt) openGraphImageAlt.content = metadata.imageAlt;
    if (twitterImageAlt) twitterImageAlt.content = metadata.imageAlt;
  }
  const nav = doc.querySelector('.nav');
  if (nav) nav.setAttribute('aria-label', config.navLabels[pageKey] ?? config.navLabels.home);
  for (const [selector, html] of Object.entries(config.copy)) {
    const element = doc.querySelector(selector);
    if (element) element.innerHTML = html;
  }
  for (const [file, alt] of Object.entries(config.alts)) {
    const image = doc.querySelector(`img[src$="${file}"]`);
    if (image) image.setAttribute('alt', alt);
  }
  for (const [selector, attributes] of Object.entries(config.attributes)) {
    const element = doc.querySelector(selector);
    if (!element) continue;
    for (const [name, text] of Object.entries(attributes)) element.setAttribute(name, text);
  }
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
  const language = getInitialLanguage(localStorage);
  applyLanguage(language);
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang, document, localStorage, true));
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}
