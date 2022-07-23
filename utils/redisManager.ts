import { createClient } from 'redis';


class RedisManager {
    private redisSession;
    private readonly defaultTtl: number;

    constructor() {
        this.redisSession = createClient({
            url: 'redis://' + (process.env.REDIS_HOSTNAME ?? '127.0.0.1'),
        });
        this.redisSession.connect();
        this.defaultTtl = 1000 * 60 * 10;
    }

    setKey = (name: string, value: any, ttl?: number) => {
        this.redisSession.set(name, value, {
            EX: ttl ?? this.defaultTtl,
        });
    }

    getKey(name: string) {
        return this.redisSession.get(name);
    }
}

export const redisManager = new RedisManager();