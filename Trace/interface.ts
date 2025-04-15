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
