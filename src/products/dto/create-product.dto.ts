import { IsNotEmpty, IsNumber, IsString, Length, Max, Min, IsOptional } from "class-validator"

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @Length(2, 20)
    name: string

    @IsString()
    @IsOptional()
    @Length(2, 100)
    description: string

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(10000)
    price: number

    @IsString()
    @IsOptional()
    @Length(2, 20)
    category: string
}
