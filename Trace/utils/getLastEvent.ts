// getLastEvent.ts 记录发生错误时，最后一个交互事件
let lastEvent: Event | null;
let lastEventPath: any[];

["click", "touchstart", "mousedown", "keydown"].forEach(eventType => {
  // 埋点方式：无痕埋点 -> 全部埋点
  document.addEventListener(
    eventType,
    event => {
      lastEvent = event;
      // 新版浏览器中 event.path 已被废弃，改用 event.composedPath()
      // @ts-ignore
      lastEventPath = event.path || event.composedPath();
    },
    {
      capture: true, // 以捕获形式监听（因为默认元素的事件都是冒泡形式，如果出现阻止默认事件，在这里将监听不到）
      passive: true, // 不阻止默认事件（在第二参数 listener 中，强制不使用 preventDefault() 阻止默认事件）
    },
  );
});

// 获取最近一次的事件调用栈
export function getLastEventPath() {
  // !!! 如果要获取 event path，请使用这个方法。因为在 addListenerEvent unhandledrejection 中，
  // 通过 lastEvent.path 来获取，将无法拿到实际数据，可能跟此事件 emit 异步机制有关。
  return lastEventPath;
}

// 获取最近一次的事件
export default function getLastEvent() {
  return lastEvent;
}
