import Redis from "ioredis";

class RedisMiddleware {
  constructor() {
    this.redis = new Redis();
  }

  async handle(ctx, next) {
    try {
      const path = ctx.req.path;
      const queryParams = ctx.req.query();
      const body = await ctx.req.json().catch(() => null);

      const cacheKey = this.generateCacheKey(path, queryParams, body);

      const cachedData = await this.redis.get(cacheKey);

      if (cachedData) {
        ctx.res.status = 200;
        ctx.res.headers.set("Content-Type", "application/json");
        ctx.res.body = JSON.parse(cachedData);
        return;
      }

      await next();

      if (ctx.res.headers.get("Content-Type")?.includes("application/json")) {
        const responseBody = ctx.res.body;
        await this.redis.set(
          cacheKey,
          JSON.stringify(responseBody),
          "EX",
          3600
        );
      }
    } catch (err) {
      console.error("Redis middleware error:", err);
      await next();
    }
  }

  generateCacheKey(path, queryParams, body) {
    const queryStr = queryParams
      ? Object.entries(queryParams)
          .sort()
          .map(([key, value]) => `${key}=${value}`)
          .join("&")
      : "";
    const bodyStr = body ? JSON.stringify(body) : "";
    return `${path}?${queryStr}|${bodyStr}`;
  }

  async invalidateCacheWithCriteria({
    path = null,
    queryParams = {},
    bodyKey = null,
  }) {
    const keys = await this.redis.keys("*");

    for (const key of keys) {
      const [keyPath, queryPart, bodyPart] = key.split("|");

      const matchPath = path ? keyPath.includes(path) : true;

      const matchQuery = Object.entries(queryParams).every(([k, v]) =>
        queryPart.includes(`${k}=${v}`)
      );

      const matchBody = bodyKey ? bodyPart.includes(bodyKey) : true;

      if (matchPath && matchQuery && matchBody) {
        await this.redis.del(key);
      }
    }
  }
}

const redisMiddleware = new RedisMiddleware().handle;

export default redisMiddleware;
