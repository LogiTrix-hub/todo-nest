import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  checked: boolean;

  @IsUUID()
  id: string;
}
