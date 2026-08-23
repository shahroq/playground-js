// stub — swap for your real provider (Resend, SES, etc.)
export async function sendEmail(email: string, subject: string, body: string) {
  console.log(`sending "${subject}" to ${email}`);
}
