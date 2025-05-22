abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
  }
}

class BadRequestException extends CustomError {
  statusCode = 400;
  constructor(message: string) {
    super(message);
  }
}

class UnauthorizedException extends CustomError {
  statusCode = 401;
  constructor(message: string) {
    super(message);
  }
}

class ForbiddenException extends CustomError {
  statusCode = 403;
  constructor(message: string) {
    super(message);
  }
}

class NotFoundException extends CustomError {
  statusCode = 404;
  constructor(message: string) {
    super(message);
  }
}
class ConflictException extends CustomError {
  statusCode = 409;
  constructor(message: string) {
    super(message);
  }
}

class InternalServerException extends CustomError {
  statusCode = 500;
  constructor(message: string) {
    super(message);
  }
}

export {
  CustomError,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  InternalServerException,
};
