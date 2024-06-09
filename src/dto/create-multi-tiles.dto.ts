import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTileDto } from './create-tile-.dto';

export class CreateTilesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTileDto)
  tiles: CreateTileDto[];
}
