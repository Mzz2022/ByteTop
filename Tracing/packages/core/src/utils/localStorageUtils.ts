import { deepAssign } from '../utils';

export interface SendData {
  baseInfo: object
  eventInfo: unknown[]
}

/**
 * 操作 localStorage 的工具类
 */
export class LocalStorageUtil {
  static readonly MAX_SIZE = 5 * 1024 * 1024; // 5 MB 调整为大写常量 使用正确单位

  /**
   * 从 localStorage 获取一个项
   * @param key 要获取的项的键
   * @returns 从 localStorage 解析出的值，若不存在则返回 null
   */
  static getItem<T>(key: string): T | null { // 增加泛型支持 提升类型推导
    try {   // 错误处理
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error(`从 localStorage 获取键 "${key}" 时发生错误`, e);
      return null;
    }
  }

  /**
   * 在 localStorage 中设置一项
   * @param key 要设置的项的键
   * @param value 要存储的值
   */
  static setItem(key: string, value: any): void {
    try {   //错误处理
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`在 localStorage 存储键 "${key}" 时发生错误`, e);
    }
  }

  /**
   * 从 localStorage 中移除一项
   * @param key 要移除的项的键
   */
  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * 获取 localStorage 中项目的总大小
   * @returns 总大小（字节数）
   */
  static getSize(): number {
    let size = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (value) {
          size += this.getBytes(value);
        }
      }
    }
    return size;
  }

  /**
   * 存储 SendData 对象至 localStorage 
   * 将现有数据与新数据组合并检查存储大小限制
   * @param key 用于存储数据的键
   * @param value 新的 SendData 对象
   * @returns 操作是否成功的布尔值
   */
  static setSendDataItem(key: string, value: SendData): boolean {
    if (this.getSize() >= this.MAX_SIZE) {
      console.warn('LocalStorageUtil：超过最大存储限制，数据未存储');
      return false;
    }

    const localItem = this.getItem<SendData>(key) || { baseInfo: {}, eventInfo: [] };

    const newItem: SendData = {
      baseInfo: deepAssign(localItem.baseInfo, value.baseInfo),
      eventInfo: [...localItem.eventInfo, ...value.eventInfo] // 使用展开运算符来简化数组连接
    };

    this.setItem(key, newItem);
    return true;
  }

  /**
   * 计算字符串的字节大小
   * @param str 要计算的字符串
   * @returns 字节大小
   */
  private static getBytes(str: string): number {
    return new Blob([str]).size; // 直接返回 Blob 的大小
  }
}
