import { boss } from "./queue/boss";
import { registerWorkers } from "./queue/register-workers";

async function main() {
  await boss.start();
  await registerWorkers();

  console.log("Worker started, listening for jobs");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
