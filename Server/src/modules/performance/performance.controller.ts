import { Controller, Post, Body } from "@nestjs/common";
import { PerformanceService } from "./performance.service.js";

@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Post()
  async collect(@Body() data: any) {
    // TODO: 实现性能数据收集
    return { success: true };
  }
} 