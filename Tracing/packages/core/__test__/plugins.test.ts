import { PluginManager } from "../src/plugins"
import type { WebClient } from "../src/types"
import { sandbox } from "../src/utils/sandbox"
import { describe, test, expect, vi } from "vitest"
import { ActionType, LifecycleEvent } from "../src/types"

describe("Plugin System", () => {
	const mockClient = vi.fn((type, event, payload?) => {
		if (type === ActionType.emit) {
			console.log(`[MockClient] Emit: ${event}`, payload)
		}
	}) as unknown as WebClient

	test("should prevent duplicate plugin registration", () => {
		const manager = new PluginManager(mockClient)
		const plugin = { name: "test", init: vi.fn() }

		manager.register(plugin)
		expect(() => manager.register(plugin)).toThrow("already registered")
	})

	test("should handle plugin initialization errors", () => {
		const manager = new PluginManager(mockClient)
		const error = new Error("init failed")
		const plugin = {
			name: "faulty",
			init: () => {
				throw error
			},
		}

		manager.register(plugin)
		expect(mockClient).toHaveBeenCalledWith(
			ActionType.emit,
			LifecycleEvent.error,
			expect.objectContaining({
				type: "PLUGIN_INIT_FAILED",
				plugin: "faulty",
				error,
			}),
		)
	})
})
