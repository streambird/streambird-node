import { AxiosInstance } from "axios";
import { Method, Resource } from "../Resource";
import { DeviceFingerprint } from "../shared/DeviceFingerprint";
import { Session } from "../shared/Session";

export type TOTPCreateRequest = {
  userId: string;
  expiresIn?: number;
};

export type TOTPCreateResponse = {
  userId: string;
  secret: string;
  totpId: string;
  recoveryCodes: Array<string>;
  qrBase64: string;
}

export type TOTPVerifyRequest = {
  userId: string;
  totp: string;
  sessionExpiresIn?: number;
  sessionToken?: string;
  sessionJwt?: string;
  deviceFingerprint?: DeviceFingerprint;
};

export type TOTPVerifyResponse = {
  totpId: string;
  userId: string;
  sessionToken?: string;
  sessionJwt?: string;
  session?: Session;
}

export type TOTPRecoveryCodesRequest = {
  userId: string;
}

export type TOTPRecoveryCodesResponse = {
  userId: string;
  totps: Array<TOTPAttribute>;
}

export type TOTPAttribute = {
  id: string;
  verified: boolean;
  recoveryCodes: Array<string>;
}

export type TOTPRecoveryRequest = {
  userId: string;
  totp: string;
  sessionExpiresIn?: number;
  sessionToken?: string;
  sessionJwt?: string;
  deviceFingerprint?: DeviceFingerprint;
}

export type TOTPRecoveryResponse = {
  totpId: string;
  userId: string;
  sessionToken?: string;
  sessionJwt?: string;
  session?: Session;
}

export class TOTPs extends Resource<never> {
  constructor(axiosInstance: AxiosInstance) {
    super("auth/totps", axiosInstance);
  }

  public async create(createRequest: TOTPCreateRequest): Promise<TOTPCreateResponse> {

    let bodyData:any = {
      user_id: createRequest.userId
    }

    if(createRequest.expiresIn) {
      bodyData.expires_in = createRequest.expiresIn;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'create' });
  }

  public async verify(updateRequest: TOTPVerifyRequest): Promise<TOTPVerifyResponse> {

    let bodyData:any = {
      user_id: updateRequest.userId,
      totp: updateRequest.totp
    }

    if(updateRequest.sessionExpiresIn) {
      bodyData['session_expires_in'] = updateRequest.sessionExpiresIn;
    }

    if(updateRequest.sessionToken) {
      bodyData['session_token'] = updateRequest.sessionToken;
    }

    if(updateRequest.sessionJwt) {
      bodyData['session_jwt'] = updateRequest.sessionJwt;
    }

    if(updateRequest.deviceFingerprint) {
      bodyData['device_fingerprint'] = updateRequest.deviceFingerprint;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'verify' });
  }

  public async recoveryCodes(codeRequest: TOTPRecoveryCodesRequest): Promise<TOTPRecoveryCodesResponse> {

    let bodyData:any = {
      user_id: codeRequest.userId
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'recovery_codes' });
  }

  public async recovery(recoveryRequest: TOTPRecoveryRequest): Promise<TOTPRecoveryResponse> {

    let bodyData:any = {
      user_id: recoveryRequest.userId,
      totp: recoveryRequest.totp
    }

    if(recoveryRequest.sessionExpiresIn) {
      bodyData['session_expires_in'] = recoveryRequest.sessionExpiresIn;
    }

    if(recoveryRequest.sessionToken) {
      bodyData['session_token'] = recoveryRequest.sessionToken;
    }

    if(recoveryRequest.sessionJwt) {
      bodyData['session_jwt'] = recoveryRequest.sessionJwt;
    }

    if(recoveryRequest.deviceFingerprint) {
      bodyData['device_fingerprint'] = recoveryRequest.deviceFingerprint;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'recovery' });
  }
}