const CONFIG = {
  // profile setting (required)
  profile: {
    name: "Chae, Chul Young",
    image: "/wallpaperbetter.com_3024x1964.jpg",
    role: "student",
    bio: "I believe in Think & Grow Rich",
    email: "ccy09671324@gmail.com",
    linkedin: "",
    github: "ccy00967",
    instagram: "",
  },
  projects: [
    {
      name: `ccy-blog`,
      href: "https://github.com/ccy00967/ccy0967-blog",
    },
  ],
  // blog setting (required)
  blog: {
    title: "ccy00967's blog",
    description: "Chul Young's blog",
    scheme: "light", // 'light' | 'dark' | 'system'
  },
  
  // CONFIG configration (required)
  link: "https://ccy0967-blog.vercel.app/",
  since: 2025, // If leave this empty, current year will be used.
  lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://github.com/ccy00967.png", // The link to generate OG image, don't end with a slash
  
  // notion configuration (required)
  notionConfig: {
    pageId: "22ddd0cf30bc80be8a22dac6b5af81a2",
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: "ccy00967/ccy0967-blog" || "",
      "issue-term": "og:title",
      // label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 21600 * 7, // revalidate time for [slug], index
}

module.exports = { CONFIG }
