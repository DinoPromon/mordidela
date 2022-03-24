import type ISabor from "@models/sabor";

export type UpdateFlavorArg = Partial<Omit<ISabor, "id_sabor">> & Pick<ISabor, "id_sabor">;
