// userAgentUtils.js

function getUserAgentInfo() {
  const userAgent = navigator.userAgent;

  // 初始默认值
  let browser = "Unknown";
  let os = "Unknown";

  // 浏览器检测
  if (/Edg\/([0-9.]+)/.test(userAgent)) {
    browser = `Edge ${RegExp.$1}`;
  } else if (/OPR\/([0-9.]+)/.test(userAgent)) {
    browser = `Opera ${RegExp.$1}`;
  } else if (/Chrome\/([0-9.]+)/.test(userAgent) && !/Edg\//.test(userAgent)) {
    browser = `Chrome ${RegExp.$1}`;
  } else if (/Firefox\/([0-9.]+)/.test(userAgent)) {
    browser = `Firefox ${RegExp.$1}`;
  } else if (/Safari\/([0-9.]+)/.test(userAgent) && /Version\/([0-9.]+)/.test(userAgent)) {
    browser = `Safari ${RegExp.$1}`;
  } else if (/MSIE (\d+\.\d+);/.test(userAgent)) {
    browser = `Internet Explorer ${RegExp.$1}`;
  } else if (/Trident\/7.0;.*rv:([0-9.]+)/.test(userAgent)) {
    browser = `Internet Explorer ${RegExp.$1}`;
  }

  // 操作系统检测
  if (/Windows NT 10\.0/.test(userAgent)) {
    os = "Windows 10";
  } else if (/Windows NT 6\.3/.test(userAgent)) {
    os = "Windows 8.1";
  } else if (/Windows NT 6\.2/.test(userAgent)) {
    os = "Windows 8";
  } else if (/Windows NT 6\.1/.test(userAgent)) {
    os = "Windows 7";
  } else if (/Windows NT 6\.0/.test(userAgent)) {
    os = "Windows Vista";
  } else if (/Windows NT 5\.1/.test(userAgent)) {
    os = "Windows XP";
  } else if (/Mac OS X ([0-9_]+)/.test(userAgent)) {
    os = `macOS ${RegExp.$1.replace(/_/g, '.')}`;
  } else if (/Android ([0-9.]+)/.test(userAgent)) {
    os = `Android ${RegExp.$1}`;
  } else if (/iPhone OS ([0-9_]+)/.test(userAgent)) {
    os = `iOS ${RegExp.$1.replace(/_/g, '.')}`;
  } else if (/iPad; CPU OS ([0-9_]+)/.test(userAgent)) {
    os = `iPadOS ${RegExp.$1.replace(/_/g, '.')}`;
  } else if (/Linux/.test(userAgent)) {
    os = "Linux";
  } else if (/CrOS/.test(userAgent)) {
    os = "Chrome OS";
  }

  return { browser, os };
}

export { getUserAgentInfo };
