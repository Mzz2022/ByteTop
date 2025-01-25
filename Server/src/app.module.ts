import { Module } from "@nestjs/common";
import { UserBehaviorModule } from "./modules/userBehavior/userBehavior.module.js";
import { ErrorModule } from "./modules/error/error.module.js";
import { PerformanceModule } from "./modules/performance/performance.module.js";

@Module({
	imports: [UserBehaviorModule, ErrorModule, PerformanceModule],
})
export class AppModule {}
