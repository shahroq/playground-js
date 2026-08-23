import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { tasks } from "../../db/schema";

interface DeleteTasksJobData {
  userId: number;
}

export async function handler(job: { data: DeleteTasksJobData }) {
  const { userId } = job.data;

  // Uncomment to simulate slow work and give yourself time to kill
  // the worker process mid-job for the durability test:
  await new Promise((r) => setTimeout(r, 8000));

  await db.delete(tasks).where(eq(tasks.userId, userId));
  console.log(
    `[tasks-service worker] cleaned up tasks for deleted user ${userId}`,
  );
}
