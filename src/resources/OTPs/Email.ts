import { AxiosInstance } from "axios";
import { Method, Resource } from "../../Resource";
import { DeviceFingerprint } from "../../shared/DeviceFingerprint";

export type OTPLoginOrCreateByEmailRequest = {
  email: string;
  expiresIn?: number | null;
  deviceFingerprint?: DeviceFingerprint | null;
  requiresVerification?: boolean | false,
}

export type OTPLoginOrCreateByEmailResponse = {
  emailId: string;
  userCreated: boolean;
  userId: string;
  status: string;
}

export type OTPSendByEmailRequest = {
  email: string;
  expiresIn?: number | null;
  deviceFingerprint?: DeviceFingerprint | null;
}

export type OTPSendByEmailResponse = {
  emailId: string;
  userId: string;
}

export class Email extends Resource<never> {
  constructor(axiosInstance: AxiosInstance) {
    super("auth/otps", axiosInstance);
  }

  public async loginOrCreate(loginOrCreateRequest: OTPLoginOrCreateByEmailRequest): Promise<OTPLoginOrCreateByEmailResponse> {
    let bodyData: any = {
      email: loginOrCreateRequest.email
    }
  
    if(loginOrCreateRequest.expiresIn && loginOrCreateRequest.expiresIn > 0) {
      bodyData['expires_in'] = loginOrCreateRequest.expiresIn;
    }

    if(loginOrCreateRequest.deviceFingerprint) {
      bodyData['device_fingerprint'] = loginOrCreateRequest.deviceFingerprint;
    }

    if(loginOrCreateRequest.requiresVerification !== null && loginOrCreateRequest.requiresVerification !== undefined) {
      bodyData['requires_verification'] = loginOrCreateRequest.requiresVerification;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'email/login_or_create' });
  }

  public async send(sendRequest: OTPSendByEmailRequest): Promise<OTPSendByEmailResponse> {
    let bodyData: any = {
      email: sendRequest.email,
    }
  
    if(sendRequest.expiresIn && sendRequest.expiresIn > 0) {
      bodyData['expires_in'] = sendRequest.expiresIn;
    }

    if(sendRequest.deviceFingerprint) {
      bodyData['device_fingerprint'] = sendRequest.deviceFingerprint;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'email/send' });
  }
}