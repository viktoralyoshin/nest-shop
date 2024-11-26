import { IsPhoneNumber, IsString, MinLength } from "class-validator";

export class AuthDto {
    @IsPhoneNumber()
    phoneNumber: string

    @MinLength(6, {
        message: "Password must be at least 6 characters"
    })
    @IsString()
    password: string
}