import { Cabinet } from "src/schemas/cabinet.schema";
import { Carpet } from "src/schemas/carpet.schema";
import { Countertop } from "src/schemas/countertops.schema";
import { Tile } from "src/schemas/tile.schema";

export type AllProductsType = (Tile | Countertop | Cabinet | Carpet)[];
