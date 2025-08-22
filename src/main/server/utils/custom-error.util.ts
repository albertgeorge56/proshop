export default class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 400
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
