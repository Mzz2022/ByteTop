type Handler<T = any> = (payload: T) => T

export class EventBus {
	private handlers = new Map<string, Handler[]>()

	subscribe(event: string, handler: Handler) {
		const listeners = this.handlers.get(event) || []
		listeners.push(handler)
		this.handlers.set(event, listeners)
	}

	dispatch<T>(event: string, payload: T): T {
		const handlers = this.handlers.get(event) || []
		let result = payload

		for (const handler of handlers) {
			// 使用try-catch捕获错误但不中断循环，继续执行后续处理函数
			try {
				result = handler(result)
			} catch (error) {
				console.error(`Event handler error for ${event}:`, error)
			}
		}

		return result
	}
}
