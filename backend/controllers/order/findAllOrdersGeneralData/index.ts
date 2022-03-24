import { Prisma } from "@backend";
import { throwError } from "@errors/index";
import { PaginationHelper } from "@helpers/pagination";
import { createDate } from "@utils/transformation/date";

import { FindDateFilter } from "./constants";
import { FindAllOrderGeneralDataParser } from "./parser";
import { FindAllOrderGeneralDataValidator } from "./validator";

import type { IOrderGeneralData } from "@models/pedido";
import type { PaginatedSearchArg } from "@helpers/pagination/types";
import type { PaginatedResponse } from "@my-types/backend/pagination";

import type { FiltersData, RawFiltersData } from "./types/filter";

export class FindAllOrderGeneralData {
  private paginationHelper: PaginationHelper;
  private filtersData: FiltersData;
  private validator: FindAllOrderGeneralDataValidator;

  constructor(rawFiltersData: RawFiltersData, paginationData: PaginatedSearchArg) {
    const parser = new FindAllOrderGeneralDataParser(rawFiltersData);

    this.filtersData = parser.parse();
    this.validator = new FindAllOrderGeneralDataValidator(this.filtersData);
    this.paginationHelper = new PaginationHelper(paginationData);
  }

  public async exec() {
    this.validator.validate();

    const ordersGeneralData = await this.findAll();
    const countOrdersGeneralData = await this.countFindAll();

    return {
      count: countOrdersGeneralData,
      items: ordersGeneralData,
    } as PaginatedResponse<IOrderGeneralData>;
  }

  private async countFindAll() {
    const orderFilterDate = this.getOrderFilterDate();

    const count = await Prisma.pedido
      .count({
        where: {
          status_pedido: this.filtersData.status_pedido,
          data_pedido: {
            gt: orderFilterDate,
          },
        },
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

    return count;
  }

  private async findAll() {
    const { itemsAmount, skip } = this.paginationHelper.getPaginationData();

    const orderFilterDate = this.getOrderFilterDate();

    const hasLesserThan =
      this.filtersData.filtro_data_pedido === FindDateFilter.DATE && orderFilterDate;

    const dateLesserThan = hasLesserThan
      ? new Date(orderFilterDate.getTime() + this.calculateDateInMilliseconds(1))
      : undefined;

    const ordersGeneralData = await Prisma.pedido
      .findMany({
        include: {
          endereco: true,
          usuario: {
            select: {
              id_usuario: true,
              nome: true,
              telefone: true,
            },
          },
        },
        take: itemsAmount,
        where: {
          status_pedido: this.filtersData.status_pedido,
          data_pedido: {
            gt: orderFilterDate,
            lt: dateLesserThan,
          },
        },
        orderBy: {
          id_pedido: "desc",
        },
        skip: skip,
      })
      .catch((err) => {
        console.error(err);
        throwError("O-C-DI", { customMessage: "Algo de inesperado aconteceu" });
      });

    return ordersGeneralData as IOrderGeneralData[];
  }

  private getOrderFilterDate() {
    switch (this.filtersData.filtro_data_pedido) {
      case FindDateFilter.TODAY: {
        const [day, month, year] = this.getDateComponents(new Date());
        return this.createFilterDate(day, month, year);
      }

      case FindDateFilter.LAST_7_DAYS: {
        const [day, month, year] = this.getDateComponents(new Date());
        const todaysDateTimestamp = this.createFilterDate(day, month, year).getTime();
        const sevenDaysInMilliseconds = this.calculateDateInMilliseconds(7);

        return new Date(todaysDateTimestamp - sevenDaysInMilliseconds);
      }

      case FindDateFilter.LAST_30_DAYS: {
        const [day, month, year] = this.getDateComponents(new Date());
        const todaysDateTimestamp = this.createFilterDate(day, month, year).getTime();
        const thirtyDaysInMilliseconds = this.calculateDateInMilliseconds(30);

        return new Date(todaysDateTimestamp - thirtyDaysInMilliseconds);
      }

      case FindDateFilter.DATE: {
        if (!this.filtersData.data_pedido) return undefined;

        const [day, month, year] = this.getDateComponents(createDate(this.filtersData.data_pedido));

        return this.createFilterDate(day, month, year);
      }

      case FindDateFilter.NONE: {
        return undefined;
      }

      default: {
        return this.filtersData.filtro_data_pedido;
      }
    }
  }

  private calculateDateInMilliseconds(daysAmount: number) {
    return 24 * 60 * 60 * 1000 * daysAmount;
  }

  private getDateComponents(date: Date) {
    return [date.getDate(), date.getMonth(), date.getFullYear()];
  }

  private createFilterDate(day: number, month: number, year: number) {
    return new Date(year, month, day, 0, 0, 0, 0);
  }
}
