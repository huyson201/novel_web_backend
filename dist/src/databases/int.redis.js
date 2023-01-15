"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ioredis = _interopRequireDefault(require("ioredis"));
require("dotenv/config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var redisClient = new _ioredis["default"]({
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  db: process.env.REDIS_DB,
  port: process.env.REDIS_PORT,
  retryStrategy: function retryStrategy(times) {
    var delay = Math.min(times * 50, 5000);
    return delay;
  },
  reconnectOnError: function reconnectOnError(err) {
    var targetError = "READONLY";
    if (err.message.includes(targetError)) {
      // Only reconnect when the error contains "READONLY"
      return true; // or `return 1;`
    }
  }
});

redisClient.connect(function (err, result) {
  console.log("redis::".concat(redisClient.status));
});
var _default = redisClient;
exports["default"] = _default;