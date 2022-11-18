import Redis from "ioredis";
import 'dotenv/config'

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB,
    port: process.env.REDIS_PORT,
    retryStrategy(times) {
        const delay = Math.min(times * 50, 5000);
        return delay;
    },
    reconnectOnError(err) {
        const targetError = "READONLY";
        if (err.message.includes(targetError)) {
            // Only reconnect when the error contains "READONLY"
            return true; // or `return 1;`
        }
    },
})

redisClient.connect((err, result) => {
    console.log(`redis::${redisClient.status}`)
})


export default redisClient