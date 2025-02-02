import { sandbox } from "../src/utils/sandbox"
import { describe, test, expect, vi } from "vitest"

describe("沙箱安全机制", () => {
	const mockContext = {
		pluginName: "test-plugin",
		reportError: vi.fn(),
	}

	test("应允许访问白名单全局对象", () => {
		const safeAccess = sandbox(() => {
			return Math.PI
		}, mockContext)

		expect(safeAccess()).toBe(Math.PI)
	})

	test("应拦截未授权全局访问", () => {
		const dangerousAccess = sandbox(() => {
			return window.location.href
		}, mockContext)

		expect(() => dangerousAccess()).toThrowError("window is not defined")
		expect(mockContext.reportError).toHaveBeenCalledWith(
			expect.objectContaining({
				message: expect.stringContaining("window"),
			}),
		)
	})

	test("应正确捕获异步错误", async () => {
		const asyncError = sandbox(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
			throw new Error("async error")
		}, mockContext)

		await expect(asyncError()).rejects.toThrow("async error")
		expect(mockContext.reportError).toHaveBeenCalledWith(expect.any(Error))
	})

	test("应拦截window和document访问", () => {
		const testCases = [
			{
				code: () => window,
				error: /window is not defined/,
			},
			{
				code: () => document.createElement("div"),
				error: /document is not defined/,
			},
			{
				code: () => localStorage,
				error: /localStorage is not defined/,
			},
		]

		for (const { code, error } of testCases) {
			const fn = sandbox(code, mockContext)
			expect(() => fn()).toThrowError(error)
			expect(mockContext.reportError).toHaveBeenCalledWith(
				expect.objectContaining({
					message: expect.stringMatching(error),
				}),
			)
		}
	})
})
