import { IsNotEmpty, IsNumber } from "class-validator";
import { ListItemUpdateBody } from "types/prisma.types";

export class listItemUpdateDTO implements ListItemUpdateBody {
  @IsNotEmpty()
  @IsNumber()
  qty!: number;
}

