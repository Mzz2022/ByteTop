import {
  Event,
  EventUser,
  Context,
  Location,
  NetworkType,
  EventType,
  Prisma,
} from '@prisma/client';

export interface ILocation {
  ip: string;
  country: string;
  province: string;
  city: string;
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

export interface IEvent {
  project_id: string;
  id: string;
  event_type: EventType;
  timestamp: Date;
  user_id: string;
  context_id: string;
  payload: Prisma.JsonObject;
}

export interface IEventRepository {
  findLocation(ip: string): Promise<Location | null>;
  createLocation(location: ILocation): Promise<Location>;
  findUser(id: string): Promise<EventUser | null>;
  createUser(user: IEventUser): Promise<EventUser>;
  createContext(context: IEventContext): Promise<Context>;
  createEvent(event: IEvent): Promise<Event>;
}
