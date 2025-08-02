import { IsNotEmpty,IsNumber,IsString, Min,IsOptional } from "class-validator";

export class CreateProductRequest{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    description:string;

    @IsNumber()
    @Min(1)
    price:number;

    @IsNumber()
    stock:number;
}

export class UpdateProductRequest{
 
    name?:string;

    description?:string;
    
    @IsOptional()
    @Min(0)
    price?:number;

    @IsNumber()
    @Min(0)
    stock?:number;
}

