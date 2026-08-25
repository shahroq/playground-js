import { query } from "../../db/client";
import { sendEmail } from "../../email/send-email";

interface SendNewsletterJobData {
  sendId: number;
  newsletterId: number;
  email: string;
}

export async function handler(job: { data: SendNewsletterJobData }) {
  const { sendId, newsletterId, email } = job.data;

  const { rows } = await query(
    "SELECT subject, body FROM newsletters WHERE id = $1",
    [newsletterId],
  );
  const newsletter = rows[0];
  if (!newsletter) throw new Error(`newsletter ${newsletterId} not found`);

  try {
    await sendEmail(email, newsletter.subject, newsletter.body);
    await query(
      "UPDATE newsletter_sends SET status = 'sent', sent_at = now() WHERE id = $1",
      [sendId],
    );
  } catch (err) {
    await query(
      "UPDATE newsletter_sends SET status = 'failed', error = $2 WHERE id = $1",
      [sendId, (err as Error).message],
    );
    throw err; // rethrow so pg-boss's retryLimit/dead-letter still applies
  }
}
