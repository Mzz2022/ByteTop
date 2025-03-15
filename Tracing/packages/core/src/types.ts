export type WebClientHandler<T = any> = (event: T) => T
export interface WebClient {
	(action: ActionType.on, type: LifecycleEvent, handler: WebClientHandler): void
	(action: ActionType.emit, type: LifecycleEvent, payload?: any): void
}

export enum LifecycleEvent {
	init = "init",
	ready = "ready",
	beforeReport = "before-report",
	afterReport = "after-report",
	error = "error",
}

export enum ActionType {
	on = "on",
	emit = "emit",
}
