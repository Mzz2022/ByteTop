import { Module } from '@nestjs/common';
import { cacheModule } from './config/cache.config';
import { EventModule } from './modules/event/event.module.js';

@Module({
  imports: [cacheModule, EventModule],
})
export class AppModule {}
