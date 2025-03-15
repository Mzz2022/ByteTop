import { Controller, Post, Body } from "@nestjs/common";
import { ErrorService } from "./error.service.js";

@Controller('error')
export class ErrorController {
  constructor(private readonly errorService: ErrorService) {}

  @Post()
  async collect(@Body() data: any) {
    // TODO: 实现错误数据收集
    return { success: true };
  }
} 