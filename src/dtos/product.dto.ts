import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsString() @IsNotEmpty() @Length(2, 120) name!: string;
  @IsString() @IsNotEmpty() @Length(2, 60) sku!: string;
  @IsNumber() @Min(0) price!: number;
  @IsOptional() @IsBoolean() active?: boolean;
  @IsOptional() @IsString() @Length(2, 255) description?: string; // <-- agregado
}


export class UpdateProductDto {
  @IsOptional() @IsString() @Length(2, 120) name?: string;
  @IsOptional() @IsString() @Length(2, 60) sku?: string;
  @IsOptional() @IsNumber() @Min(0) price?: number;
  @IsOptional() @IsBoolean() active?: boolean;
}
