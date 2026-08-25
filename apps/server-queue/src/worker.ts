import { boss } from "./common/queue/boss";
import { registerWorkers } from "./common/queue/register-workers";

async function main() {
  await boss.start();
  await registerWorkers();

  console.log("Worker started, listening for jobs");

  const shutdown = async () => {
    await boss.stop();
    process.exit(0);
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
