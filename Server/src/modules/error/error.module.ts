import { Module } from "@nestjs/common";
import { ErrorController } from "./error.controller.js";
import { ErrorService } from "./error.service.js";

@Module({
	controllers: [ErrorController],
	providers: [ErrorService],
	exports: [ErrorService],
})
export class ErrorModule {}
