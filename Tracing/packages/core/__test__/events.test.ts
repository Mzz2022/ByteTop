import { EventBus } from "../src/events"
import { describe, test, expect, beforeEach, vi } from "vitest"

describe("EventBus", () => {
	let bus: EventBus

	beforeEach(() => {
		bus = new EventBus()
	})

	test("应正确订阅和触发事件", () => {
		const mockHandler = vi.fn()

		bus.subscribe("test", mockHandler)
		bus.dispatch("test", "payload")

		expect(mockHandler).toHaveBeenCalledWith("payload")
	})

	test("多个处理函数应按顺序执行", () => {
		const results: number[] = []

		bus.subscribe("order", () => results.push(1))
		bus.subscribe("order", () => results.push(2))
		bus.dispatch("order", null)

		expect(results).toEqual([1, 2])
	})

	test("应传递修改后的 payload", () => {
		bus.subscribe("transform", (payload) => payload + 1)
		bus.subscribe("transform", (payload) => payload * 2)

		const result = bus.dispatch("transform", 1)
		expect(result).toBe(4) // (1+1)*2
	})

	test("未订阅的事件不应触发处理函数", () => {
		const mockHandler = vi.fn()

		bus.subscribe("other", mockHandler)
		bus.dispatch("test", "payload")

		expect(mockHandler).not.toHaveBeenCalled()
	})

	test("处理函数抛出错误时应继续执行", () => {
		const mock1 = vi.fn().mockImplementation(() => {
			throw new Error("test error")
		})
		const mock2 = vi.fn()

		bus.subscribe("error", mock1)
		bus.subscribe("error", mock2)

		expect(() => {
			bus.dispatch("error", "payload")
		}).not.toThrow()

		expect(mock2).toHaveBeenCalled()
	})
})
