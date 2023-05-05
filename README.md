## NodeJS gRPC Server
A minimalistic example for testing.

## Quickstart

1. Install Node dependencies.
```
npm i
```

2. Install grpcurl. On macOS:
```
brew install grpcurl
```

3. Save a copy of `hello.proto` file to the working directory.

## Reflection API

The reflection API in gRPC allows clients to query a gRPC server for information about its services, methods, and message types at runtime, **without needing to know the specific details of the protobuf message definitions** or the gRPC service implementation.

This Node.js implementation of gRPC server did not implement a reflection API.

With `.proto` file:
```
$ grpcurl -plaintext -d '{"name": "Bob"}' -proto "hello.proto" "127.0.0.1:50051" "HelloService/SayHello"
{
  "reply": "Hello, Bob!"
}
```

Without `.proto` file:
```
$ grpcurl -plaintext "127.0.0.1:50051" "HelloService/SayHello" 

Error invoking method "HelloService/SayHello": failed to query for service descriptor "HelloService": server does not support the reflection API
```

