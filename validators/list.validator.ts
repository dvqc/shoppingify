import { ListCreateBody, ListItem, ListUpdateBody } from "types/prisma.types";
import {
  IsNotEmpty,
  IsAlphanumeric,
  IsMongoId,
  MinLength,
  MaxLength,
  ValidateNested,
  IsNumber,
  IsString
} from "class-validator";
import { Type } from "class-transformer";

class listItemDTO implements ListItem {
  @IsNotEmpty()
  @IsMongoId()
  itemId!: string;

  @IsNotEmpty()
  @IsNumber()
  qty!: number;
}

export class CreateListDTO implements ListCreateBody {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name!: string;

  @Type(() => listItemDTO)
  @ValidateNested()
  @IsNotEmpty()
  listItems!: listItemDTO[];
}

export class UpdateListDTO implements ListUpdateBody {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name!: string;
}
