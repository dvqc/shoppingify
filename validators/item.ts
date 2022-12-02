import { CategoryCreateBody, ItemCreateBody } from "types/prisma.types";
import {
  IsNotEmpty,
  IsUrl,
  MinLength,
  MaxLength,
  IsOptional,
  ValidateNested,
  IsString
} from "class-validator";
import { Type } from "class-transformer";
class CategoryDTO implements CategoryCreateBody {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  label!: string;
}

export class CreateItemDTO implements ItemCreateBody {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  note!: string | null;

  @IsOptional()
  @IsUrl()
  image!: string | null;

  @Type(() => CategoryDTO)
  @ValidateNested()
  @IsNotEmpty()
  category!: CategoryDTO;
}
