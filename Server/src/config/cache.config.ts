import { CacheModule } from "@nestjs/cache-manager"
import { redisStore } from "cache-manager-redis-store"

export const cacheModule = CacheModule.registerAsync({
	isGlobal: true,
	useFactory: () => ({
		store: redisStore,
		host: process.env.REDIS_HOST || "localhost",
		port: parseInt(process.env.REDIS_PORT, 10)! || 6379,
		ttl: 60 * 60 * 24, // 24小时缓存
	}),
})
