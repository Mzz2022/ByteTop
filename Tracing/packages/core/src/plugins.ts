import {
	type WebClientHandler,
	type WebClient,
	ActionType,
	LifecycleEvent,
} from "./types"
import { sandbox } from "./utils/sandbox"

interface Plugin {
	name: string
	init: (client: WebClient) => void
	destroy?: () => void
}

export class PluginManager {
	private plugins = new Map<string, Plugin>()
	private activeHooks = new Set<WebClientHandler>()

	constructor(private client: WebClient) {}

	register(plugin: Plugin) {
		if (this.plugins.has(plugin.name)) {
			throw new Error(`Plugin ${plugin.name} already registered`)
		}
		// 执行插件初始化
		const sandboxedPlugin = this.createSandboxedPlugin(plugin)
		this.plugins.set(plugin.name, sandboxedPlugin)
		// 执行插件初始化
		this.safeCall(() => sandboxedPlugin.init(this.client), plugin.name)
	}

	private createSandboxedPlugin(plugin: Plugin): Plugin {
		const context = {
			pluginName: plugin.name,
			reportError: (error: Error) => {
				this.client(ActionType.emit, LifecycleEvent.error, {
					type: "PLUGIN_ERROR",
					plugin: plugin.name,
					error,
				})
			},
		}

		return {
			...plugin,
			init: sandbox(plugin.init.bind(plugin), context),
			destroy: plugin.destroy
				? sandbox(plugin.destroy.bind(plugin), context)
				: undefined,
		}
	}

	private safeCall(fn: () => void, pluginName: string) {
		try {
			fn()
		} catch (error) {
			this.client(ActionType.emit, LifecycleEvent.error, {
				type: "PLUGIN_INIT_FAILED",
				plugin: pluginName,
				error: error instanceof Error ? error : new Error(String(error)),
			})
		}
	}

	static CoreErrorPlugin: Plugin = {
		name: "CoreError",
		init: (client) => {
			client(ActionType.on, LifecycleEvent.error, (payload) => {
				console.error(
					`[CoreError] Plugin Error: ${payload.plugin}`,
					payload.error,
				)
			})
		},
	}
}
