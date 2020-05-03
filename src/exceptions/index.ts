import { HttpException, HttpStatus } from '@nestjs/common';
import MAPPER from './mapper';

export class UserNotFound extends HttpException {
  constructor() {
    super(MAPPER.AUTH_ERRORS.USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);
  }
}
