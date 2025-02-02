// -内核基础架构 - 插件生命周期管理 - 跨插件通信总线 - 异常隔离沙箱
import { EventBus } from "./events"
import { PluginManager } from "./plugins"
import type { WebClient } from "./types"

const { CoreErrorPlugin } = PluginManager

export class Client {
	public readonly interface: WebClient = (action, type, handler?) => {
		if (action === "on") {
			this.eventBus.subscribe(type, handler!)
		} else if (action === "emit") {
			this.eventBus.dispatch(type, handler)
		}
	}
	private plugins = new PluginManager(this.interface)
	private eventBus = new EventBus()

	constructor() {
		this.initCorePlugins()
	}

	private initCorePlugins() {
		// 内置核心插件
		this.plugins.register(CoreErrorPlugin)
	}

	public use(plugin: (client: WebClient) => void) {
		plugin(this.interface)
	}
}
