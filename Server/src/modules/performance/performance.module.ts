import { Module } from "@nestjs/common";
import { PerformanceController } from "./performance.controller.js";
import { PerformanceService } from "./performance.service.js";

@Module({
	controllers: [PerformanceController],
	providers: [PerformanceService],
	exports: [PerformanceService],
})
export class PerformanceModule {}
