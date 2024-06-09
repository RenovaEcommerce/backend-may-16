import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class VariantDto {
  @IsString()
  @IsNotEmpty()
  color_name: string;

  @IsString()
  @IsNotEmpty()
  image_url: string;
}

export class CreateHardwoodDto {
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
  species: string;

  @IsString()
  @IsNotEmpty()
  construction: string;

  @IsString()
  @IsNotEmpty()
  plank_width: string;

  @IsString()
  @IsNotEmpty()
  plank_length: string;

  @IsString()
  @IsNotEmpty()
  nominal_plank_thickness: string;

  @IsString()
  @IsNotEmpty()
  finish: string;

  @IsString()
  @IsNotEmpty()
  sq_ft_per_box: string;

  @IsString()
  @IsNotEmpty()
  edge_profile: string;

  @IsString()
  @IsNotEmpty()
  surface_texture: string;

  @IsString()
  @IsNotEmpty()
  installation_method: string;

  @IsString()
  @IsNotEmpty()
  installation_grade: string;

  @IsBoolean()
  @IsNotEmpty()
  radiant_heat: string;

  @IsInt()
  @IsNotEmpty()
  color_variation: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  images: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  variants: VariantDto[];
}
