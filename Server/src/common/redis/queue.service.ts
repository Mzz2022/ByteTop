import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { IEventQueue, EventMessage } from './queue.interface';
import { EventType } from '@prisma/client';

@Injectable()
export class RedisEventQueue implements IEventQueue {
  constructor(private readonly redis: Redis) {}

  private getStreamKey(projectId: string, eventType: EventType, hour: string) {
    return `events:${projectId}:${eventType}:${hour}`;
  }

  async push(message: EventMessage): Promise<void> {
    const streamKey = this.getStreamKey(
      message.project_id,
      message.event_type,
      message.hour,
    );

    await this.redis.xadd(
      streamKey,
      '*', // 自动生成消息ID
      'data',
      JSON.stringify(message.event),
    );

    // 设置3个小时过期时间
    await this.redis.expire(streamKey, 3 * 60 * 60);
  }
}
