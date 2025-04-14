import { ErrorLog } from "../interface";
import { formatStack } from "../utils";
import tracker from "../utils/tracker";

/**
 * TODO... 暂时没有使用到。
 * 收集 react render 流程上发生的错误
 */
export default function reactErrorBoundary(error: { message: string; stack: string }) {
  const matchResult = error.stack.match(/at\s+(.+):(\d+):(\d+)/) as RegExpMatchArray;
  const filename = matchResult[1],
    line = matchResult[2],
    column = matchResult[3];

  // 1、数据建模存储
  const errorLog: ErrorLog = {
    type: "error",
    errorType: "reactErrorBoundary", // 错误类型 - React render 发生的错误
    message: error.message,
    filename,
    position: `${line}:${column}`,
    stack: formatStack(error.stack),
  };

  console.log("react error log: ", errorLog);

  // 2.2、上报数据
  // tracker.send(errorLog);
}
