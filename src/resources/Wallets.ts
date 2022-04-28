import { AxiosInstance } from "axios";
import { Method, Resource } from "../Resource";
import { Session } from "../shared/Session";

export type WalletRegistrationRequest = {
  walletType: string;
  publicAddress: string;
  userId?: string | null;
};

export type WalletRegistrationResponse = {
  id: string;
  appId: string;
  userId: string;
  publicAddress: string;
  walletType: string;
  challenge: string;
  updatedAt: number;
  createdAt: number;
}

export type WalletVerifyRequest = {
  walletType: string;
  publicAddress: string;
  signature: string;
  sessionExpiresIn?: number;
  sessionToken: string;
  sessionJwt: string;
};

export type WalletVerifyResponse = {
  id: string;
  appId: string;
  userId: string;
  publicAddress: string;
  walletType: string;
  isDefault: boolean;
  isReadyOnly: boolean;
  isImported: boolean;
  updatedAt: number;
  createdAt: number;
  sessionToken: string;
  sessionJwt: string;
  session: Session;
}


export class Wallets extends Resource<never> {
  constructor(axiosInstance: AxiosInstance) {
    super("auth/wallets", axiosInstance);
  }

  public async beginRegistration(registrationRequest: WalletRegistrationRequest): Promise<WalletRegistrationResponse> {

    let bodyData:any = {
      'wallet_type': registrationRequest.walletType,
      'public_address': registrationRequest.publicAddress
    }

    if(registrationRequest.userId) {
      bodyData['user_id'] = registrationRequest.userId;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'registrations/begin' });
  }

  public async verify(verifyRequest: WalletVerifyRequest): Promise<WalletVerifyResponse> {

    let bodyData:any = {
      'wallet_type': verifyRequest.walletType,
      'public_address': verifyRequest.publicAddress,
      'signature': verifyRequest.signature
    }

    if(verifyRequest.sessionToken) {
      bodyData['session_token'] = verifyRequest.sessionToken;
    }

    if(verifyRequest.sessionExpiresIn) {
      bodyData['session_expires_in'] = verifyRequest.sessionExpiresIn;
    }

    if(verifyRequest.sessionJwt) {
      bodyData['session_jwt'] = verifyRequest.sessionJwt;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'verify' });
  }
}