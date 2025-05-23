import { StatusCodes } from 'http-status-codes';
abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
  }
}

class BadRequestException extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  constructor(message: string) {
    super(message);
  }
}

class UnauthorizedException extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  constructor(message: string) {
    super(message);
  }
}

class ForbiddenException extends CustomError {
  statusCode = StatusCodes.FORBIDDEN;
  constructor(message: string) {
    super(message);
  }
}

class NotFoundException extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  constructor(message: string) {
    super(message);
  }
}
class ConflictException extends CustomError {
  statusCode = StatusCodes.CONFLICT;
  constructor(message: string) {
    super(message);
  }
}

class InternalServerException extends CustomError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
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
