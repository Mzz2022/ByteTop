import { UserBehaviorLog, BehaviorConfig } from "../interface";
import getSelector from "../utils/getSelector";
import tracker from "../utils/tracker";

export default function injectUserBehavior(config?: BehaviorConfig) {
    const finalConfig = {
      eventWhitelist: DEFAULT_EVENT_WHITELIST,
      exposureThreshold: 0.5,
      ...config
    };
  
    const eventHandler = createEventHandler(finalConfig);
    
    // 统一注册白名单事件
    finalConfig.eventWhitelist.forEach(eventType => {
      document.addEventListener(eventType, eventHandler, {
        capture: true,
        passive: true
      });
    });
    trackPV();
    // 确保在 DOM 加载完成后执行 trackExposure
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trackExposure);
    } else {
        trackExposure();
    }
}

// 监听页面跳转（PV）
function trackPV() {
  let lastURL = location.href;
  setInterval(() => {
    if (lastURL !== location.href) {
      const log: UserBehaviorLog = {
        type: "userBehavior",
        eventType: "pv",
        pageURL: location.href,
        timestamp: Date.now(),
        selector: ""
      };
      tracker.send(log);
      lastURL = location.href;
    }
  }, 200);
}

// 曝光监听（使用Intersection Observer）
function trackExposure() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLElement;
        const log: UserBehaviorLog = {
          type: "userBehavior",
          eventType: "exposure",
          selector: getSelector(target) || null,
          pageURL: location.href,
          timestamp: Date.now(),
          // 添加 dataExposure 属性
          dataExposure: target.getAttribute('data-exposure') || undefined 
        };
        tracker.send(log);
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.5 });

  const exposureElements = document.querySelectorAll('[data-exposure]');
  if (exposureElements.length === 0) {
    console.warn('未找到带有 data-exposure 属性的元素，曝光监控可能不会生效。');
  }
  exposureElements.forEach(el => {
    observer.observe(el);
  });
}

function createEventHandler(config: BehaviorConfig) {
  // 节流缓存（处理高频事件）
  const throttleMap = new Map<string, number>();
  
  return function (e: Event) {
    // 1. 基础过滤
    if (!e.isTrusted || (e.target as HTMLElement)?.closest('.no-track')) return;

    // 2. 高频事件处理
    const now = Date.now();
    if (['mousemove', 'scroll'].includes(e.type)) {
      const lastTime = throttleMap.get(e.type) || 0;
      if (now - lastTime < 200) return;
      throttleMap.set(e.type, now);
    }

    // 3. 构建日志数据
    const target = e.target as HTMLElement;
    const log: UserBehaviorLog = {
      type: "userBehavior",
      eventType: e.type as any, // 类型安全由白名单保证
      selector: getSelector(target) || null,
      pageURL: location.href,
      timestamp: now,
      extraData: {
        // 包含事件关键信息
        ...(e instanceof InputEvent && { inputType: e.inputType }),
        ...(e instanceof KeyboardEvent && { key: e.key }),
        ...(e instanceof MouseEvent && { 
          clientX: e.clientX,
          clientY: e.clientY
        })
      }
    };

    // 4. 特殊事件处理
    if (e.type === 'submit' && e.target instanceof HTMLFormElement) {
      log.extraData = {
        ...log.extraData,
        formData: Object.fromEntries(
          (new FormData(e.target) as unknown as Iterable<[string, FormDataEntryValue]>)
        )
      };
    }

    tracker.send(log);
  };
}

const DEFAULT_EVENT_WHITELIST = [
  'click',       // 点击事件
  'dblclick',    // 双击
  'submit',      // 表单提交
  'input',       // 输入事件
  'change',      // 表单变更
  'keydown',     // 键盘事件
  'mouseenter',  // 鼠标悬停
  'mouseleave'   // 鼠标离开
];