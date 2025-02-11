import { Body, Controller, Post, Req } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventsDto } from './dto/create-event.dto';
import { Event } from '@prisma/client';
import { IpService } from './services/ip.service';
import { Request } from 'express';

@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly ipService: IpService,
  ) {}

  @Post()
  async createMany(
    @Body() createEventsDto: CreateEventsDto,
    @Req() request: Request,
  ): Promise<Event[]> {
    const clientIp = this.ipService.getClientIp(request);
    return this.eventService.createMany(createEventsDto, clientIp);
  }
}
