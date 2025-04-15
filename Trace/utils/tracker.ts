import {
  MonitorConfig,
  BatchLog,
  ErrorLog,
  MonitorLog,
  MonitorTypeLog,
  batchConfig,
  SendStrategyConfig,
} from "../interface";
import getLogBaseData from "./getLogBaseData";
class Tracker {
  url: string;
  // 添加空闲队列和状态标识
  private idleQueue: any[] = [];
  private isIdleScheduled = false;
  constructor() {
    // 上报日志服务器地址（服务器上的 gif 图片）
    this.url = "http://localhost:8080/send/monitor.gif";
  }

  private realtimeQueue: any[] = [];
  private batchQueue: any[] = [];
  private batchConfig = { delay: 5000, maxItems: 10 };

  // 添加当前策略配置存储
  private currentStrategy?: SendStrategyConfig;

  initStrategy(config?: MonitorConfig["sendStrategy"]) {
    // 存储当前策略配置
    this.currentStrategy = config;

    this.batchConfig = {
      ...this.batchConfig,
      ...config?.batch,
    };

    // 批量发送定时器（中优先级）
    // 保证数据在合理延迟内发送，防止数据积压
    setInterval(() => {
      if (this.batchQueue.length > 0) {
        this.flushBatch();
      }
    }, this.batchConfig.delay);
    // 空闲调度器（低优先级）
    // 只在浏览器空闲时处理，可能延迟更久但性能更好
    if (config?.idle) {
      this.setupIdleScheduler(config.idle);
    }
  }

  // 新增空闲调度器
  private setupIdleScheduler(
    config: { timeout?: number; maxTasksPerIdle?: number } = {}
  ) {
    if ("requestIdleCallback" in window) {
      this.scheduleIdleProcessing(config.timeout);
    } else {
      // 兼容处理：不支持requestIdleCallback时使用setTimeout
      setInterval(() => {
        if (this.idleQueue.length > 0) {
          const tasks = this.idleQueue.splice(0, config.maxTasksPerIdle || 5);
          this.sendToServer(tasks);
        }
      }, 1000);
    }
  }
  // 新增空闲调度器
  private scheduleIdleProcessing(timeout?: number) {
    if (!this.isIdleScheduled) {
      // 添加类型断言和 polyfill 处理
      const idleCallback =
        window.requestIdleCallback ||
        function (handler) {
          const start = Date.now();
          setTimeout(() => {
            handler({
              didTimeout: false,
              timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
            });
          }, 1);
        };

      idleCallback(
        (deadline: IdleDeadline) => {
          // 添加时间利用率检查
          const maxTasks = Math.min(
            5, // 默认最大数量
            Math.floor(deadline.timeRemaining() / 2) // 根据剩余时间动态调整
          );

          const tasksToProcess = this.idleQueue.splice(0, maxTasks);

          if (tasksToProcess.length > 0) {
            this.sendToServer(tasksToProcess);
          }

          if (this.idleQueue.length > 0) {
            this.scheduleIdleProcessing(timeout);
          } else {
            this.isIdleScheduled = false;
          }
        },
        { timeout: timeout || 1000 }
      );
      this.isIdleScheduled = true;
    }
  }

  send(data: MonitorTypeLog) {
    const isError = data.type === "error";
    const isXhrError = isError && (data as ErrorLog).errorType === "xhrError";
    const useRealtime =
      isError && (isXhrError || (data as ErrorLog).errorType === "jsError");

    if (useRealtime) {
      this.realtimeQueue.push(data);
      this.flushRealtime();
    } else {
      // 添加空闲队列处理分支
      if (this.currentStrategy?.idle) {
        this.idleQueue.push(data);
        if (!this.isIdleScheduled) {
          this.scheduleIdleProcessing(this.currentStrategy.idle?.timeout);
        }
      } else {
        this.batchQueue.push(data);
        if (this.batchQueue.length >= this.batchConfig.maxItems) {
          this.flushBatch();
        }
      }
    }
  }

  private flushRealtime() {
    while (this.realtimeQueue.length) {
      const data = this.realtimeQueue.shift();
      this.originalSend(data); // 调用原有发送逻辑
    }
  }

  private flushBatch() {
    if (this.batchQueue.length === 0) return;
    // 取出全部待发送数据
    const sendItems = this.batchQueue.splice(0, this.batchQueue.length);

    const batchData: BatchLog = {
      type: "batch",
      items: sendItems,
    };
    this.originalSend(batchData);
  }

  private originalSend(data: any) {
    // 原有发送逻辑保持不变
    const baseData = getLogBaseData();
    const log = { baseLog: baseData, ...data };
    const img = new Image();
    img.src = `${this.url}?data=${encodeURIComponent(JSON.stringify(log))}`;
  }

  // 新增批量发送方法
  private sendToServer(tasks: any[]) {
    const batchData: BatchLog = {
      type: "batch",
      items: tasks,
    };
    this.originalSend(batchData);
  }
}

export default new Tracker();
