import { Controller, Post, Body } from '@nestjs/common';
import { UserBehaviorService } from './userBehavior.service';

@Controller('behavior')
export class UserBehaviorController {
  constructor(private readonly userBehaviorService: UserBehaviorService) {}

  @Post()
  async collect(@Body() data: any) {
    // TODO: 实现用户行为数据收集
    return { success: true };
  }
} 