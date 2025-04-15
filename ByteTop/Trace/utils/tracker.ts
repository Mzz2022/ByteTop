class Tracker {
  private idleQueue: any[] = [];
  private isIdleScheduled = false;

  // 在 initStrategy 方法中添加
  initStrategy(config: SendStrategyConfig = {}) {
    // ... 现有代码 ...

    // 空闲调度策略
    if (config.idle) {
      this.setupIdleScheduler(config.idle);
    }
  }

  private setupIdleScheduler(config: {
    timeout?: number;
    maxTasksPerIdle?: number;
  }) {
    const processIdleQueue = (deadline: IdleDeadline) => {
      while (
        (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
        this.idleQueue.length > 0
      ) {
        const task = this.idleQueue.shift();
        const maxTasks = config.maxTasksPerIdle || 5;

        // 批量处理任务
        const tasksToProcess = this.idleQueue.splice(0, maxTasks);
        this.sendToServer(tasksToProcess);
      }

      if (this.idleQueue.length > 0) {
        this.scheduleIdleProcessing(config.timeout);
      } else {
        this.isIdleScheduled = false;
      }
    };

    // 兼容性处理
    if (typeof requestIdleCallback === "function") {
      this.scheduleIdleProcessing(config.timeout);
    } else {
      // 回退到 setTimeout
      setInterval(() => {
        if (this.idleQueue.length > 0) {
          const tasks = this.idleQueue.splice(0, config.maxTasksPerIdle || 5);
          this.sendToServer(tasks);
        }
      }, 1000);
    }
  }

  private scheduleIdleProcessing(timeout?: number) {
    if (!this.isIdleScheduled) {
      (window as any).requestIdleCallback(
        processIdleQueue,
        { timeout: timeout || 1000 } // 默认1秒超时
      );
      this.isIdleScheduled = true;
    }
  }

  // 修改 send 方法
  send(data: any) {
    // ... 现有实时/批量逻辑 ...

    // 空闲队列处理
    if (this.currentStrategy.idle) {
      this.idleQueue.push(data);
      if (!this.isIdleScheduled) {
        this.scheduleIdleProcessing(this.currentStrategy.idle.timeout);
      }
    }
  }
}
