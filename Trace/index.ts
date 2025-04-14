import injectJSError from "./plugins/jsError";
import injectXHR from "./plugins/xhr";
import injectLongTask from "./plugins/longTask";
import injectPaint from "./plugins/paint";
import injectTiming from "./plugins/timing";
import tracker from "./utils/tracker";

import { BehaviorConfig, MonitorConfig, UserBehaviorLog } from "./interface";
import injectUserBehavior from "./plugins/userBehavior";
// 插件映射表
// 添加类型定义
type PluginKeys =
  | "jsError"
  | "xhr"
  | "longTask"
  | "paint"
  | "timing"
  | "userBehavior";

// 明确指定映射表类型
// 在PLUGIN_MAP中添加
type PluginFunction = (config?: any) => void;
const PLUGIN_MAP: Record<string, PluginFunction> = {
  jsError: () => injectJSError(),
  xhr: () => injectXHR(),
  longTask: () => injectLongTask(),
  paint: () => injectPaint(),
  timing: () => injectTiming(),
  userBehavior: (config?: BehaviorConfig) => injectUserBehavior(config),
};

export function initMonitor(config: MonitorConfig = {}) {
  // 初始化发送策略
  tracker.initStrategy(config.sendStrategy);

  // 插件化加载
  // 添加类型断言
  const plugins = (config.plugins || Object.keys(PLUGIN_MAP)) as PluginKeys[];

  plugins.forEach((plugin) => {
    if (PLUGIN_MAP[plugin]) {
      // 特殊处理用户行为配置
      if (plugin === "userBehavior") {
        PLUGIN_MAP[plugin](config.userBehavior);
      } else {
        PLUGIN_MAP[plugin]();
      }
    }
  });
}

// 按需初始化
initMonitor({
  plugins: ["jsError", "xhr", "longTask", "paint", "timing", "userBehavior"], // 只启用错误监控
  sendStrategy: {
    realtime: true,
    batch: {
      delay: 10000, // 10秒批量发送
      maxItems: 20, // 最多20条批量发送
    },
  },
  userBehavior: {
    // 配置项
    eventWhitelist: ["click", "submit", "dblclick"], // 白名单事件
    exposureThreshold: 0.5, // 曝光阈值
  },
});
