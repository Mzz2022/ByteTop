import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaEventRepository } from './repositories/event.repository';
import { PrismaService } from '../../common/database/prisma.service';
import { IpService } from '../../common/ip-services/ip.service';

@Module({
  controllers: [EventController],
  providers: [
    EventService,
    IpService,
    PrismaService,
    {
      provide: 'IEventRepository',
      useClass: PrismaEventRepository,
    },
  ],
})
export class EventModule {}
