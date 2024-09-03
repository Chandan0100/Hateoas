import { IsNotEmpty } from "class-validator";

export class GetUserCommand {

    @IsNotEmpty()
    uuid : string

}