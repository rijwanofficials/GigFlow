import { Resend } from "resend";

let resendClient: Resend | null = null;

// Initialize Resend email service
export const initEmailService = () => {
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is missing");
    return;
  }
  resendClient = new Resend(process.env.RESEND_API_KEY);
  console.log("---✅ Email service (Resend) initialized and ready---");
};

/**
 * Send OTP email
 */

export const sendOtpEmail = async (
  to: string,
  otp: string
): Promise<void> => {
  if (!resendClient) {
    throw new Error("Email service not initialized");
  }

  try {
    const response = await resendClient.emails.send({
      from: "Rijwan AI Docs <otp@email.rijwan.me>",
      to,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif">
          <h2>OTP Verification</h2>
          <p>Your one-time password is:</p>
          <h1>${otp}</h1>
          <p>This OTP is valid for <b>10 minutes</b>.</p>
          <p>If you didn’t request this, please ignore.</p>
        </div>
      `,
    });
  } catch (error: any) {
    console.error("❌ Failed to send OTP email");
      console.error("⚠️ Email Error:", error.message || error);
    throw new Error("Email delivery failed");
  }
};
