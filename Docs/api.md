## 配置参数
| 参数名          | 类型     | 默认值    | 说明                     |
|-----------------|----------|-----------|--------------------------|
| `plugins`       | string[] | 必填      | 需启用的插件列表         |
| `sendStrategy`  | object   | `{}`      | 上报策略配置             |
| `realtime`      | boolean  | false     | 是否实时上报             |
| `batch.delay`   | number   | 5000      | 批量上报延迟(毫秒)       |
| `batch.maxItems`| number   | 10        | 批量上报最大数量         |
| `userBehavior`  | object   | `{}`      | 用户行为监控配置         |
| `exposureThreshold` | number | 0.5      | 曝光面积占比阈值(0-1)    |
| `eventWhitelist` | string[] | ['click', 'dblclick', 'submit'] | 自定义事件白名单         |