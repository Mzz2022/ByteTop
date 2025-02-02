interface SandboxContext {
	pluginName: string
	reportError: (error: Error) => void
}
//  biome-ignore lint/complexity/noBannedTypes: 需要通用函数类型声明
export function sandbox<T extends Function>(fn: T, context: SandboxContext): T {
	// 允许访问的安全全局对象白名单
	const safeGlobals = {
		console: Object.freeze({ ...console }),
		Date,
		Math,
		Object,
		Array,
		String,
		Number,
		Boolean,
		Error,
		TypeError,
		RangeError,
		JSON: Object.freeze({ ...JSON }),
		Promise: Object.freeze(Promise),
	}

	const wrapper = function (this: any, ...args: any[]) {
		try {
			// 通过代理只允许访问部分全局对象，防止污染全局环境；禁止document和window；
			const globalProxy = new Proxy(safeGlobals, {
				get(target, prop) {
					// 允许访问白名单属性
					if (prop in target) {
						return target[prop as keyof typeof target]
					}
					// 特殊处理undefined值
					if (prop === "undefined") return undefined
					if (
						typeof prop === "symbol" &&
						prop.toString() === "Symbol(Symbol.unscopables)"
					) {
						return undefined
					}
					// Allow access to userFn and args
					// 需要特殊处理一下
					if (prop === "userFn") {
						return fn
					}
					if (prop === "args") {
						return args
					}
					throw new Error(`禁止访问未授权的全局属性 ${String(prop)}`)
				},
				has() {
					// 阻止通过in操作符探测全局对象
					return true
				},
			})

			// 使用间接eval执行代码
			const sandboxedFn = new Function(
				"global",
				"userFn", // 重命名避免冲突
				"args",
				`return (function() { 
					with(global) { 
						return userFn.apply(this, args) 
					}
				})()`,
			)

			return sandboxedFn(globalProxy, fn, args)
		} catch (error) {
			context.reportError(error as Error)
			throw error // 保留原始错误堆栈
		}
	} as unknown as T

	return wrapper
}
