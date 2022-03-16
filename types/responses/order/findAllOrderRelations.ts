import type { IOrderRelations } from "@models/pedido";
import type { PaginatedResponse } from "@my-types/backend/pagination";

export type FindAllOrderRelationsResponse = PaginatedResponse<IOrderRelations>;
