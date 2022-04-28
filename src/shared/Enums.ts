export const enum FactorAuthenticationType {
  OTP = "otp",
  OAUTH = "oauth",
  WALLET = "wallet",
  TOTP = "totp"
}

export const enum FactorMethodType {
  EMAIL = "email",
  WALLET = "wallet",
  PHONE_NUMBER = "phone_number"
}

export const enum FactorDeliveryChannel {
  SMS = "sms", 
  EMAIL = "email", 
  TOTP_AUTHENTICATOR = "totp_authenticator", 
  TOTP_RECOVERY_CODE = "totp_recovery_code", 
  GOOGLE_OAUTH = "google_oauth", 
  APPLE_OAUTH = "apple_oauth", 
  MICROSOFT_OAUTH = "microsoft_oauth", 
  DISCORD_OAUTH = "discord_oauth", 
  OKTA_OUATH = "okta_oauth", 
  GITHUB_OAUTH = "github_oauth", 
  SLACK_OUATH = "slack_oauth", 
  FACEBOOK_OAUTH = "facebook_oauth", 
  ETH_WALLET = "eth_wallet", 
  SOL_WALLET = "sol_wallet"
}

export const enum MethodType {
  EMAIL = "email",
  PHONE_NUMBER = "phone_number"
}

export const enum JwtError {
  JWT_ERROR = "jwt_error",
  JWT_STALE = "jwt_stale"
}