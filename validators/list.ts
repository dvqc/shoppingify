import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { ListCreateBody, ListUpdateBody } from "types/prisma";
import { ListItemCreateDTO } from "./listItem";

type Status = "COMPLETED" | "CANCELED" | "ACTIVE";

export class CreateListDTO implements ListCreateBody {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name!: string;

  @Type(() => ListItemCreateDTO)
  @ValidateNested()
  @IsNotEmpty()
  listItems!: ListItemCreateDTO[];
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
