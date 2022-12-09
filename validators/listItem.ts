import { IsMongoId, IsNotEmpty, IsNumber } from "class-validator";
import { ListItemBody, ListItemUpdateBody } from "types/prisma";

export class ListItemUpdateDTO implements ListItemUpdateBody {
  @IsNotEmpty()
  @IsNumber()
  qty!: number;
}

export class ListItemCreateDTO implements ListItemBody {
  @IsNotEmpty()
  @IsMongoId()
  itemId!: string;

  @IsNotEmpty()
  @IsNumber()
  qty!: number;
}
