interface CheckWhiteScreenOptions {
  /** 采样点数量 (默认: 20) */
  sampleCount?: number;
  /** 空白点判定阈值 (0-1, 默认 0.8) */
  threshold?: number;
  /** 排除的骨架屏类名 (默认: 'skeleton') */
  skeletonClass?: string;
}

const checkWhiteScreen = (options?: CheckWhiteScreenOptions): boolean => {
  const config = {
    sampleCount: 20,
    threshold: 0.8,
    skeletonClass: "skeleton",
    ...options,
  };

  try {
    // 1. 排除骨架屏场景
    if (document.getElementsByClassName(config.skeletonClass).length > 0) {
      return false;
    }

    // 2. 动态检测根节点
    const rootSelectors = ["#root", "#app", "#main", "#container"];
    const rootNode =
      rootSelectors.find((selector) => document.querySelector(selector)) ||
      "body";
    const wrapperSet = new Set(["html", "body", rootNode.toLowerCase()]);

    // 3. 黄金比例采样算法
    const goldenRatio = 0.618;
    const points = Array.from({ length: config.sampleCount }, (_, i) => ({
      x:
        i % 2 === 0
          ? window.innerWidth * goldenRatio * Math.random()
          : window.innerWidth - window.innerWidth * goldenRatio * Math.random(),
      y: window.innerHeight * goldenRatio * Math.random(),
    }));

    // 4. 采样点检测
    let emptyCount = 0;
    points.forEach((point) => {
      const element = document.elementFromPoint(point.x, point.y);
      if (!element) {
        emptyCount++;
        return;
      }

      const identifiers = [
        element.tagName.toLowerCase(),
        element.id ? `#${element.id}` : "",
        ...Array.from(element.classList).map((c) => `.${c}`),
      ];

      if (identifiers.some((id) => wrapperSet.has(id))) {
        emptyCount++;
      }
    });

    console.log("emptyCount", emptyCount, " config:", config);
    // 5. 阈值判断
    return emptyCount / config.sampleCount >= config.threshold;
  } catch (e) {
    console.error("[白屏检测异常]", e);
    return false;
  }
};

export default checkWhiteScreen;

// // 自定义配置
// const isWhite = checkWhiteScreen({
//   sampleCount: 30,
//   threshold: 0.75,
//   skeletonClass: 'loading-skeleton'
// });

// // 移动端适配配置
// checkWhiteScreen({
//   sampleCount: 15,  // 减少采样点
//   threshold: 0.7    // 降低阈值
// });

// // 后台管理系统
// checkWhiteScreen({
//   skeletonClass: 'ant-skeleton' // 匹配UI框架
// });

// // 高精度检测
// checkWhiteScreen({
//   sampleCount: 50,  // 增加采样密度
//   threshold: 0.9    // 严格判定
// });
