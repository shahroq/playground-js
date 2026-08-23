import { boss } from "../boss";
import { QUEUES } from "../queues";
import * as sendNewsletterEmail from "./send-newsletter.handler";
import * as sendWelcomeEmail from "./send-welcome-email.handler";

export async function registerWorkers() {
  await boss.createQueue(QUEUES.SEND_NEWSLETTER);
  await boss.work(QUEUES.SEND_NEWSLETTER, async ([job]) => {
    await sendNewsletterEmail.handler(job);
  });

  await boss.createQueue(QUEUES.SEND_WELCOME_EMAIL);
  await boss.work(QUEUES.SEND_WELCOME_EMAIL, async ([job]) => {
    await sendWelcomeEmail.handler(job);
  });
}
