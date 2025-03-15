import { Module } from '@nestjs/common';
import { StatisticsConsumer } from './services/consumer.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [StatisticsConsumer],
})
export class StatisticsModule {} 