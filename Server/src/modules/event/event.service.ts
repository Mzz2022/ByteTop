import { Injectable, Inject } from '@nestjs/common';
import { CreateEventDto, CreateEventsDto } from './dto/create-event.dto';
import { Event } from '@prisma/client';
import { IEventRepository } from './repositories/event.interface';
import { IpService } from '../../common/ip-services/ip.service';
import { IEventQueue } from '../../common/redis/queue.interface';
import { format } from 'date-fns';

@Injectable()
export class EventService {
  constructor(
    @Inject('IEventRepository')
    private eventRepository: IEventRepository,
    @Inject('IEventQueue')
    private eventQueue: IEventQueue,
    private ipService: IpService,
  ) {}

  private async createSingleEvent(
    eventDto: CreateEventDto,
    clientIp: string,
  ): Promise<Event> {
    const { user, context, ...eventData } = eventDto;

    // 处理位置信息
    let location = await this.eventRepository.findLocation(clientIp);
    if (!location) {
      const locationInfo = await this.ipService.parseIpLocation(clientIp);
      location = await this.eventRepository.createLocation({
        ip: clientIp,
        ...locationInfo,
      });
    }

    // 处理用户信息
    let eventUser = await this.eventRepository.findUser(user.id);
    if (!eventUser) {
      const userWithIp = {
        ...user,
        ip: clientIp,
      };
      eventUser = await this.eventRepository.createUser(userWithIp);
    }

    // 创建上下文
    const eventContext = await this.eventRepository.createContext(context);

    // 创建事件
    const event = await this.eventRepository.createEvent({
      ...eventData,
      user_id: eventUser.id,
      context_id: eventContext.id,
    });

    // 将事件加入队列
    const hour = format(eventDto.timestamp, 'yyyy-MM-dd-HH');
    await this.eventQueue.push({
      project_id: eventDto.project_id,
      event_type: eventDto.event_type,
      hour,
      event,
    });

    return event;
  }

  async createMany(
    createEventsDto: CreateEventsDto,
    clientIp: string,
  ): Promise<Event[]> {
    return Promise.all(
      createEventsDto.events.map((event) =>
        this.createSingleEvent(event, clientIp),
      ),
    );
  }
}
