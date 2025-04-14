import { PaintLog } from "../interface";
import tracker from "../utils/tracker";

export default function injectPaint() {
  if (PerformanceObserver) {
    let FP: PerformanceEntry | null = null;
    let FCP: PerformanceEntry | null = null;
    let FMP: PerformanceEntry | null = null;
    let LCP: PerformanceEntry | null = null;

    // 1、监控性能指标 FP（First Paint） 和 FCP（First Contentful Paint）
    const observerFPAndFCP = new PerformanceObserver(function (entryList) {
      const perfEntries = entryList.getEntries();
      for (const perfEntry of perfEntries) {
        if (perfEntry.name === "first-paint") {
          FP = perfEntry;
          console.log("首次像素绘制 时间：", FP?.startTime);
        } else if (perfEntry.name === "first-contentful-paint") {
          FCP = perfEntry;
          console.log("首次内容绘制 时间：", FCP?.startTime);
          observerFPAndFCP.disconnect(); // 得到 FCP 后，断开观察，不再观察了
        }
      }
    });
    // 观察 paint 相关性能指标
    observerFPAndFCP.observe({ entryTypes: ["paint"] });

    // 2、监控性能指标：FMP（First Meaningful Paint）
    const observerFMP = new PerformanceObserver(entryList => {
      const perfEntries = entryList.getEntries();
      FMP = perfEntries[0];
      console.log("首次有意义元素绘制 时间：", FMP?.startTime);
      observerFMP.disconnect(); // 断开观察，不再观察了
    });
    observerFMP.observe({ entryTypes: ["element"] });

    // 3、创建性能观察者，观察 LCP
    const observerLCP = new PerformanceObserver(entryList => {
      const perfEntries = entryList.getEntries();
      LCP = perfEntries[0];
      console.log("最大内容绘制 时间：", LCP?.startTime, perfEntries);
    });
    // 观察页面中最大内容的绘制
    observerLCP.observe({ entryTypes: ["largest-contentful-paint"] });

    // 上送性能指标
    window.addEventListener("load", () => {
      setTimeout(() => {
        // 在上报性能指标数据的时候，停止 LCP 的观察。
        observerLCP.disconnect();
        const log: PaintLog = {
          type: "paint",
          FP: FP?.startTime, // FP
          FCP: FCP?.startTime, // FCP
          FMP: FMP?.startTime, // FMP
          LCP: LCP?.startTime, // LCP
        };
        console.log("paint log: ", log);
        tracker.send(log);
      }, 3000);
    });
  }
}
