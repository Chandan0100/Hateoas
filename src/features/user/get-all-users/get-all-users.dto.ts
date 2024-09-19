import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class GetUsersQuery {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    page: number;
  
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    limit: number;

    @IsOptional()
    userId: string;
}