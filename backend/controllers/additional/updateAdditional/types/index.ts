import type IAdicional from "@models/adicional";

export type UpdateAdditionalArg = Partial<Omit<IAdicional, "id_adicionals">> &
  Pick<IAdicional, "id_adicional">;
