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
  totps?: Array<UserTOTPAttribute> | null;
  idpProviders?: Array<UserIDPProvider> | null;
};

export type UpdateUserRequest = {
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  emails?: Array<string>;
  phoneNumbers?: Array<string>;
};

export type UpdateUserResponse = {
  userId: string;
  phoneNumbers: Array<UserPhoneNumberResponse>;
  emails: Array<UserEmailResponse>;
  user: User;
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

export type UserIDPProvider = {
  id: string;
  provider: string;
  providerSubject: string;
  idpType: string;
  methodId: string;
  methodType: string;
  updatedAt: number;
  createdAt: number;
}

export type UserDeleteResponse = {
  userId: string;
  message: string;
}

export type SearchRequest = {
  limit: number;
  startingAfter?: string;
  filters: SearchFilter;
}

export type SearchFilter = {
  operator: 'AND' | 'OR',
  fields: Array<SearchFilterField>
}

export type SearchFilterField = {
  field: 'user_id' | 'status' | 'full_name_match' | 'phone_number' | 'phone_number_id' | 'phone_number_match' | 'phone_number_verified' | 'email' | 'email_id' | 'email_verified' | 'email_match' | 'wallet_public_address' | 'wallet_id' | 'totp_id' | 'totp_verified' | 'idp_provider';
  operator: 'eq' | 'between' | 'lt' | 'gt';
  value?: any;
  secondValue?: any;
  values?: Array<any>
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
    options: UpdateUserRequest
  ): Promise<UpdateUserResponse> {
    let bodyData:any = {};

    if(options.firstName && options.firstName.trim().length > 0) {
      bodyData['first_name'] = options.firstName;
    }

    if(options.middleName && options.middleName.trim().length > 0) {
      bodyData['middle_name'] = options.middleName;
    }

    if(options.lastName && options.lastName.trim().length > 0) {
      bodyData['last_name'] = options.lastName;
    }

    if(options.emails) {
      bodyData['emails'] = [];

      options.emails && options.emails.map((email) => {
        bodyData['emails'].push({ email: email });
      })
    }

    if(options.phoneNumbers) {
      bodyData['phone_numbers'] = [];

      options.phoneNumbers && options.phoneNumbers.map((phoneNumber) => {
        bodyData['phone_numbers'].push({ phone_number: phoneNumber });
      })
    }

    return this.request({
      method: Method.PUT,
      path: `${userId}/update`,
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

  public async search(searchRequest: SearchRequest): Promise<User> {
    let bodyData:any = {}

    bodyData['limit'] = searchRequest.limit;

    if(searchRequest.startingAfter) {
      bodyData['starting_after'] = searchRequest.startingAfter;
    }

    if(searchRequest && searchRequest.filters) {
      bodyData['filters'] = {};

      bodyData['filters']['operator'] = searchRequest.filters.operator;

      if(searchRequest.filters.fields) {

        let fieldsToAdd:any = []

        searchRequest.filters.fields.map((field) => {
          let fieldObj:any = {}

          fieldObj['field'] = field.field;
          fieldObj['operator'] = field.operator;

          if(field.value) {
            fieldObj['value'] = field.value;
          }

          if(field.secondValue) {
            fieldObj['second_value'] = field.secondValue
          }

          if(field.values) {
            fieldObj['values'] = field.values;
          }

          fieldsToAdd.push(fieldObj);
        })

        if(fieldsToAdd.length > 0) {
          bodyData['filters']['fields'] = fieldsToAdd;
        }
      }
    }

    return this.request({ method: Method.POST, body: bodyData, path: 'search' });
  }

  public async deleteWebAuthn(webauthnCredentialId: string) {
    return this.request({ method: Method.DELETE, path: `webauthn_credentials/${webauthnCredentialId}/delete` });
  }

  public async deleteTOTP(totpId: string) {
    return this.request({ method: Method.DELETE, path: `totps/${totpId}/delete` });
  }
}