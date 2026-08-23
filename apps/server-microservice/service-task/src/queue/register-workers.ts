import { boss } from "./boss";
import { QUEUES } from "./queues";
import * as deleteTasks from "./handlers/delete-tasks.handler";

export async function registerWorkers() {
  await boss.createQueue(QUEUES.USER_DELETED);
  await boss.work(QUEUES.USER_DELETED, async ([job]) => {
    await deleteTasks.handler(job);
  });
}
