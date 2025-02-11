import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/database/prisma.service';
import { IpService } from '../services/ip.service';
import {
  IEventRepository,
  IEventUser,
  IEventContext,
  ILocation,
} from '../interfaces/event-repository.interface';
import {
  Event,
  EventUser,
  Context,
  EventType,
  Prisma,
  Location,
} from '@prisma/client';

@Injectable()
export class PrismaEventRepository implements IEventRepository {
  constructor(
    private prisma: PrismaService,
    private ipService: IpService,
  ) {}

  async findLocationByIp(ip: string): Promise<Location | null> {
    return this.prisma.location.findUnique({
      where: { ip },
    });
  }

  async createLocation(location: ILocation): Promise<Location> {
    return this.prisma.location.create({
      data: location,
    });
  }

  async createUser(user: IEventUser): Promise<EventUser> {
    // 先检查是否已存在该IP的位置信息
    let location = await this.findLocationByIp(user.ip);

    // 如果不存在，则解析IP并创建位置信息
    if (!location) {
      const locationInfo = this.ipService.parseIpLocation(user.ip);
      location = await this.createLocation({
        ip: user.ip,
        ...locationInfo,
      });
    }

    return this.prisma.eventUser.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
  }

  async createContext(context: IEventContext): Promise<Context> {
    return this.prisma.context.create({
      data: context,
    });
  }

  async createEvent(event: {
    project_id: string;
    event_id: string;
    event_type: EventType;
    timestamp: Date;
    user_id: string;
    context_id: string;
    payload: Prisma.JsonObject;
  }): Promise<Event> {
    return this.prisma.event.create({
      data: event,
    });
  }
}
