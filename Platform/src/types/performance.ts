export interface PerformanceData {
  [hour: string]: {
    fcp: number;
    lcp: number;
    cls?: number;
    fid?: number;
    ttfb?: number;
    tti?: number;
    onload_time?: number;
    js_execution_time?: number;
    long_tasks_count?: number;
    resource_load_time?: number;
  };
}

export interface MetricOption {
  id: string;
  name: string;
  color: string;
  group: string;
}

export interface PerformanceDistributionItem {
  page: string;
  fcp: number;
  lcp: number;
  cls: number;
  fid: number;
  ttfb: number;
  tti: number;
  onloadTime: number;
  jsExecutionTime: number;
  resourceLoadTime: number;
  pageViews: number;
}
