import { AxiosInstance } from "axios";
import { Method, Resource } from "../../Resource";
import { DeviceFingerprint } from "../../shared/DeviceFingerprint";
import { MethodType } from "../../shared/Enums";
import { Session } from "../../shared/Session";
import { Email } from "./Email";
import { SMS } from "./SMS";

export type OTPVerifyRequest = {
  otp: string;
  methodId: string;
  sessionExpiresIn?: number | null;
  deviceFingerprint?: DeviceFingerprint | null;
}

export type OTPVerifyResponse = {
  userId: string;
  methodId: string;
  methodType: MethodType;
  sessionToken?: string;
  sessionJwt?: string;
  session?: Session;
}

export class OTPs extends Resource<never> {
  public readonly email: Email;
  public readonly sms: SMS;

  constructor(axiosInstance: AxiosInstance) {
    super("auth/otps", axiosInstance);

    this.email = new Email(axiosInstance);
    this.sms = new SMS(axiosInstance);
  }

  public async verify(otpVerifyRequest: OTPVerifyRequest): Promise<OTPVerifyResponse> {

    let bodyData: any = {
      otp: otpVerifyRequest.otp,
      method_id: otpVerifyRequest.methodId,
    }

    if(otpVerifyRequest.deviceFingerprint) {
      bodyData['device_fingerprint'] = otpVerifyRequest.deviceFingerprint;
    }

    if(otpVerifyRequest.sessionExpiresIn && otpVerifyRequest.sessionExpiresIn > 0) {
      bodyData['session_expires_in'] = otpVerifyRequest.sessionExpiresIn;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'verify' });
  }
}