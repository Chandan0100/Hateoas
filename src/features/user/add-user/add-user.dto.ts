import { IsNotEmpty, IsString } from "class-validator";

export class AddUserCommand {
    @IsNotEmpty()
    @IsString()
    name : string

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string

    @IsNotEmpty()
    @IsString()
    email: string
}