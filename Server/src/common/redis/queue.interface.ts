import { EventType, Event } from '@prisma/client';

export interface EventMessage {
  project_id: string;
  event_type: EventType;
  hour: string; // 格式: YYYY-MM-DD-HH
  event: Event;
}

export interface IEventQueue {
  push(message: EventMessage): Promise<void>;
  // 可以添加其他队列操作方法
}
