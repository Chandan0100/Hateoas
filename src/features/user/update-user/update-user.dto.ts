import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateParamCommand {
  @IsNotEmpty()
  uuid: string;
}

export class UpdatePayloadCommand {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsString()
  @IsOptional()
  email: string;
}
