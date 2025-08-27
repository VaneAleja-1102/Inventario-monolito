import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class StockAdjustDto {
  @IsInt() @IsPositive() quantity!: number;
  @IsString() @IsNotEmpty() productId!: string; // lo convertiremos a number
  note?: string;
}
