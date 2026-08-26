import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
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

const client = new proto.task.TaskService(
  "localhost:3031",
  grpc.credentials.createInsecure(),
);

client.GetTask({ id: 1 }, (err: grpc.ServiceError | null, response: any) => {
  if (err) {
    console.error("Error:", err.code, err.details);
    return;
  }
  console.log("Response:", response);
});

const stream = client.ListTasks({});

stream.on("data", (task: any) => {
  console.log("Got task:", task);
});

stream.on("end", () => {
  console.log("Stream ended");
});

stream.on("error", (err: grpc.ServiceError) => {
  console.error("Stream error:", err.code, err.details);
});
