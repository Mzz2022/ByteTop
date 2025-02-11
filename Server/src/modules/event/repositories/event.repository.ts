import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/database/prisma.service';
import {
  IEventRepository,
  IEventUser,
  IEventContext,
  ILocation,
  IEvent,
} from '../interfaces/event-repository.interface';
import { Event, EventUser, Context, Location } from '@prisma/client';

@Injectable()
export class PrismaEventRepository implements IEventRepository {
  constructor(private prisma: PrismaService) {}

  async findLocation(ip: string): Promise<Location | null> {
    return this.prisma.location.findUnique({
      where: { ip },
    });
  }

  async createLocation(location: ILocation): Promise<Location> {
    return this.prisma.location.create({
      data: location,
    });
  }

  async findUser(id: string): Promise<EventUser | null> {
    return this.prisma.eventUser.findUnique({
      where: { id },
    });
  }

  async createUser(user: IEventUser): Promise<EventUser> {
    return this.prisma.eventUser.create({
      data: {
        ...user,
        ip: user.ip,
      },
    });
  }

  async createContext(context: IEventContext): Promise<Context> {
    return this.prisma.context.create({
      data: context,
    });
  }

  async createEvent(event: IEvent): Promise<Event> {
    return this.prisma.event.create({
      data: event,
    });
  }
}
