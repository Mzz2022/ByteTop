
### 逻辑解耦
monitor 只监控收集原始数据，将其处理成统一的事件
Builder 将事件转换为上报数据，与平台相关联
Sender 发送，上传
ConfigManager 配置管理器，负责配置逻辑，比如合并初始配置和用户配置、拉取远端配置等功能。

回调类：只执行回调，不影响流程继续执行，比如 init / start / beforeConfig / config 等等。
处理类：执行并返回修改后的有效值，如果返回无效值，将不再往下执行，终止上报，比如 report / beforeBuild / build / beforeSend 等等。


### 插件化
