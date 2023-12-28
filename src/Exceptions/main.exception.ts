import { HttpException, HttpStatus } from '@nestjs/common';

export class PussyException extends HttpException {
  constructor() {
    super('Pussy exception happened...', HttpStatus.BAD_REQUEST);
  }
}
