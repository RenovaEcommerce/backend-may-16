import { IsString, IsArray, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

export class ProductsLinksDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  carpets: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  hardwood: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  vinyl: string[];
}
