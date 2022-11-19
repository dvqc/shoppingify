import { ItemBody } from "types/prisma.types";
import {
  IsNotEmpty,
  IsAlphanumeric,
  IsUrl,
  IsMongoId,
  MinLength,
  MaxLength,
  IsOptional
} from "class-validator";

export class CreateItemDTO implements ItemBody {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  @MaxLength(50)
  name!: string;

  @IsOptional()
  @IsAlphanumeric()
  @MaxLength(300)
  note!: string | null;

  @IsOptional()
  @IsUrl()
  image!: string | null;

  @IsNotEmpty()
  @IsMongoId()
  categoryId!: string;
}
