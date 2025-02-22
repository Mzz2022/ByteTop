// networkUtils.ts

interface NetworkInformation {
  effectiveType: string;
}

function getNetworkType(): string {
  const defaultType = 'unknown';

  // 检查并断言 navigator.connection 类型
  const connection = (navigator as any).connection as NetworkInformation | undefined;

  if (!connection || !connection.effectiveType) {
    return defaultType;
  }

  const networkTypeMap: Record<string, string> = {
    '4g': 'cellular_4g',
    '3g': 'cellular_3g',
    '2g': 'cellular_2g',
    'wifi': 'wifi'
  };

  // 根据网络类型映射获取对应的描述
  return networkTypeMap[connection.effectiveType] || defaultType;
}

export { getNetworkType };
