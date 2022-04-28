export class StreambirdError extends Error {
  code: string;

  constructor(code: string, message?: string) {
    let msg = `(${code}):${message}`;
    super(msg);

    this.code = code;
    this.name = "StreambirdError";
  }
}
