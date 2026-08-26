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

// Fake in-memory data, standing in for service-task's real DB for now
const tasks = [
  { id: 1, title: "Learn gRPC", completed: false },
  { id: 2, title: "Wire up service-auth as a client", completed: false },
];

function getTask(
  call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>,
) {
  const { id } = call.request;
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return callback({
      code: grpc.status.NOT_FOUND,
      message: `Task ${id} not found`,
    });
  }

  callback(null, task);
}

function listTasks(call: grpc.ServerWritableStream<any, any>) {
  for (const task of tasks) {
    call.write(task);
  }
  call.end();
}

const server = new grpc.Server();
server.addService(proto.task.TaskService.service, {
  GetTask: getTask,
  ListTasks: listTasks,
});

const PORT = process.env.PORT ?? "3031";
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, boundPort) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`gRPC server listening on port ${boundPort}`);
  },
);
