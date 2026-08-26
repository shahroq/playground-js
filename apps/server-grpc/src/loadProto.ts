import protoLoader from "@grpc/proto-loader";
import grpc from "@grpc/grpc-js";
import path from "node:path";

const PROTO_PATH = path.join(import.meta.dir, "proto/task.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDefinition) as any;

console.log(Object.keys(proto.task));
console.log(proto.task.TaskService.service);
