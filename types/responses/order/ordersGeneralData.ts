import type { IOrderGeneralData } from "@models/pedido";
import type { PaginatedResponse } from "@my-types/backend/pagination";

export type OrdersGeneralDataResponse = PaginatedResponse<IOrderGeneralData>;
