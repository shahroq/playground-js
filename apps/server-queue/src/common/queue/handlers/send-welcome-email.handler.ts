import { sendEmail } from "../../email/send-email";

interface SendWelcomeEmailJobData {
  email: string;
}

export async function handler(job: { data: SendWelcomeEmailJobData }) {
  const { email } = job.data;
  await sendEmail(email, "Welcome!", "Thanks for signing up.");
}
