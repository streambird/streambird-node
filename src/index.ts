export { Streambird, StreambirdOptions } from "./Streambird";
export { StreambirdError } from "./errors/StreambirdError";
export { StreambirdApiError } from "./errors/StreambirdApiError";

export { 
  CreateUserRequest,
  CreateUserResponse,
  User,
  Users,
  UpdateUserResponse,
  UserEmailResponse,
  UserPhoneNumberResponse,
  UserWalletResponse,
  UserDeleteResponse
} from "./resources/Users";

export { 
  MagicLinkLoginOrCreateRequest,
  MagicLinkLoginOrCreateResponse,
  MagicLinkInviteRequest,
  MagicLinkInviteResponse,
  MagicLinkEmbeddableRequest,
  MagicLinkEmbeddableResponse,
  MagicLinkVerifyRequest,
  MagicLinkVerifyResponse
} from "./resources/MagicLinks";
 
export {
  OTPVerifyRequest,
  OTPVerifyResponse,
} from "./resources/OTPs"

export {
  OTPLoginOrCreateByEmailRequest,
  OTPLoginOrCreateByEmailResponse,
  OTPSendByEmailRequest,
  OTPSendByEmailResponse
} from "./resources/OTPs/Email"

export {
  OTPLoginOrCreateBySMSRequest,
  OTPLoginOrCreateBySMSResponse,
  OTPSendBySMSRequest,
  OTPSendBySMSResponse
} from "./resources/OTPs/SMS"

export {
  WalletRegistrationRequest,
  WalletRegistrationResponse,
  WalletVerifyRequest,
  WalletVerifyResponse
} from "./resources/Wallets"

export {
  SessionVerifyRequest,
  SessionVerifyResponse,
  SessionDeleteRequest,
  SessionsListResponse
} from "./resources/Sessions"

export {
  OAuthProviderRequest,
  OAuthVerifyRequest,
  OAuthVerifyResponse
} from "./resources/OAuth"

export {
  TOTPCreateRequest,
  TOTPCreateResponse,
  TOTPVerifyRequest,
  TOTPVerifyResponse,
  TOTPRecoveryCodesRequest,
  TOTPRecoveryCodesResponse,
  TOTPAttribute,
  TOTPRecoveryRequest,
  TOTPRecoveryResponse,
} from "./resources/TOTPs"