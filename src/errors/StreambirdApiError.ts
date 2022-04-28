import { StreambirdError } from "./StreambirdError";

export class StreambirdApiError extends StreambirdError {

  public readonly errorMessage: string;
  public readonly errorType: string;
  public readonly statusCode: number;

  private constructor(
    errorMessage: string,
    statusCode: number,
    errorType: string
  ) {
    super(errorMessage);
    this.name = "StreambirdApiError";

    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
    this.errorType = errorType;
  }

  public static fromResponse(
    responseBody: unknown
  ): StreambirdApiError {

    const innerErrorData: unknown =
      responseBody instanceof Object ? (responseBody as any) : {};

    const innerError: {
      error_message?: string;
      status_code?: number;
      error_type?: string;
    } = innerErrorData instanceof Object ? innerErrorData : {};

    const errorType = `${innerError.error_type || "unknown"}`;
    const errorMessage = `${innerError.error_message || responseBody}`;
    const statusCode = innerError.status_code || 0;

    return new StreambirdApiError(
      errorMessage,
      statusCode,
      errorType
    );
  }

  public isClientError(): boolean {
    return this.statusCode < 500;
  }
}
