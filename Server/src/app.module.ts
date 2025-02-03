import { Module } from '@nestjs/common';
import { UserBehaviorModule } from './modules/userBehavior/userBehavior.module.js';
import { ErrorModule } from './modules/error/error.module.js';
import { PerformanceModule } from './modules/performance/performance.module.js';
import { cacheModule } from './config/cache.config';

@Module({
  imports: [UserBehaviorModule, ErrorModule, PerformanceModule, cacheModule],
})
export class AppModule {}
