export class ForgotPasswordDto {
  email: string; // User's email for password reset
  verificationCode: string; // Verification code sent to the user
  newPassword: string; // New password to replace the old one
}