import { createServer } from "http";
import { parse } from "url";

const server = createServer((req, res) => {
  // 新增数据打印逻辑
  const parsedUrl = parse(req.url, true);
  if (parsedUrl.query.data) {
    try {
      const monitorData = JSON.parse(decodeURIComponent(parsedUrl.query.data));
      console.log("接收监控数据：", JSON.stringify(monitorData, null, 2));
    } catch (e) {
      console.log("非法数据格式");
    }
  }
  // 允许跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    // 处理预检请求
    res.writeHead(204);
    res.end();
  } else {
    
    if (req.url.startsWith("/error")) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error, code is 500.");
    } else {
      // 处理正常请求
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello, world!");
    }
  }
});

server.listen(8080, () => console.log("Server running on port 8080"));