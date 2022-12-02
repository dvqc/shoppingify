import { Type } from "class-transformer";
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested
} from "class-validator";
import { ListCreateBody, ListItemBody, ListUpdateBody } from "types/prisma.types";

type Status = "COMPLETED" | "CANCELED" | "ACTIVE";

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
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name!: string;

  @IsOptional()
  @IsEnum(["COMPLETED", "CANCELED"])
  status!: Status;
}
