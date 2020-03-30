const PROTO_PATH = __dirname + '/protos/demo.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

class grpc_client {
    constructor() {
        // initialize client
        const packageDefinition = protoLoader.loadSync(
            PROTO_PATH,
            {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
        const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).demo;
        this.client = new protoDescriptor.Transform('localhost:9091', grpc.credentials.createInsecure());
    }

    /**
     * Set client
     * @param client {module:stream.internal.Transform}
     */
    setClient(client) {
        this.client = client;
    }

    /**
     *
     * @returns {module:stream.internal.Transform}
     */
    getClient() {
        return this.client;
    }
}

module.exports = grpc_client;
