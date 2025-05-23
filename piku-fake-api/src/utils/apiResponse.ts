class ApiResponse<T> {
  readonly success: boolean;
  constructor(
    public statusCode: number,
    public message: string,
    public data?: T,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = true;
  }
}

export default ApiResponse;
