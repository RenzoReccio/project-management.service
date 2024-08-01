
export class CustomResponse<T> {
  message: string;

  data: T;

  error: string[];

  /**
   * Generic class to use for response methods
   * @param {string} message Message to return.
   * @param {T} data Data to return.
   * @param {string} error If error to return.
  **/
  constructor(message: string, data: T, error: string[]) {
    this.message = message;
    this.data = data;
    this.error = error;
  }
}