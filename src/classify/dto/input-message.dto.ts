import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class InputMessageDto {
  @IsString()
  @Length(1, 250)
  message: string;

  @IsUUID()
  @Length(1, 250)
  clientId: string;

  @IsUUID()
  @Length(1, 250)
  receiverId: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsNumber()
  timestamp: number;
}
