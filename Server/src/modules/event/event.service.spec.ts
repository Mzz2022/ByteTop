import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { PrismaService } from '../../common/database/prisma.service';
import { IpService } from '../../common/ip-services/ip.service';
import { CreateEventsDto } from './dto/create-event.dto';
import { EventType } from '@prisma/client';
import { IEventRepository } from './repositories/event.interface';
import { PrismaEventRepository } from './repositories/event.repository';
import { NetworkType } from '@prisma/client';

// 模拟 EventQueue，用来模拟 RedisEventQueue
class MockEventQueue {
  push = jest.fn(); // 确保 push 方法被 mock 为 spy
}

// 模拟 PrismaEventRepository
jest.mock('./repositories/event.repository', () => ({
  PrismaEventRepository: jest.fn().mockImplementation(() => ({
    findLocation: jest.fn(),
    createLocation: jest.fn(),
    findUser: jest.fn(),
    createUser: jest.fn(),
    createContext: jest.fn(),
    createEvent: jest.fn(),
  })),
}));

describe('EventService', () => {
  let eventService: EventService;
  let ipService: IpService;
  let eventRepository: IEventRepository;
  let eventQueue: MockEventQueue;

  // 模拟数据
  const mockData = {
    mockIp: '192.168.1.1',
    mockLocation: {
      ip: '192.168.1.1',
      country: 'China',
      province: 'Beijing',
      city: 'Beijing',
    },
    mockUser: {
      id: 'user-id',
      ip: '192.168.1.1',
      device_id: 'device-id',
      browser: 'Chrome',
      os: 'Windows',
    },
    mockContext: {
      id: 'context-id',
      page_url: 'https://example.com',
      referrer: null,
      screen_resolution: null,
      network_type: NetworkType.UNKNOWN,
      user_agent: 'Mozilla/5.0',
    },
    mockEvent: (eventType: EventType) => ({
      id: 'event-id',
      project_id: 'project-id',
      event_type: eventType,
      timestamp: new Date(),
      user_id: 'user-id',
      context_id: 'context-id',
      payload: {},
    }),
  };

  // 抽象化处理事件的辅助函数
  const createEventWithIpParsing = async (
    eventType: EventType,
    createEventsDto: CreateEventsDto,
  ) => {
    // 设置模拟数据
    jest.spyOn(ipService, 'parseIpLocation').mockResolvedValue({
      country: 'China',
      province: 'Beijing',
      city: 'Beijing',
    });

    jest.spyOn(eventRepository, 'findLocation').mockResolvedValue(null);
    jest.spyOn(eventRepository, 'createLocation').mockResolvedValue({
      ...mockData.mockLocation,
      id: 'location-id',
    });

    jest.spyOn(eventRepository, 'findUser').mockResolvedValue(null);
    jest
      .spyOn(eventRepository, 'createUser')
      .mockResolvedValue(mockData.mockUser);
    jest
      .spyOn(eventRepository, 'createContext')
      .mockResolvedValue(mockData.mockContext);
    jest
      .spyOn(eventRepository, 'createEvent')
      .mockResolvedValue(mockData.mockEvent(eventType));

    return eventService.createMany(createEventsDto, mockData.mockIp);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        PrismaService,
        IpService,
        {
          provide: 'IEventRepository',
          useClass: PrismaEventRepository,
        },
        {
          provide: 'IEventQueue',
          useClass: MockEventQueue,
        },
      ],
    }).compile();

    // 获取依赖实例
    eventService = module.get<EventService>(EventService);
    ipService = module.get<IpService>(IpService);
    eventRepository = module.get<IEventRepository>('IEventRepository');
    eventQueue = module.get<MockEventQueue>('IEventQueue');
  });

  afterEach(() => {
    jest.clearAllMocks(); // 清除 mock 记录
  });

  it('should create PAGE_VIEW event with IP parsing', async () => {
    const createEventsDto: CreateEventsDto = {
      events: [
        {
          id: 'event-id',
          project_id: 'project-id',
          event_type: EventType.PAGE_VIEW,
          timestamp: new Date(),
          user: {
            id: 'user-id',
            device_id: 'device-id',
            browser: 'Chrome',
            os: 'Windows',
          },
          context: {
            page_url: 'https://example.com',
            user_agent: 'Mozilla/5.0',
            network_type: NetworkType.UNKNOWN,
          },
          payload: {},
        },
      ],
    };

    const result = await createEventWithIpParsing(
      EventType.PAGE_VIEW,
      createEventsDto,
    );

    const expectedEvent = {
      ...mockData.mockEvent(EventType.PAGE_VIEW),
      timestamp: expect.any(Date), // timestamp 应为任意日期
    };

    // 验证创建的事件是否符合预期
    expect(result).toEqual([expectedEvent]);
    expect(ipService.parseIpLocation).toHaveBeenCalledWith(mockData.mockIp); // 验证 IP 解析方法是否被调用
    expect(eventRepository.createLocation).toHaveBeenCalledWith(
      mockData.mockLocation,
    ); // 验证创建位置方法是否被调用
    expect(eventRepository.createUser).toHaveBeenCalledWith(mockData.mockUser); // 验证创建用户方法是否被调用
    expect(eventRepository.createContext).toHaveBeenCalledWith(
      mockData.mockContext,
    ); // 验证创建上下文方法是否被调用
    expect(eventRepository.createEvent).toHaveBeenCalledWith(
      mockData.mockEvent(EventType.PAGE_VIEW),
    ); // 验证创建事件方法是否被调用
    expect(eventQueue.push).toHaveBeenCalled(); // 验证事件是否被推送到队列
  });

  it('should create PERFORMANCE event with IP parsing', async () => {
    const createEventsDto: CreateEventsDto = {
      events: [
        {
          id: 'event-id',
          project_id: 'project-id',
          event_type: EventType.PERFORMANCE,
          timestamp: new Date(),
          user: {
            id: 'user-id',
            device_id: 'device-id',
            browser: 'Chrome',
            os: 'Windows',
          },
          context: {
            page_url: 'https://example.com',
            user_agent: 'Mozilla/5.0',
          },
          payload: {},
        },
      ],
    };

    const result = await createEventWithIpParsing(
      EventType.PERFORMANCE,
      createEventsDto,
    );

    const expectedEvent = {
      ...mockData.mockEvent(EventType.PERFORMANCE),
      timestamp: expect.any(Date), // timestamp 应为任意日期
    };

    expect(result).toEqual([expectedEvent]);
    expect(eventQueue.push).toHaveBeenCalled(); // 验证 push 方法是否被调用
  });

  it('should create JS_ERROR event with IP parsing', async () => {
    const createEventsDto: CreateEventsDto = {
      events: [
        {
          id: 'event-id',
          project_id: 'project-id',
          event_type: EventType.JS_ERROR,
          timestamp: new Date(),
          user: {
            id: 'user-id',
            device_id: 'device-id',
            browser: 'Chrome',
            os: 'Windows',
          },
          context: {
            page_url: 'https://example.com',
            user_agent: 'Mozilla/5.0',
          },
          payload: {},
        },
      ],
    };

    const result = await createEventWithIpParsing(
      EventType.JS_ERROR,
      createEventsDto,
    );

    const expectedEvent = {
      ...mockData.mockEvent(EventType.JS_ERROR),
      timestamp: expect.any(Date), // timestamp 应为任意日期
    };

    expect(result).toEqual([expectedEvent]);
    expect(eventQueue.push).toHaveBeenCalled(); // 验证 push 方法是否被调用
  });
});
