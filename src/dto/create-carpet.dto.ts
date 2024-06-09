import { IsBoolean, IsNotEmpty, IsString, IsArray, ValidateNested, ArrayMinSize, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class ImageVariant {
  @IsString()
  @IsNotEmpty()
  color_name: string;

  @IsString()
  @IsNotEmpty()
  image_url: string;
}

export class CreateCarpetDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category: string = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  url: string = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  style: string = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  color: string = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  collection: string = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fiber: string = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fiber_brand: string = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  width: string = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  style_type: string = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  face_weight: string = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  stain_treatment: string = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  backing: string = null;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  usa: boolean = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  country_of_origin: string = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string = null;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsOptional()
  images: string[] = null;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ImageVariant)
  @IsOptional()
  variants: ImageVariant[] = null;
}
