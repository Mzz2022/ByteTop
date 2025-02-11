import { Injectable, Inject } from '@nestjs/common';
import { CreateEventDto, CreateEventsDto } from './dto/create-event.dto';
import { Event } from '@prisma/client';
import { IEventRepository } from './interfaces/event-repository.interface';

@Injectable()
export class EventService {
  constructor(
    @Inject('IEventRepository')
    private eventRepository: IEventRepository,
  ) {}

  private async createSingleEvent(eventDto: CreateEventDto): Promise<Event> {
    const { user, context, ...eventData } = eventDto;

    // 创建或获取用户
    const eventUser = await this.eventRepository.createUser(user);

    // 创建上下文
    const eventContext = await this.eventRepository.createContext(context);

    // 创建事件
    return this.eventRepository.createEvent({
      ...eventData,
      user_id: eventUser.id,
      context_id: eventContext.id,
    });
  }

  async createMany(createEventsDto: CreateEventsDto): Promise<Event[]> {
    return Promise.all(
      createEventsDto.events.map((event) => this.createSingleEvent(event)),
    );
  }
}
