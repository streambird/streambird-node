import { AxiosInstance } from "axios";
import { Method, Resource } from "../Resource";
import { MessageResponse } from "../shared/MessageResponse";
import { Session } from "../shared/Session";
import { jwtVerify, JWTVerifyGetKey } from "jose";
import { StreambirdError } from "../errors/StreambirdError";
import { JwtError } from "../shared/Enums";

export type SessionVerifyRequest = {
  sessionToken?: string;
  sessionJwt?: string;
  sessionExpiresIn?: number;
};

export type SessionVerifyResponse = {
  sessionToken: string;
  sessionJwt: string;
  session: Session;
};

export type SessionDeleteRequest = {
  sessionId: string;
  sessionToken: string;
  sessionJwt: string
};

export type SessionsListResponse = {
  sessions: Array<Session>
}

export type JwkConfig = {
  appID?: string;
  jwksGetKey: JWTVerifyGetKey;
}

export type JwkResponse = {
  keys: Array<JwkKey>;
}

export type JwkKey = {
  alg: string;
  e: string;
  keyOps: Array<string>;
  kid: string;
  kty: string;
  n: string;
  use: string;
  x5c: Array<string>;
  'x5t#S256': string;
}

export type JwtLocalParams = {
  clockTolerance?: number;
  maxTokenAge?: number;
  currentDate?: Date;
}

export class Sessions extends Resource<never> {
  private jwksGetKey: JWTVerifyGetKey;
  private sessionRequest = "https://streambird.io/jwt/session";

  constructor(axiosInstance: AxiosInstance, jwkConfig: JwkConfig) {
    super("", axiosInstance);

    this.jwksGetKey = jwkConfig.jwksGetKey;
  }

  public async list(userId: string): Promise<SessionsListResponse> {
    return this.request({ method: Method.GET, path: `auth/sessions/list?user_id=${userId}` });
  }

  public async verify(verifyRequest: SessionVerifyRequest): Promise<SessionVerifyResponse> {

    let bodyData:any = {

    }

    if(verifyRequest.sessionToken) {
      bodyData['session_expires_in'] = verifyRequest.sessionExpiresIn;
    }

    if(verifyRequest.sessionToken) {
      bodyData['session_token'] = verifyRequest.sessionToken;
    }

    if(verifyRequest.sessionJwt) {
      bodyData['session_jwt'] = verifyRequest.sessionJwt;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'auth/sessions/verify' });
  }

  public async delete(deleteRequest: SessionDeleteRequest): Promise<MessageResponse> {

    let bodyData:any = {
    }

    if(deleteRequest.sessionId) {
      bodyData['session_id'] = deleteRequest.sessionId;
    }

    if(deleteRequest.sessionToken) {
      bodyData['session_token'] = deleteRequest.sessionToken;
    }

    if(deleteRequest.sessionJwt) {
      bodyData['session_jwt'] = deleteRequest.sessionJwt;
    }

    return this.request({ method: Method.DELETE, body: bodyData, path: 'auth/sessions/delete' });
  }

  public async jwks(): Promise<JwkResponse> {
    return this.request({ method: Method.GET, path: 'auth/jwks/default' });
  }

  async verifyJwt(
    jwt: string,
    options?: {
      maxTokenAge?: number;
    }
  ): Promise<{ session: Session; sessionJwt: string }> {
    try {
      const session = await this.verifyLocalJwt(jwt, options);

      return {
        session,
        sessionJwt: jwt,
      };
    } catch (err) {
      if (err instanceof StreambirdError && err.code === JwtError.JWT_STALE) {
        return this.verify({ sessionJwt: jwt });
      }

      throw err;
    }
  }

  public async verifyLocalJwt(jwt: string, options?: JwtLocalParams) {
    const dateNow = options?.currentDate || new Date();

    let payload;

    try {
      let jwtVerifyResult = await jwtVerify(jwt, this.jwksGetKey, {
        clockTolerance: options?.clockTolerance,
        currentDate: dateNow
      });

      payload = jwtVerifyResult.payload;
    } catch(error) {
      throw new StreambirdError(JwtError.JWT_ERROR , "Could not verify JWT");
    }

    if(options?.maxTokenAge) {
      const iat = payload.iat;

      if(!iat) {
        throw new StreambirdError(JwtError.JWT_ERROR, "JWT was missing iat claim");
      }

      const currentEpoch = +dateNow / 1000;

      if(currentEpoch - iat >= options.maxTokenAge) {
        throw new StreambirdError(JwtError.JWT_STALE, `JWT issued ${iat} > ${options.maxTokenAge}`);
      }
    }

    return payload[this.sessionRequest] as Session;
  }
}