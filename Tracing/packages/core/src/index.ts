export * from "./client"
export * from "./events"
export * from "./plugins"
export * from "./types"
export * from "./utils/sandbox"

// interface CoreInterface {
// 	registerPlugin(plugin: Plugin): void
// 	emitEvent(event: SDKEvent): void
// 	reportError(error: PluginError): void
// }

// function sandboxMethod(target, key, descriptor) {
// 	const original = descriptor.value
// 	descriptor.value = function (...args) {
// 		try {
// 			return original.apply(this, args)
// 		} catch (e) {
// 			this.core.reportError({ plugin: this.name, error: e })
// 		}
// 	}
// }
// type SDKEvent = {
// 	type: "CORE_INIT" | "PLUGIN_ERROR" | "DATA_REPORT"
// 	payload: unknown
// }
// 1. **内核接口定义**（2天）
//    - 设计`CoreInterface`：
//      ```typescript

//      ```
//    - 实现插件注册表`PluginRegistry`（Map结构）

// 2. **沙箱隔离系统**（3天）
//    - 使用Proxy封装插件对象，拦截非法操作
//    - 实现异常捕获装饰器：
//      ```typescript

// 3. **通信总线开发**（2天）
//    - 基于发布订阅模式实现事件总线`EventBus`
//    - 定义标准事件格式：
