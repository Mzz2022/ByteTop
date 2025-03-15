import { Client } from "../src/client"
import { PluginManager } from "../src/plugins"
import { describe, test, expect, beforeEach, vi } from "vitest"
import { ActionType, LifecycleEvent } from "../src/types"

describe("Client Core", () => {
	let client: Client

	beforeEach(() => {
		client = new Client()
	})

	test("should initialize with core plugins", () => {
		expect(client).toHaveProperty("interface")
		// 验证核心错误插件是否注册
		expect(PluginManager.CoreErrorPlugin).toBeDefined()
	})

	test("should handle event subscription", () => {
		const mockHandler = vi.fn()
		client.interface(ActionType.on, LifecycleEvent.init, mockHandler)
		client.interface(ActionType.emit, LifecycleEvent.init, { data: "test" })

		expect(mockHandler).toHaveBeenCalledWith({ data: "test" })
	})

	test("should load plugins via use()", () => {
		const plugin = vi.fn()
		client.use(plugin)
		expect(plugin).toHaveBeenCalledWith(client.interface)
	})
})
