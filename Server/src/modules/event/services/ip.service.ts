// ip-location.service.ts
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as Searcher from 'ip2region-ts';

@Injectable()
export class IpService {
  private dbPath: string;

  constructor() {
    this.dbPath = Searcher.defaultDbFile;
  }

  getClientIp(request: Request): string {
    // 按优先级获取IP
    return (
      request.headers['x-forwarded-for']?.toString().split(',')[0] ||
      request.headers['x-real-ip']?.toString() ||
      request.ip ||
      request.socket.remoteAddress ||
      ''
    ).replace('::ffff:', ''); // 处理 IPv6 格式的 IPv4 地址
  }

  async parseIpLocation(ip: string) {
    try {
      const searcher = Searcher.newWithFileOnly(this.dbPath);
      const result = await searcher.search(ip);

      if (!result || !result.region) {
        throw new Error('Region not found');
      }

      // region 格式: "国家|区域|省份|城市|ISP"
      const [country, , province, city] = result.region.split('|');

      return {
        country,
        province,
        city,
      };
    } catch (error) {
      console.error(`Failed to parse IP location for ${ip}:`, error);
    }
  }
}
