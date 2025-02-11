import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaEventRepository } from './repositories/event.repository';
import { PrismaService } from '../../common/database/prisma.service';

@Module({
  controllers: [EventController],
  providers: [
    EventService,
    PrismaService,
    {
      provide: 'IEventRepository',
      useClass: PrismaEventRepository,
    },
  ],
})
export class EventModule {}
