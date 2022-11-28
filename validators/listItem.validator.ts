import { IsNotEmpty, IsNumber } from "class-validator";
import { ListItemUpdateBody } from "types/prisma.types";

class listItemUpdateDTO implements ListItemUpdateBody {
  @IsNotEmpty()
  @IsNumber()
  qty!: number;
}

export default listItemUpdateDTO