import { CacheModule } from '@nestjs/cache-manager';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const cacheModule = CacheModule.registerAsync({
    imports: [ConfigModule],
    isGlobal: true,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const redisUrl =
            configService.get<string>('REDIS_URI') ?? 'redis://localhost:6379';

        const redisStore = new KeyvRedis(redisUrl);

        const store = new Keyv({ store: redisStore });
        return { store };
    },
});
