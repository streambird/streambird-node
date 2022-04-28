import axios, { AxiosInstance } from "axios";
import { version } from "../package.json";
import { MagicLinks } from "./resources/MagicLinks";
import { OAuth } from "./resources/OAuth";
import { OTPs } from "./resources/OTPs";
import { JwkConfig, Sessions } from "./resources/Sessions";
import { TOTPs } from "./resources/TOTPs";
import { Users } from "./resources/Users";
import { Wallets } from "./resources/Wallets";

import { createRemoteJWKSet } from "jose";

export type StreambirdOptions = {
  apiKey: string;
  timeout?: number;
  apiHostUrl?: string;
};

export class Streambird {
  public readonly axiosInstance: AxiosInstance;

  public readonly users: Users;
  public readonly magicLinks: MagicLinks;
  public readonly otps: OTPs;
  public readonly wallets: Wallets;
  public readonly sessions: Sessions;
  public readonly oauth: OAuth;
  public readonly totps: TOTPs;

  constructor({
    apiKey,
    timeout = 30_000,
    apiHostUrl
  }: StreambirdOptions) {
    if (!apiKey) {
      throw new Error("No API key provided");
    }

    const apiUrl = `https://api.streambird.io/v1/`;
    const baseURL = apiHostUrl || apiUrl;

    let jwkConfig: JwkConfig = {
      jwksGetKey: createRemoteJWKSet(new URL(`${baseURL}auth/jwks/default?api_key=${apiKey}`))
    }

    //const JWKS = jose.createRemoteJWKSet(new URL('http://localhost:11019/v1/auth/jwks/default?api_key=sk_pRqweh3wvWmJAAVYv7Z0T5iPLzFM4ql0muoyQcjOxGeN3p1r'))

    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `streambird-node/${version}`,
        "Authorization": `Bearer ${apiKey}`
      },
      timeout
    });

    this.users = new Users(this.axiosInstance);
    this.magicLinks = new MagicLinks(this.axiosInstance);
    this.otps = new OTPs(this.axiosInstance);
    this.wallets = new Wallets(this.axiosInstance);
    this.sessions = new Sessions(this.axiosInstance, jwkConfig);
    this.oauth = new OAuth(this.axiosInstance);
    this.totps = new TOTPs(this.axiosInstance);
  }
}
