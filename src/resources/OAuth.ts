import { AxiosInstance } from "axios";
import { Method, Resource } from "../Resource";
import { RedirectUrlResponse } from "../shared/RedirectUrlResponse";
import { Session } from "../shared/Session";

export type OAuthProviderRequest = {
  publicToken: string;
  redirect?: boolean | null;
  loginRedirectUrl?: string | null;
  registrationRedirectUrl?: string | null;
}

export type OAuthVerifyRequest = {
  token: string;
  sessionExpiresIn?: number | null;
  sessionType?: string | null;
  sessionToken?: string | null;
  sessionJwt?: string | null;
}

export type OAuthVerifyResponse = {
  providerSubject: string;
  provider: string;
  userId: string;
  idpSession?: Idp | null;
  sessionToken: string | null;
  sessionJwt?: string;
  session?: Session;
}

export type Idp = {
  accessToken: string;
  refreshToken: string;
}

export class OAuth extends Resource<OAuthVerifyRequest> {
  constructor(axiosInstance: AxiosInstance) {
    super("auth/oauth", axiosInstance);
  }

  public async google(request: OAuthProviderRequest): Promise<RedirectUrlResponse> {
    let params = `public_token=${request.publicToken}`;

    if(request.redirect) {
      params += `&redirect=${request.redirect}`;
    }

    if(request.loginRedirectUrl) {
      params += `&login_redirect_url=${request.loginRedirectUrl}`;
    }

    if(request.registrationRedirectUrl) {
      params += `&registration_redirect_url=${request.registrationRedirectUrl}`;
    }

    return this.request({ method: Method.GET, path: `google/begin?${params}` });
  }

  public async apple(request: OAuthProviderRequest): Promise<RedirectUrlResponse> {
    let params = `public_token=${request.publicToken}`;

    if(request.redirect) {
      params += `&redirect=${request.redirect}`;
    }

    if(request.loginRedirectUrl) {
      params += `&login_redirect_url=${request.loginRedirectUrl}`;
    }

    if(request.registrationRedirectUrl) {
      params += `&registration_redirect_url=${request.registrationRedirectUrl}`;
    }

    return this.request({ method: Method.GET, path: `apple/begin?${params}` });
  }

  public async microsoft(request: OAuthProviderRequest): Promise<RedirectUrlResponse> {
    let params = `public_token=${request.publicToken}`;

    if(request.redirect) {
      params += `&redirect=${request.redirect}`;
    }

    if(request.loginRedirectUrl) {
      params += `&login_redirect_url=${request.loginRedirectUrl}`;
    }

    if(request.registrationRedirectUrl) {
      params += `&registration_redirect_url=${request.registrationRedirectUrl}`;
    }

    return this.request({ method: Method.GET, path: `microsoft/begin?${params}` });
  }

  public async discord(request: OAuthProviderRequest): Promise<RedirectUrlResponse> {
    let params = `public_token=${request.publicToken}`;

    if(request.redirect) {
      params += `&redirect=${request.redirect}`;
    }

    if(request.loginRedirectUrl) {
      params += `&login_redirect_url=${request.loginRedirectUrl}`;
    }

    if(request.registrationRedirectUrl) {
      params += `&registration_redirect_url=${request.registrationRedirectUrl}`;
    }

    return this.request({ method: Method.GET, path: `discord/begin?${params}` });
  }

  public async github(request: OAuthProviderRequest): Promise<RedirectUrlResponse> {
    let params = `public_token=${request.publicToken}`;

    if(request.redirect) {
      params += `&redirect=${request.redirect}`;
    }

    if(request.loginRedirectUrl) {
      params += `&login_redirect_url=${request.loginRedirectUrl}`;
    }

    if(request.registrationRedirectUrl) {
      params += `&registration_redirect_url=${request.registrationRedirectUrl}`;
    }

    return this.request({ method: Method.GET, path: `github/begin?${params}` });
  }

  public async verify(oauthRequest: OAuthVerifyRequest): Promise<OAuthVerifyResponse> {

    let bodyData:any = {
      'token': oauthRequest.token
    }

    if(oauthRequest.sessionType) {
      bodyData['session_type'] = oauthRequest.sessionType;
    }

    if(oauthRequest.sessionToken) {
      bodyData['session_token'] = oauthRequest.sessionToken;
    }

    if(oauthRequest.sessionExpiresIn) {
      bodyData['session_expires_in'] = oauthRequest.sessionExpiresIn;
    }

    if(oauthRequest.sessionJwt) {
      bodyData['session_jwt'] = oauthRequest.sessionJwt;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'verify' });
  }
}