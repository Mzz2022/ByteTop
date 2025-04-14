import { TimingLog } from "../interface";
import tracker from "../utils/tracker";

export default function injectTiming() {
  window.addEventListener("load", () => {
    let DOMContentLoadedTime = 0,
      loadTime = 0;

    // 新版浏览器 API：PerformanceNavigationTiming 提供了关于页面加载性能的详细信息，替代旧的 performance.timing
    if (performance.getEntriesByType) {
      const perfEntries = performance.getEntriesByType("navigation");
      if (perfEntries.length > 0) {
        const navigationEntry = perfEntries[0];
        const { domContentLoadedEventStart, loadEventStart, fetchStart } =
          navigationEntry as PerformanceNavigationTiming;

        // DOM 树构建完成后触发 DOMContentLoaded 事件
        DOMContentLoadedTime = domContentLoadedEventStart - fetchStart;
        // console.log(`DOMContentLoaded 的执行时间：${DOMContentLoadedTime}ms`);

        // 页面完整的加载时间
        loadTime = loadEventStart - fetchStart;
        // console.log(`load 页面完整的加载时间：${loadTime}ms`);
      }
    }
    // 旧版浏览器降级使用 performance.timing
    else {
      const { fetchStart, domContentLoadedEventStart, loadEventStart } = performance.timing;

      // DOM 树构建完成后触发 DOMContentLoaded 事件
      DOMContentLoadedTime = domContentLoadedEventStart - fetchStart;
      // console.log(`---DOMContentLoaded 的执行时间：${DOMContentLoadedTime}ms`);

      // 页面完整的加载时间
      loadTime = loadEventStart - fetchStart;
      // console.log(`load 页面完整的加载时间：${loadTime}ms`);
    }

    // 1、数据建模存储
    const log: TimingLog = {
      type: "timing",
      DOMContentLoadedTime,
      loadTime,
    };

    console.log("timing log: ", log);

    // 2、上报数据
    tracker.send(log);
  });
}
