import { FactorMethodType } from "./Enums";

export type Method = {
  methodId: string;
  methodType: FactorMethodType;
  lastVerifiedAt: number;
  phoneNumberId?: string;
  phoneNumber?: string;
  emailId?: string;
  email?: string;
  walletType?: string;
  walletId?: string;
  walletPublicAddress?: string;
  totpId?: string;
  providerSubject?: string;
}