import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ValidationZodPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}
  transform(value: any) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (err) {
      throw new BadRequestException('Validation Failed');
    }
  }
}
