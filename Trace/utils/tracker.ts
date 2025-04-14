import { MonitorConfig, BatchLog ,ErrorLog, MonitorLog, MonitorTypeLog } from "../interface";
import getLogBaseData from "./getLogBaseData";
class Tracker {
  url: string;

  constructor() {
    // 上报日志服务器地址（服务器上的 gif 图片）
    this.url = "http://localhost:8080/send/monitor.gif";
  }

  private realtimeQueue: any[] = [];
  private batchQueue: any[] = [];
  private batchConfig = { delay: 5000, maxItems: 10 };

  initStrategy(config?: MonitorConfig["sendStrategy"]) {
    this.batchConfig = {
      ...this.batchConfig,
      ...config?.batch,
    };

    // 批量发送定时器
    setInterval(() => {
      if (this.batchQueue.length > 0) {
        this.flushBatch();
      }
    }, this.batchConfig.delay);
  }

  send(data: MonitorTypeLog) {
    const isError = data.type === "error";
    const isXhrError = isError && (data as ErrorLog).errorType === "xhrError";
    const useRealtime = isError && (isXhrError || (data as ErrorLog).errorType === "jsError");

    if (useRealtime) {
      this.realtimeQueue.push(data);
      this.flushRealtime();
    } else {
      this.batchQueue.push(data);
      // 当达到阈值时立即发送
      if (this.batchQueue.length >= this.batchConfig.maxItems) {
        this.flushBatch();
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

    const batchData:BatchLog = {
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
}

export default new Tracker();
