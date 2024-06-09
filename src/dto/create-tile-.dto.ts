import { IsString, IsArray, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

export class CreateTileDto {
  @IsString()
  meta_description: string;

  @IsString()
  meta_title: string;

  @IsString()
  category: string;

  @IsString()
  url: string;

  @IsString()
  model: string;

  @IsString()
  name: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  stock: number;

  @IsString()
  description: string;

  @IsString()
  details: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  images: string[];

  @IsArray()
  @ArrayNotEmpty()
  variants: { color_name: string; image_url: string }[];
}
