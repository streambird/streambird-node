import { AxiosInstance } from "axios";
import { Method, Resource } from "../Resource";
import { DeviceFingerprint } from "../shared/DeviceFingerprint";
import { MethodType } from "../shared/Enums";
import { Session } from "../shared/Session";

export type MagicLinkLoginOrCreateRequest = {
  email: string;
  loginRedirectUrl?: string | null;
  registrationRedirectUrl?: string | null;
  loginExpiresIn?: number | null;
  registrationExpiresIn?: number | null;
  deviceFingerprint?: DeviceFingerprint | null;
  requiresVerification?: boolean | null;
}

export type MagicLinkLoginOrCreateResponse = {
  userId: string;
  status: string;
  userCreated: boolean;
  updatedAt: number;
  createdAt: number;
  emailId: string;
}

export type MagicLinkInviteRequest = {
  email: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  inviteRedirectUrl?: string;
  inviteExpiresIn: number;
  deviceFingerprint: DeviceFingerprint;
}

export type MagicLinkInviteResponse = {
  userId: string;
  status: string;
  userCreated: string;
  emailId: string;
}

export type MagicLinkEmbeddableRequest = {
  userId: string;
  expiresIn: number;
  deviceFingerprint: DeviceFingerprint;
}

export type MagicLinkEmbeddableResponse = {
  userId: string;
  token: string;
}

export type MagicLinkVerifyRequest = {
  token: string;
  sessionToken?: string | null;
  sessionJwt?: string | null;
  sessionExpiresIn?: number | null;
  deviceFingerprint?: DeviceFingerprint | null;
}

export type MagicLinkVerifyResponse = {
  userId: string;
  methodId: string;
  methodType: MethodType;
  sessionToken?: string;
  sessionJwt?: string;
  session: Session;
}

export class MagicLinks extends Resource<never> {
  constructor(axiosInstance: AxiosInstance) {
    super("auth/magic_links", axiosInstance);
  }

  public async loginOrCreate(loginOrCreateRequest: MagicLinkLoginOrCreateRequest): Promise<MagicLinkLoginOrCreateResponse> {
    let bodyData:any = {
      'email': loginOrCreateRequest.email
    }

    if(loginOrCreateRequest.loginRedirectUrl && loginOrCreateRequest.loginRedirectUrl.length > 0) {
      bodyData['login_redirect_url'] = loginOrCreateRequest.loginRedirectUrl;
    }

    if(loginOrCreateRequest.registrationRedirectUrl && loginOrCreateRequest.registrationRedirectUrl.length > 0) {
      bodyData['registration_redirect_url'] = loginOrCreateRequest.registrationRedirectUrl;
    }

    if(loginOrCreateRequest.loginExpiresIn && loginOrCreateRequest.loginExpiresIn > 0) {
      bodyData['login_expires_in'] = loginOrCreateRequest.loginExpiresIn;
    }

    if(loginOrCreateRequest.registrationExpiresIn && loginOrCreateRequest.registrationExpiresIn > 0) {
      bodyData['registration_expires_in'] = loginOrCreateRequest.registrationExpiresIn;
    }

    if(loginOrCreateRequest.deviceFingerprint) {
      bodyData['device_fingerprint'] = loginOrCreateRequest.deviceFingerprint;
    }

    if(loginOrCreateRequest.requiresVerification) {
      bodyData['requires_verification'] = loginOrCreateRequest.requiresVerification;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'email/login_or_create' });
  }

  public async invite(inviteRequest: MagicLinkInviteRequest): Promise<MagicLinkInviteResponse> {

    let bodyData:any = {
      'email': inviteRequest.email
    }

    if(inviteRequest.firstName && inviteRequest.firstName.length > 0) {
      bodyData['first_name'] = inviteRequest.firstName;
    }

    if(inviteRequest.lastName && inviteRequest.lastName.length > 0) {
      bodyData['last_name'] = inviteRequest.lastName;
    }

    if(inviteRequest.middleName && inviteRequest.middleName.length > 0) {
      bodyData['middle_name'] = inviteRequest.middleName;
    }

    if(inviteRequest.inviteRedirectUrl) {
      bodyData['invite_redirect_url'] = inviteRequest.inviteRedirectUrl;
    }

    if(inviteRequest.inviteExpiresIn) {
      bodyData['invite_expires_in'] = inviteRequest.inviteExpiresIn;
    }

    if(inviteRequest.deviceFingerprint) {
      bodyData['device_fingerprint'] = inviteRequest.deviceFingerprint;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'invite' });
  }
  
  public async create(embeddableRequest: MagicLinkEmbeddableRequest): Promise<MagicLinkEmbeddableResponse> {
    let bodyData:any = {
      'user_id': embeddableRequest.userId
    }

    if(embeddableRequest.expiresIn) {
      bodyData['expires_in'] = embeddableRequest.expiresIn;
    }

    if(embeddableRequest.deviceFingerprint) {
      bodyData['device_fingerprint'] = embeddableRequest.deviceFingerprint;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'create' });
  }

  public async verify(verifyRequest: MagicLinkVerifyRequest): Promise<MagicLinkVerifyResponse> {

    let bodyData:any = {
      'token': verifyRequest.token
    }

    if(verifyRequest.sessionToken && verifyRequest.sessionToken.length > 0) {
      bodyData['session_token'] = verifyRequest.sessionToken;
    }

    if(verifyRequest.sessionJwt && verifyRequest.sessionJwt.length > 0) {
      bodyData['session_jwt'] = verifyRequest.sessionJwt;
    }

    if(verifyRequest.sessionExpiresIn) {
      bodyData['session_expires_in'] = verifyRequest.sessionExpiresIn;
    }

    if(verifyRequest.deviceFingerprint) {
      bodyData['device_fingerprint'] = verifyRequest.deviceFingerprint;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'verify' });
  }
}