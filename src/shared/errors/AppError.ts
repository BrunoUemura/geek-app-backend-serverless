export class AppError {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(statusCode = 400, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
