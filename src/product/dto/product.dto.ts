import { IsNumber, IsString } from "class-validator";

export class ProductDto{
    @IsString()
    name: string

    @IsString()
    description: string

    @IsNumber()
    price: number

    @IsNumber()
    categoryId: number
}