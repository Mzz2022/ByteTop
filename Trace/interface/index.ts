// 基础日志
export interface BaseLog {
  // 网页标题
  title: string;
  // 网页地址
  url: string;
  // 用户环境完整信息
  userAgent: string;
  // 浏览器
  browser: string;
  // 设备
  device: string;
  // 操作系统
  os: string;
}

// 错误日志
export interface ErrorLog {
  // type 监控类型：error（代码错误）
  type: "error";
  // 错误类型：jsError（JS 代码错误）、promiseError（Promise 错误）、loadResourceError（加载资源错误）、xhrError（API 请求错误）
  errorType: "jsError" | "promiseError" | "loadResourceError" | "xhrError";
  // 错误信息
  message: string;
  // 错误发生的文件
  filename?: string;
  // 错误发生的行列信息
  position?: string;
  // 错误堆栈信息
  stack?: string;
  // 错误发生在 DOM 到顶层元素的链路信息（使用选择器表示，如：body div#container input）
  selector?: string;
  // 是否白屏
  isWhiteScreen?: boolean;
  // 资源标签名称
  tagName?: string;
  // xhr 数据
  xhrData?: {
    eventType: "load" | "error"; // xhr 错误事件类型
    url: string; // api 路径
    method: string; // 请求方式
    header: Record<string, unknown>; // 请求头
    params: string; // 请求参数
    duration: number; // 请求时长
    status: number; // 请求状态
    response: string; // 请求结果
  };
}

// 性能指标日志
export interface PaintLog {
  // type 监控类型：性能监控
  type: "paint";
  // FP
  FP?: number;
  // FCP
  FCP?: number;
  // FMP
  FMP?: number;
  // LCP
  LCP?: number;
}

// timing 加载时间日志
export interface TimingLog {
  // type 监控类型：性能监控
  type: "timing";
  // DOMContentLoaded 的执行时间
  DOMContentLoadedTime: number;
  // load 页面完整的加载时间
  loadTime: number;
}

// longTask 长任务日志
export interface LongTaskLog {
  // type 监控类型：性能监控
  type: "longTask";
  // 开始时间
  startTime: number;
  // 持续时间
  duration: number;
  // 交互事件
  eventType?: string;
  // 操作 DOM 选择器链路
  selector?: string;
}

// 监控种类日志
export type MonitorTypeLog =
  | ErrorLog
  | PaintLog
  | TimingLog
  | LongTaskLog
  | UserBehaviorLog;

// 上报监控日志
export type MonitorLog = { baseLog: BaseLog } & MonitorTypeLog;

export interface batchConfig {
  delay: number;
  maxItems: number;
}
// 在 SendStrategyConfig 接口中添加 idle 配置
export interface SendStrategyConfig {
  realtime?: boolean;
  batch?: batchConfig;
  idle?: {
    timeout?: number;
    maxTasksPerIdle?: number;
  };
}

// 更新 MonitorConfig 结构
export interface MonitorConfig {
  plugins?: string[];
  sendStrategy?: SendStrategyConfig; // 使用更新后的配置结构
  userBehavior?: {
    eventWhitelist?: string[];
    exposureThreshold?: number;
  };
}

// 新增批量数据类型
export interface BatchLog {
  type: "batch";
  items: Array<ErrorLog | PaintLog | TimingLog | LongTaskLog>;
}
export interface UserBehaviorLog {
  type: "userBehavior";
  eventType: "click" | "pv" | "exposure";
  selector: string | null;
  pageURL: string;
  timestamp: number;
  extraData?: {
    inputType?: string;
    key?: string;
    clientX?: number;
    clientY?: number;
    formData?: Record<string, FormDataEntryValue>;
  };
  // 新增 dataExposure 属性
  dataExposure?: string;
}

export interface BehaviorConfig {
  eventWhitelist?: string[];
  exposureThreshold?: number;
}
