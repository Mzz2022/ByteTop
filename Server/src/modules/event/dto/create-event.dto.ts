import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsDate,
  IsObject,
  ValidateNested,
  IsOptional,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsNumber,
} from 'class-validator';
import { EventType, NetworkType, Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';

class EventUserDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  device_id?: string;

  @IsOptional()
  @IsString()
  browser?: string;

  @IsOptional()
  @IsString()
  os?: string;
}

class EventContextDto {
  @IsString()
  page_url: string;

  @IsOptional()
  @IsString()
  referrer?: string;

  @IsOptional()
  @IsString()
  screen_resolution?: string;

  @IsOptional()
  @IsEnum(NetworkType)
  network_type?: NetworkType;

  @IsString()
  user_agent: string;
}

export class CreateEventDto {
  @IsString()
  project_id: string;

  @IsString()
  id: string;

  @IsEnum(EventType)
  event_type: EventType;

  @IsNumber()
  @Transform(({ value }: { value: number }) => {
    const now = Date.now(); // 获取当前时间戳
    const diffHours = Math.abs(now - value) / (1000 * 60 * 60); // 计算小时差,要求在24小时以内
    if (diffHours > 24) {
      throw new Error('Timestamp must be within 24 hours of current time');
    }
    // 时间戳有效，返回转换后的 Date 对象
    return new Date(value);
  })
  @IsDate()
  timestamp: Date;

  @ValidateNested()
  @Type(() => EventUserDto)
  user: EventUserDto;

  @ValidateNested()
  @Type(() => EventContextDto)
  context: EventContextDto;

  @IsObject()
  payload: Prisma.JsonObject;
}

export class CreateEventsDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => CreateEventDto)
  events: CreateEventDto[];
}
