import { ErrorLog } from "../interface";
import { formatStack } from "../utils";
import checkWhiteScreen from "../utils/checkWhiteScreen";
import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";
import tracker from "../utils/tracker";

export default function injectJSError() {
  window.addEventListener(
    "error",
    event => {
      console.log("error event: ", event);

      // 监听 JS/CSS 资源文件加载错误
      const target = event.target as HTMLScriptElement | HTMLImageElement | HTMLLinkElement | null;
      let filename;
      if (
        target &&
        (filename =
          (target as HTMLScriptElement | HTMLImageElement).src || (target as HTMLLinkElement).href)
      ) {
        // 1、数据建模存储
        const log: ErrorLog = {
          type: "error",
          errorType: "loadResourceError", // 错误类型 - JS/CSS 资源加载错误
          message: `${filename} resource loading fail.`,
          filename, // 报错的文件
          tagName: target.tagName, // 资源标签名称
          // body script
          selector: getSelector(event.target as HTMLElement),
        };

        console.log("log: ", log);

        // 2、上报数据
        tracker.send(log);
      }
      // 监听 JS 代码执行出错
      else {
        const lastEvent = getLastEvent(); // 监听到错误后，获取到最后一个交互事件
        const isWhiteScreen = checkWhiteScreen(); // 检查是否白屏
        // 1.1、数据建模存储
        const errorLog: ErrorLog = {
          // kind: "stability", // 监控指标的大类
          type: "error",
          errorType: "jsError",
          message: event.message,
          filename: event.filename,
          position: `${event.lineno}:${event.colno}`,
          stack: formatStack(event.error.stack),
          selector: lastEvent ? getSelector() : "",
          isWhiteScreen,
        };
        console.log("js error log: ", errorLog);

        // 1.2、上报数据
        tracker.send(errorLog);
      }
    },
    // !!! 使用捕获
    true,
  );

  // 2、监听未被捕获的 Promise 错误
  window.addEventListener(
    "unhandledrejection",
    event => {
      console.log("Promise error event: ", event);
      const lastEvent = getLastEvent(); // 监听到错误后，获取到最后一个交互事件

      let message;
      const reason = event.reason; // Promise 失败的原因
      let filename;
      let line = 0;
      let column = 0;
      let stack = "";
      if (typeof event.reason === "string") {
        // 情况 1、是 Promise reject 抛出的错误（没有办法获取 stack 等信息）
        message = reason;
      } else if (typeof reason === "object") {
        message = reason.message;
        // 情况 2、是 Promise 中 JS 代码执行出错
        if (reason.stack) {
          // 从错误信息中匹配到关键信息。stack 示例：at http://localhost:8080/examples/promiseError.html:29:32
          const matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
          filename = matchResult[1];
          line = matchResult[2];
          column = matchResult[3];
          stack = formatStack(reason.stack);
        }
      }

      // 2.1、数据建模存储
      const errorLog: ErrorLog = {
        type: "error",
        errorType: "promiseError", // 错误类型 - Promise 代码错误
        message,
        filename,
        position: `${line}:${column}`,
        stack,
        selector: lastEvent ? getSelector() : "",
      };

      console.log("promise error log: ", errorLog);

      // 2.2、上报数据
      tracker.send(errorLog);
    },
    true,
  );
}
