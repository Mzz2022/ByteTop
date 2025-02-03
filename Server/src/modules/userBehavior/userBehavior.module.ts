import { Module } from '@nestjs/common';
import { UserBehaviorController } from './userBehavior.controller.js';
import { UserBehaviorService } from './userBehavior.service.js';

@Module({
  controllers: [UserBehaviorController],
  providers: [UserBehaviorService],
  exports: [UserBehaviorService],
})
export class UserBehaviorModule {}
