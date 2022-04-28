import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { StreambirdApiError } from "./errors/StreambirdApiError";
import { StreambirdError } from "./errors/StreambirdError";
import {
  convertObjectToCamelCase,
  convertObjectToSnakeCase,
  SimpleObject
} from "./formatting";

export enum Method {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete"
}

const isJson = (response: AxiosResponse<unknown>): boolean =>
  (response.headers["content-type"] || "").includes("application/json");

const convertAxiosErrorToStreambirdError = async (
  error: any
): Promise<StreambirdError> => {
  if (!error.response) {
    return new StreambirdError(
      "axios_convert",
      error.message || "An unknown error occurred making the request"
    );
  }

  // Received a 4XX or 5XX response.
  const response: AxiosResponse = error.response;
  const data = response.data;

  return StreambirdApiError.fromResponse(data);
};

const handleResponse = async (request: AxiosPromise<any>): Promise<any> => {
  try {
    const response = await request;
    const data = response.data;

    return isJson(response) ? convertObjectToCamelCase(data) : data;
  } catch (error) {
    throw await convertAxiosErrorToStreambirdError(error);
  }
};

export class Resource<T extends SimpleObject> {
  private readonly name: string;
  private readonly axiosInstance: AxiosInstance;

  protected constructor(name: string, axiosInstance: AxiosInstance) {
    this.name = name;
    this.axiosInstance = axiosInstance;
  }

  protected async request({
    method,
    path = "",
    body,
    query
  }: {
    method: Method;
    path?: string;
    body?: T;
    query?: SimpleObject;
  }): Promise<any> {
    const request = this.axiosInstance({
      method,
      url: `${this.name}/${path}`,
      data: body && convertObjectToSnakeCase(body),
      params: query && convertObjectToSnakeCase(query)
    });

    return handleResponse(request);
  }
}
