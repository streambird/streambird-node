import { AxiosInstance } from "axios";
import { Method, Resource } from "../Resource";

export type CreateUserRequest = {
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  requiresVerification: boolean;
};

export type CreateUserResponse = {
  userId: string | null;
  status: string | null;
  emailId: string | null;
  phoneNumberId: string | null;
}

export type User = {
  userId: string | null;
  appId: string | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  active: boolean | null;
  updatedAt: number | null;
  createdAt: number | null;
  emailId: string | null;
  phoneNumberId: string | null;
  emails?: Array<UserEmailResponse> | null;
  phoneNumbers?: Array<UserPhoneNumberResponse> | null;
  wallets?: Array<UserWalletResponse> | null;
  totps?: Array<UserTOTPAttribute> | null
};

export type UpdateUserResponse = {
  userId: string;
  phoneNumbers: Array<UserPhoneNumberResponse>;
  emails: Array<UserEmailResponse>;
}

export type UserEmailResponse = {
  id: string;
  verified: boolean;
  email: string;
  updatedAt: number;
  createdAt: number;
}

export type UserPhoneNumberResponse = {
  id: string;
  verified: boolean;
  phoneNumber: string;
  updatedAt: number;
  createdAt: number;
}

export type UserWalletResponse = {
  id: string;
  appId: string;
  userId: string;
  publicAddress: string;
  walletType: string;
  isDefault: boolean;
  updatedAt: number;
  createdAt: number;
}

export type UserTOTPAttribute = {
  id: string;
  userId: string;
  verified: boolean;
  updatedAt: number;
  createdAt: number;
}

export type UserDeleteResponse = {
  userId: string;
  message: string;
}

export class Users extends Resource<never> {
  constructor(axiosInstance: AxiosInstance) {
    super("auth/users", axiosInstance);
  }

  public async create(userRequest: CreateUserRequest): Promise<CreateUserResponse> {

    let bodyData:any = {
      'requires_verification': userRequest.requiresVerification
    }

    if(userRequest.email && userRequest.email.length > 0) {
      bodyData['email'] = userRequest.email;
    }

    if(userRequest.phoneNumber && userRequest.phoneNumber.length > 0) {
      bodyData['phone_number'] = userRequest.phoneNumber;
    }

    if(userRequest.firstName && userRequest.firstName.length > 0) {
      bodyData['first_name'] = userRequest.firstName;
    }

    if(userRequest.middleName && userRequest.middleName.length > 0) {
      bodyData['middle_name'] = userRequest.middleName;
    }

    if(userRequest.lastName && userRequest.lastName.length > 0) {
      bodyData['last_name'] = userRequest.lastName;
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'create' });
  }

  public async update(
    userId: string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    emails?: Array<{ email: string}>,
    phoneNumbers?: Array<{ phone_number: string}>
  ): Promise<UpdateUserResponse> {
    let bodyData:any = {};

    if(firstName && firstName.trim().length > 0) {
      bodyData['first_name'] = firstName;
    }

    if(middleName && middleName.trim().length > 0) {
      bodyData['middle_name'] = middleName;
    }

    if(lastName && lastName.trim().length > 0) {
      bodyData['last_name'] = lastName;
    }

    if(emails) {
      bodyData['emails'] = [];

      emails.map((email) => {
        bodyData['emails'].append({ email: email });
      })
    }

    if(phoneNumbers) {
      bodyData['phone_numbers'] = [];

      phoneNumbers.map((phoneNumber) => {
        bodyData['phone_numbers'].append({ phone_number: phoneNumber });
      })
    }

    return this.request({
      method: Method.PUT,
      path: `auth/users/${userId}/update`,
      body: bodyData
    });
  }

  public async get(userId: string): Promise<User> {
    return this.request({ method: Method.GET, path: `${userId}` });
  }

  public async delete(userId: string): Promise<UserDeleteResponse> {
    return this.request({ method: Method.DELETE, path: `${userId}/delete` });
  }

  public async deleteEmail(emailId: string): Promise<UserDeleteResponse> {
    return this.request({ method: Method.DELETE, path: `emails/${emailId}/delete` });
  }

  public async deletePhoneNumber(phoneNumberId: string): Promise<UserDeleteResponse> {
    return this.request({ method: Method.DELETE, path: `phone_numbers/${phoneNumberId}/delete` });
  }

  public async deleteWallet(walletId: string): Promise<UserDeleteResponse> {
    return this.request({ method: Method.DELETE, path: `wallets/${walletId}/delete` });
  }
}