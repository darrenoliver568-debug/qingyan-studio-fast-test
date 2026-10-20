/*
 * QingYan Studio Portfolio v1.0 — Site Data
 * ============================================
 * 集中式数据层：项目数据、媒体槽位（Media Slot）、素材映射。
 *
 * Recovery Pass 约束：
 *   - 所有未 LOCKED 内容仅保留 Placeholder，不自行编写
 *   - 替换真实素材时，只修改本文件的 media 对应字段
 *   - 不需要改动 HTML / CSS 结构
 *
 * Media Slot 约定：
 *   - 每个需要真实素材的位置有一个唯一 slotId
 *   - media[slotId] = { type: "placeholder"|"video"|"image", src, poster, alt }
 *   - type 为 "placeholder" 时页面显示占位组件
 *   - 替换时改为 { type: "video", src: "assets/video/xxx.mp4" } 即可
 */

const SITE_DATA = {

  /* ================================================================
   * 品牌信息 — LOCKED
   * ================================================================ */
  brand: {
    name: "QingYan Studio",
    person: "朱青",
    year: "2026"
  },


  /* ================================================================
   * 导航 — LOCKED 结构
   * ================================================================ */
  nav: {
    links: [
      { label: "Experience",  href: "#experience" },
      { label: "Projects",    href: "#projects" },
      { label: "AIGC Works", href: "#aigc-works" },
      { label: "About",      href: "#about" }
    ],
    cta: { label: "Contact", href: "#contact" }
  },


  /* ================================================================
   * Hero — LOCKED
   * ================================================================ */
  hero: {
    badge: "AI × Product × Creativity",
    titleLine1: "让 AI 进入工作，",
    titleLine2: "也让 AI 进入创作。",
    cardBL: {
      number: "3",
      label: "Selected AI Projects",
      linkText: "View Projects →",
      linkHref: "#projects"
    },
    cutout: {
      label: "QingYan Studio",
      linkText: "View AIGC Works →",
      linkHref: "#aigc-works"
    }
  },


  /* ================================================================
   * Experience — LOCKED（仅九州一条）
   * ================================================================ */
  experience: {
    items: [
      {
        id: "exp-jiuzhou",
        company: "北京九州文化传媒有限公司",
        role: "AI 内容生产实习生",
        period: "2026.01 – 2026.03",
        stats: [
          { value: "8", label: "部 AI 短剧" },
          { value: "280", label: "集" },
          { value: "复用", label: "团队推广" }
        ],
        body: [
          "参与 AI 短剧全流程生产，累计落地 8 部、280 集，覆盖剧本分析、视觉设计、AI 素材生成、剪辑配音等环节。",
          "在实际制作中，根据短剧的流量与付费链路分配制作资源：重点提升承担流量与转化的一卡，通过口型同步保证核心内容质量，其余部分结合关键帧处理增强动态表现，在控制时间与算力投入的同时解决平台审核问题。",
          "该方法在实际项目中验证后被领导注意并认可，随后应要求整理为关键帧处理教程，并在团队内部推广复用。"
        ],
        slots: [
          { slotId: "exp-jiuzhou-outcomes",  label: "AI 短剧 / 成片截图" },
          { slotId: "exp-jiuzhou-tutorials", label: "关键帧教程 / 团队复用证据" }
        ]
      }
    ]
  },


  /* ================================================================
   * Selected Projects — LOCKED（三项目精确文案）
   * ================================================================ */
  projects: [
    {
      id: "project-01",
      index: "01",
      titleEn: "Agent Learning & Knowledge System",
      titleZh: "Agent 方法学习与知识沉淀系统",
      status: "Ongoing Experiment",
      problem: [
        "让直播课程不止被“总结”，而是沉淀成 AI 可以继续学习和复用的知识资产。",
        "将直播课程中的 Agent 搭建演示转化为结构化知识，并通过原文核对、独立 AI 审核与历史错误复测，降低知识在 AI 整理过程中的失真。"
      ],
      tags: ["知识结构化", "方法提取", "原文核对", "独立 AI 审核", "错误复测"],
      slots: [
        { slotId: "p01-workflow",   label: "Workflow" },
        { slotId: "p01-transcript", label: "Transcript" },
        { slotId: "p01-review",     label: "Review / Regression 证据" }
      ]
    },

    {
      id: "project-02",
      index: "02",
      titleEn: "Personal AI Learning Workspace",
      titleZh: "个人 AI 学习工作台",
      status: "7 次迭代 · Personal MVP",
      problem: [
        "把“看懂了”，继续推进到记录、行动、反馈和复盘。",
        "为长期 AI 学习设计的个人工作台，将课程内容、笔记批注、行动实验与 AI 反馈放进同一个学习闭环，并通过真实使用持续迭代。"
      ],
      tags: ["33 章内容体系", "Pad 批注", "无限画布", "本地数据", "AI 反馈"],
      slots: [
        { slotId: "p02-product-ui",    label: "产品 UI" },
        { slotId: "p02-pad-annotation", label: "Pad 批注" },
        { slotId: "p02-canvas",         label: "无限画布" },
        { slotId: "p02-experiment",     label: "行动实验" }
      ]
    },

    {
      id: "project-03",
      index: "03",
      titleEn: "QingYan Multi-AI Workspace",
      titleZh: "青砚多 AI 协作工作台",
      status: "Runtime v0.1 · In Validation",
      problem: [
        "不是让更多 AI 同时工作，而是让不同 AI 在明确边界下完成一次可靠协作。",
        "将复杂任务拆分为需求定义、独立审核、受控执行与结果记录，让不同 AI 各自承担明确角色，并保留任务、审核和执行过程作为可追溯资产。"
      ],
      runtime: [
        "Human Intent", "ChatGPT", "WorkBuddy Review",
        "Codex Execution", "Execution Log", "AI Workstation"
      ],
      tags: ["任务拆解", "多 AI 分工", "独立审核", "执行边界", "过程留痕"],
      slots: [
        { slotId: "p03-multi-ai",   label: "Multi-AI Workflow" },
        { slotId: "p03-exec-log",   label: "Execution Log" },
        { slotId: "p03-workstation", label: "Workstation" }
      ]
    }
  ],


  /* ================================================================
   * AIGC Works — Film Gallery（三卡结构）
   * 卡片信息层级（LOCKED 顺序）：中文作品名 → 类型/年份 → 简介 → 荣誉 → CTA
   * 视频源均为 placeholder：接入真实素材只改 media 对应 videoSlotId 条目
   * ================================================================ */
  aigcWorks: {
    items: [
      {
        id: "aigc-jiading",
        index: "01",
        title: "嘉定的清晨",
        type: "AIGC Film",
        year: "2025",
        desc: "以嘉定地域文化与非遗技艺为主题的 AIGC 城市短片。",
        recog: "“提示未来”2025 上海国际 AIGC 短片大赛入围 · 中国好创意全国总决赛优秀奖",
        coverSlotId: "aigc-jiading-cover",
        videoSlotId: "aigc-jiading-video"
      },
      {
        id: "aigc-huisheng",
        index: "02",
        title: "回声",
        type: "公益 AIGC 短片",
        year: "2025",
        desc: "关于校园暴力的公益 AIGC 动画作品。",
        recog: "即梦 AI 放映厅 × 阿那亚海浪电影周展映",
        coverSlotId: "aigc-huisheng-cover",
        videoSlotId: "aigc-huisheng-video"
      },
      {
        id: "aigc-ziyou",
        index: "03",
        title: "自由",
        type: "AIGC Experimental Film",
        year: "2026",
        desc: "关于自由、身体与自我感知的 AIGC 影像实验。",
        recog: "个人视觉实验",
        coverSlotId: "aigc-ziyou-cover",
        videoSlotId: "aigc-ziyou-video"
      }
    ]
  },


  /* ================================================================
   * How I Work — 工作方法
   * ================================================================ */
  method: {
    principles: [
      {
        title: "自动化之前，先确认事实",
        en: "Evidence Before Automation",
        desc: "AI 输出应可追溯、可验证。在把任何 AI 能力自动化之前，先确认输入的事实基础与输出的可验证性。"
      },
      {
        title: "先跑通最小闭环",
        en: "Small Loop Before Complex System",
        desc: "不追求一次设计完整系统。先用最小成本验证一个端到端环节，再逐步扩展、封装与回测。"
      },
      {
        title: "人掌握最终决策权",
        en: "Human Control Over AI",
        desc: "AI 是协作工具。关键节点保留人工确认闸门，确保意图、价值判断与最终责任始终在人。"
      }
    ],
    loop: [
      "Human Intent", "Problem Definition", "Evidence",
      "AI Collaboration", "Review", "Iteration", "Knowledge Asset"
    ],
    loopNote: "沉淀后的 Knowledge Asset 会回到下一轮 Human Intent，形成持续改进的循环。"
  },


  /* ================================================================
   * About — 文案未 LOCKED，使用 Placeholder
   * ================================================================ */
  about: {
    statement: "[ About 文案未 LOCKED — 此处为 Placeholder，不自行编写 ]"
  },


  /* ================================================================
   * Contact — 联系方式待确认
   * ================================================================ */
  contact: {
    status: "联系方式确认中 · Contact channels to be confirmed",
    channels: []
  },


  /* ================================================================
   * MEDIA SLOTS — 媒体槽位映射
   * ================================================================
   * 替换真实素材时，只需修改下面的 media 对象。
   * 每个 key 对应页面中的一个 data-slot-id。
   *
   * ---------------------------------------------------------------
   * HERO MEDIA SLOT（最终 Hero 视觉资产入口）
   * ---------------------------------------------------------------
   * 未来外部视觉生成流程产出 Hero Video / Poster 后，直接改这里：
   *
   *   单视频（推荐 MP4）：
   *   "hero-background": {
   *     type: "video",
   *     src: "assets/video/hero.mp4",
   *     poster: "assets/img/hero-poster.jpg",
   *     objectPosition: "center 40%",        // 可选，桌面 crop
   *     objectPositionMobile: "center 30%"   // 可选，移动 crop
   *   }
   *
   *   多格式回退（WebM + MP4 source fallback）：
   *   "hero-background": {
   *     type: "video",
   *     srcs: [
   *       { src: "assets/video/hero.webm",  type: "video/webm" },
   *       { src: "assets/video/hero.mp4",   type: "video/mp4" }
   *     ],
   *     poster: "assets/img/hero-poster.jpg"
   *   }
   *
   *   纯 Poster / 静态图：
   *   "hero-background": {
   *     type: "image",
   *     src: "assets/img/hero-poster.jpg",
   *     alt: "Hero 主视觉"
   *   }
   *
   * 运行时行为（无需改 HTML / CSS）：
   *   - 渲染顺序: video → (失败) poster → (失败) 当前 cinematic scene，绝不黑屏
   *   - autoplay / muted / loop / playsinline / preload="metadata" 已内置
   *   - prefers-reduced-motion 命中时视频自动暂停，保留静态 poster
   *   - noise / vignette 等电影质感层独立于 media slot，替换时永久保留
   *   - objectPosition / objectPositionMobile 按 CSS var 注入，不绑定具体素材
   * ================================================================ */
  media: {
    /* --- Hero ---
       双视频 Cursor Reveal 模块（已验收）：
       - src       = 白天主视频（全时循环）
       - revealSrc = 夕阳 reveal 层（desktop fine-pointer 注入，soft radial mask）
       两条视频已做像素级对齐（同几何同裁切），见 HERO_ALIGNMENT_QUALITY_REPORT。 */
    "hero-background": {
      type: "video",
      src: "assets/video/hero-day-perf.mp4",
      revealSrc: "assets/video/hero-sunset.mp4",
      objectPosition: "center 50%",
      objectPositionMobile: "center 50%"
    },

    /* --- Experience / 九州 --- */
    "exp-jiuzhou-demo":      { type: "video", src: "assets/video/jiuzhou-demo.mp4", preload: "metadata" },

    /* --- Project 01 --- */
    "p01-workflow":   { type: "placeholder", label: "Workflow" },
    "p01-transcript": { type: "placeholder", label: "Transcript" },
    "p01-review":     { type: "placeholder", label: "Review / Regression 证据" },

    /* --- Project 02 --- */
    "p02-product-demo":    { type: "video", src: "../assets/video/project02-demo.mp4", preload: "metadata", controls: true, autoplay: false, muted: false, loop: false },
    "p02-product-ui":     { type: "placeholder", label: "产品 UI" },
    "p02-pad-annotation": { type: "placeholder", label: "Pad 批注" },
    "p02-canvas":         { type: "placeholder", label: "无限画布" },
    "p02-experiment":     { type: "placeholder", label: "行动实验" },

    /* --- Project 03 --- */
    "p03-multi-ai":    { type: "placeholder", label: "Multi-AI Workflow" },
    "p03-exec-log":    { type: "placeholder", label: "Execution Log" },
    "p03-workstation": { type: "placeholder", label: "Workstation" },

    /* --- AIGC Works --- */
    "aigc-jiading-cover":  { type: "image", src: "assets/images/aigc/jiading-cover.png", alt: "《嘉定的清晨》封面：晨光中的嘉定古镇与标题字样" },
    "aigc-huisheng-cover": { type: "image", src: "assets/images/aigc/huisheng-cover.png", alt: "《回声》封面：浅色背景中坐在秋千上的黑裙女孩" },
    "aigc-ziyou-cover":    { type: "image", src: "assets/images/aigc/ziyou-cover.png", alt: "《自由》封面：低头的银发精灵侧脸特写" },
    "aigc-jiading-video":  { type: "video", src: "assets/video/jiading-web.mp4", preload: "metadata" },
    "aigc-huisheng-video": { type: "video", src: "assets/video/huisheng-web.mp4", preload: "metadata" },
    "aigc-ziyou-video":    { type: "video", src: "assets/video/ziyou-web.mp4", preload: "metadata" }
  }
};
