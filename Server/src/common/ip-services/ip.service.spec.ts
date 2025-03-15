import { Test, TestingModule } from '@nestjs/testing';
import { IpService } from './ip.service';
import { Request } from 'express';

describe('IpService', () => {
  let service: IpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpService],
    }).compile();

    service = module.get<IpService>(IpService);
  });

  describe('getClientIp', () => {
    it('should extract IP from x-forwarded-for header', () => {
      const mockRequest = {
        headers: {
          'x-forwarded-for': '1.2.3.4, 5.6.7.8',
        },
      } as unknown as Request;

      expect(service.getClientIp(mockRequest)).toBe('1.2.3.4');
    });
  });

  describe('parseIpLocation', () => {
    it('should parse location for valid Chinese IP', async () => {
      const result = await service.parseIpLocation('223.5.5.5'); // 阿里巴巴的IP
      expect(result).toEqual(
        expect.objectContaining({
          country: '中国',
          province: '浙江省',
          city: '杭州市',
        }),
      );
    });

    it('should parse location for valid US IP', async () => {
      const result = await service.parseIpLocation('8.8.8.8'); // Google DNS的IP
      expect(result).toEqual(
        expect.objectContaining({
          country: '美国',
        }),
      );
    });
  });
});
