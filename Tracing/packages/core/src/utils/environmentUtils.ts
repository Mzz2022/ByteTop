import { isWindow } from './typeUtils';

// 确定当前是否处于不同的环境中
/**
 * 是否为浏览器环境
 */
export const isBrowserEnv = (): boolean => typeof window !== 'undefined' && isWindow(window); //强化类型检查

/**
 * 是否为 Electron 环境
 */
export const isElectronEnv = (): boolean => typeof window !== 'undefined' && !!window.process?.versions?.electron; //强化类型检查

/**
 * 是否为测试环境
 */
export const isTestEnv = (): boolean => ( //强化类型检查
  (typeof navigator !== 'undefined' && navigator.userAgent.includes('jsdom')) ||
  (typeof window !== 'undefined' && (window as any).jsdom)
);

/**
 * 获取全局变量
 */
export function getGlobal(): Window | {} {
  if (isBrowserEnv() || isElectronEnv() || isTestEnv()) { // 使用统一的条件结构 明确辨别不同的环境
    return window;
  }
  return {};
}

/**
 * 初始化并获取全局支持对象
 */
function initializeGlobals(): Window | {} { //合并全局变量的初始化和获取
  const global = getGlobal();
  (global as any).__ByteTopSDK__ = (global as any).__ByteTopSDK__ || {};
  return global;
}

/**
 * 获取全部变量 __ByteTopSDK__ 的引用地址
 */
export function getGlobalSupport(): any {
  return _support;
}

/**
 * 判断 SDK 是否初始化
 * @returns SDK 是否初始化
 */
export function isInit(): boolean {
  return !!(_global as any).__ByteTopSDKInit__;
}

const _global = initializeGlobals();
const _support = (_global as any).__ByteTopSDK__;

export { _global, _support };
