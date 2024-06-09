import { IsString, IsBoolean, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class VariantDto {
  @IsString()
  @IsNotEmpty()
  color_name: string;

  @IsString()
  @IsNotEmpty()
  image_url: string;
}

export class CreateVinylDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  style: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  collection: string;

  @IsString()
  @IsNotEmpty()
  finish: string;

  @IsString()
  @IsNotEmpty()
  construction: string;

  @IsString()
  @IsNotEmpty()
  width: string;

  @IsString()
  @IsNotEmpty()
  length: string;

  @IsString()
  @IsNotEmpty()
  plank_thickness: string;

  @IsString()
  @IsNotEmpty()
  Sq_Ft_per_box: string;

  @IsString()
  @IsNotEmpty()
  installation_method: string;

  @IsString()
  @IsNotEmpty()
  installation_grade: string;

  @IsBoolean()
  @IsNotEmpty()
  wear_layer: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  images: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  variants: VariantDto[];
}