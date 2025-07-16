import { Pharmacy } from "../entities/Pharmacy";
import { pharmacyRepository } from "../repositories/pharmacyRepository";
import { QueryCondition } from "../types/queryCondition";
import { BasicMethod } from "../utils/basicMethod";
import logger from "../utils/logger";
import { paginateAndSortAndFilter, PaginatedResponseInterface, PaginationQueryInterface } from "../utils/pagination";

export class PharmacyService extends BasicMethod {
  static entity = "pharmacy";

  static buildCondition(query: any): QueryCondition {
    let { condition, querySQL } = super.buildCondition(query);

    const { id, dayOfWeek, time } = query;

    // Initialization can only find active data 
    querySQL += ` AND ${this.entity}.isActive = true`;

    if (id) {
      querySQL += ` AND ${this.entity}.id = :id`;
      condition['id'] = id;
    }

    if (dayOfWeek && time) {
      const prevDayOfWeek = (Number(dayOfWeek) + 6) % 7;
      querySQL += `
      AND EXISTS (
        SELECT 1 FROM pharmacy_opening_hour poh
        WHERE poh.pharmacy_id = ${this.entity}.id
          AND (
            (poh.day_of_week = :dayOfWeek AND poh.is_overnight = false AND poh.open_time <= :time AND poh.close_time > :time)

            OR (poh.day_of_week = :dayOfWeek AND poh.is_overnight = true AND poh.open_time <= :time)

            OR (poh.day_of_week = :prevDayOfWeek AND poh.is_overnight = true AND poh.close_time > :time)
          )
      )`;

      condition['dayOfWeek'] = Number(dayOfWeek);
      condition['prevDayOfWeek'] = prevDayOfWeek;
      condition['time'] = time;
    }

    return { condition, querySQL };
  }

  static override buildTransformedFilters(query: any): Record<string, string | number | object> {
    const { querySQL, condition } = PharmacyService.buildCondition(query);

    const transformedFilters: Record<string, string | number | object> = {
      [querySQL]: condition,
    };

    return transformedFilters;
  }

  static async getList(paginationQuery: PaginationQueryInterface): Promise<PaginatedResponseInterface<Pharmacy>> {
    logger.debug({ msg: 'In PharmacyService.getList', paginationQuery });

    const pharmacyQueryBuilderRepository = pharmacyRepository.createQueryBuilder('pharmacy');

    const query = await pharmacyQueryBuilderRepository

    const paginatedResult = await paginateAndSortAndFilter<Pharmacy>(query, paginationQuery);

    return paginatedResult;
  }
}