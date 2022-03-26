import type ICategoria from "@models/categoria";
import type { PaginatedResponse } from "@my-types/backend/pagination";

export type FindAllCategoriesResponse = PaginatedResponse<ICategoria>;
