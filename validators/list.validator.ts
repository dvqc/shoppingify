import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { ListCreateBody, ListItemBody, ListUpdateBody } from "types/prisma.types";

class listItemDTO implements ListItemBody {
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
