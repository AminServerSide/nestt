export class ResetPasswordDto {
  oldPassword: string; // User's current password
  newPassword: string; // New password to replace the old one
}