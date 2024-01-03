import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('Validation Pipe: ', value, metadata);
    // if (value.name.length > 20) {
    //   throw new BadRequestException('Name should be less than 20 characters');
    // }
    // if (value.age < 18) {
    //   throw new BadRequestException('You should be 18 years old or more');
    // }
    return value;
  }
}
