const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf definition for the gRPC service
const packageDefinition = protoLoader.loadSync(['hello.proto'], {
    defaults: true, // use Proto2 syntax
    keepCase: true, // preserve field names case
    longs: String, // use string for longs
    enums: String, // use string for enums
    oneofs: true // treat oneof fields as separate properties
});
const serviceProto = grpc.loadPackageDefinition(packageDefinition);

// Define the server-side implementation of the gRPC service
const server = new grpc.Server();
server.addService(serviceProto.HelloService.service, {
    SayHello: (call, callback) => {
        const request = call.request;
        console.log(`Received request: name=${request.name}`);
        const response = { reply: `Hello, ${request.name}!` };
        callback(null, response);
    },
});

server.addService(serviceProto.VoidHelloService.service, {
    SayHello: (call, callback) => {
        console.log(`Received request: voidHelloService`);
        const response = { reply: `Hello anonymous!` };
        callback(null, response);
    },
});

// Start server
const port = '50051';
server.bind('0.0.0.0:' + port, grpc.ServerCredentials.createInsecure());
server.start();
console.log('gRPC server started on port ' + port);