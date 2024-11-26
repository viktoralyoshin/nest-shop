import { IsPhoneNumber, IsString, MinLength } from "class-validator";

export class AuthDto {
    @IsPhoneNumber()
    phone: string

    @MinLength(6, {
        message: "Пароль должен быть длиннее 6 символов"
    })
    @IsString()
    password: string
}