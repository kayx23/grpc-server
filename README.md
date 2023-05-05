## NodeJS gRPC Server
A minimalistic gRPC Server in NodeJS with two services.

## Quick Start

1. Install dependencies.
```
npm i
```

2. Install `grpcurl` utility. On macOS:
```
brew install grpcurl
```

3. Create the corresponding protobuf file (e.g. copy paste `hello.proto` into `client.proto`) on the client side containing protocol buffers you would like to use to communicate with the server. This is mandatory as the server did not implement a [reflection API](#reflection-api). 

4. Start server
```
node server.js
```

## Examples

Send a request to `HelloService` which takes an input, `name`:
```
$ grpcurl -plaintext -d '{"name": "Bob"}' -proto "client.proto" "127.0.0.1:50051" "HelloService/SayHello"
{
  "reply": "Hello, Bob!"
}
```

Send a request to `VoidHelloService` which does not take any input:
```
$ grpcurl -plaintext  -proto "client.proto" "127.0.0.1:50051" "VoidHelloService/SayHello"
{
  "reply": "Hello anonymous!"
}
```

## Reflection API

The reflection API in gRPC allows clients to query a gRPC server for information about its services, methods, and message types at runtime, **without needing to know the specific details of the protobuf message definitions** or the gRPC service implementation.

This example gRPC server did not implement a reflection API.

Specifically, if you send a request without a corresponding `.proto` file on the client side, you get an error: 
```
$ grpcurl -plaintext "127.0.0.1:50051" "HelloService/SayHello" 

Error invoking method "HelloService/SayHello": failed to query for service descriptor "HelloService": server does not support the reflection API
```