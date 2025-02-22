const LOG_PREFIX = '@ByteTop_SDK: ';    // 前缀

/**
 * 控制台输出信息
 * @param args 输出信息
 */
export function debug(...args: any[]): void {
    console.log(LOG_PREFIX, ...args);
}

/**
 * 控制台输出错误信息
 * @param args 错误信息
 */
export function logError(...args: any[]): void {
  console.error(LOG_PREFIX, ...args);
}
