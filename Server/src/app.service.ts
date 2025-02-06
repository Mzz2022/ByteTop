import { Injectable } from '@nestjs/common';
import { PrismaService } from './common/database/prisma.service.js';

@Injectable()
export class AppService {
  // 暂时未引入数据库
  // constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
