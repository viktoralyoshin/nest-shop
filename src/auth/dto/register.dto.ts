import { IsPhoneNumber, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsPhoneNumber()
    phoneNumber: string

    @MinLength(6, {
        message: "Password must be at least 6 characters"
    })
    @IsString()
    password: string

    @IsString()
    firstName: string

    @IsString()
    lastName: string
}