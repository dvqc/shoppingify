import { ListBody, ListItem } from "types/prisma.types";
import {
  IsNotEmpty,
  IsAlphanumeric,
  IsMongoId,
  MinLength,
  MaxLength,
  ValidateNested,
  IsNumber
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

export class CreateListDTO implements ListBody {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  @MaxLength(50)
  name!: string;

  @Type(() => listItemDTO)
  @ValidateNested()
  @IsNotEmpty()
  listItems!: listItemDTO[];
}
