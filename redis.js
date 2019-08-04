const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis);

const client = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASS || 'password',
});
client.on('connect', function () {
    console.log('redis connected');
    console.log(`connected ${client.connected}`);
}).on('error', function (error) {
    console.log(error);
});
module.exports = client;