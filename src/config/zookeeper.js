const zookeeper = require('node-zookeeper-client');

const client = zookeeper.createClient(
    process.env.ZOOKEEPER_CONNECT || 'localhost:2181'
);

client.connect();

module.exports = {
    client,
    createZNode: (path, data) => {
        return new Promise((resolve, reject) => {
            client.create(path, Buffer.from(data), (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    },
    watchZNode: (path, callback) => {
        client.getData(
            path,
            (event) => {
                console.log('Zookeeper event:', event);
            },
            callback
        );
    }
};