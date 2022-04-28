import { AxiosInstance } from "axios";
import { Method, Resource } from "../../Resource";
import { DeviceFingerprint } from "../../shared/DeviceFingerprint";

export type OTPLoginOrCreateBySMSRequest = {
  phoneNumber: string;
  expiresIn?: number | null;
  deviceFingerprint?: DeviceFingerprint | null;
  requiresVerification?: boolean | null;
}

export type OTPLoginOrCreateBySMSResponse = {
  phoneNumberId: string;
  userCreated: boolean;
  userId: string;
  status: string;
}

export type OTPSendBySMSRequest = {
  phoneNumber: string;
  expiresIn?: number | null;
  deviceFingerprint?: DeviceFingerprint | null;
  requiresVerification?: boolean | null;
}

export type OTPSendBySMSResponse = {
  phoneNumberId: string;
  userId: string;
}

export class SMS extends Resource<never> {
  constructor(axiosInstance: AxiosInstance) {
    super("auth/otps", axiosInstance);
  }

  public async loginOrCreate(sendRequest: OTPLoginOrCreateBySMSRequest): Promise<OTPLoginOrCreateBySMSResponse> {
    let bodyData: any = {
      phone_number: sendRequest.phoneNumber
    }
  
    if(sendRequest.expiresIn && sendRequest.expiresIn > 0) {
      bodyData['expires_in'] = sendRequest.expiresIn;
    }

    if(sendRequest.deviceFingerprint) {
      bodyData['device_fingerprint'] = sendRequest.deviceFingerprint;
    }

    if(sendRequest.requiresVerification) {
      bodyData['requies_verification'] = sendRequest.requiresVerification;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'sms/login_or_create' });
  }

  public async send(sendRequest: OTPSendBySMSRequest): Promise<OTPSendBySMSResponse> {
    let bodyData: any = {
      phone_number: sendRequest.phoneNumber,
    }
  
    if(sendRequest.expiresIn && sendRequest.expiresIn > 0) {
      bodyData['expires_in'] = sendRequest.expiresIn;
    }

    if(sendRequest.deviceFingerprint) {
      bodyData['device_fingerprint'] = sendRequest.deviceFingerprint;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'sms/send' });
  }
}