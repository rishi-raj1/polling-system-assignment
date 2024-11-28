const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || 'polling-app',
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',')
});

module.exports = {
    producer: kafka.producer(),
    consumer: kafka.consumer({ groupId: 'polling-system-group' }),
    admin: kafka.admin()
};