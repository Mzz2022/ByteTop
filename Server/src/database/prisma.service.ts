import type { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

// 使用依赖注入，将 PrismaClient单例 注入到服务中
// Injectable 装饰器确保它是单例的
@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	async onModuleInit() {
		await this.$connect();
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}

export const PrismaErrorCodes = {
	P2000: "Invalid input",
	P2002: "Unique constraint violation",
	P2003: "Foreign key constraint violation",
	P2025: "Record not found",
	P2014: "Invalid ID",
	P2021: "Table does not exist",
	P2022: "Column does not exist",
};

export const PrismaError = (error: any) => {
	switch (error.code) {
		case PrismaErrorCodes.P2002:
			return new ConflictException("Character name already exists");
		case PrismaErrorCodes.P2003:
			return new BadRequestException("Foreign key constraint violation");
		case PrismaErrorCodes.P2025:
			return new NotFoundException("Record not found");
		default:
			return error;
	}
};
