import {
  Event,
  EventUser,
  Context,
  NetworkType,
  EventType,
  Prisma,
  Location,
} from '@prisma/client';

export interface ILocation {
  ip: string;
  country?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}

export interface IEventUser {
  id: string;
  ip: string;
  device_id?: string;
  browser?: string;
  os?: string;
}

export interface IEventContext {
  page_url: string;
  referrer?: string;
  screen_resolution?: string;
  network_type?: NetworkType;
  user_agent: string;
}

export interface IEventRepository {
  findLocationByIp(ip: string): Promise<Location | null>;
  createLocation(location: ILocation): Promise<Location>;
  createUser(user: IEventUser): Promise<EventUser>;
  createContext(context: IEventContext): Promise<Context>;
  createEvent(event: {
    project_id: string;
    event_id: string;
    event_type: EventType;
    timestamp: Date;
    user_id: string;
    context_id: string;
    payload: Prisma.JsonValue;
  }): Promise<Event>;
}
