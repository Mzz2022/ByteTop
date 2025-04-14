export default {
  title: "ByteTop SDK 文档",
  description: "轻量级 Web 端监控 SDK 使用文档",
  themeConfig: {
    logo: "/images/logo.png",
    nav: [
      { text: "指南", link: "../trace/sdk-guide" },
      { text: "API", link: "../api" },
    ],
    sidebar: [
      {
        text: "入门指南",
        items: [
          { text: "简介", link: "../trace/sdk-guide" },
          { text: "安装", link: "../trace/sdk-install" },
        ],
      },
      {
        text: "功能模块",
        items: [
          { text: "错误监控", link: "../trace/error" },
          { text: "性能监控", link: "../trace/performance" },
          { text: "用户行为监控", link: "../trace/userBehavior" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/Mzz2022/bytetop" },
    ],
  },
};
