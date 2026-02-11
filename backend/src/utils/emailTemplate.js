exports.verifyEmailTemplate = (otp) => {
  return `
    <h2>Email Verification</h2>
    <p>Your OTP code is:</p>
    <h1>${otp}</h1>
    <p>This code expires in 10 minutes.</p>
  `;
};
