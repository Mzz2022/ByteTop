import { UAParser } from "ua-parser-js";
import { BaseLog } from "../interface";

// 获取设备信息
const { browser, device, os } = UAParser(navigator.userAgent);

/**
 * getLogBaseData 获取日志基本信息
 */
export default function getLogBaseData(): BaseLog {
  return {
    title: document.title,
    url: location.href,
    userAgent: navigator.userAgent,
    browser: `${browser.name} ${browser.version}`,
    device: `${device.model} ${device.vendor}`,
    os: `${os.name} ${os.version}`,
  };
}
