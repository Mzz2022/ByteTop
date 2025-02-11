import { Body, Controller, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventsDto } from './dto/create-event.dto';
import { Event } from '@prisma/client';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createMany(@Body() createEventsDto: CreateEventsDto): Promise<Event[]> {
    return this.eventService.createMany(createEventsDto);
  }
}
