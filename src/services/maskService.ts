import { Mask } from "../entities/Mask";
import { maskRepository } from "../repositories/maskRepository";
import { QueryCondition } from "../types/queryCondition";
import { BasicMethod } from "../utils/basicMethod";
import logger from "../utils/logger";
import { paginateAndSortAndFilter, PaginatedResponseInterface, PaginationQueryInterface } from "../utils/pagination";

export class MaskService extends BasicMethod {
  static entity = "mask";

  static buildCondition(query: any): QueryCondition {
    let { condition, querySQL } = super.buildCondition(query);

    const { keyword } = query;
    // Initialization can only find active data 
    querySQL += ` AND ${this.entity}.isActive = true`;

    if (keyword) {
      querySQL += `
        AND (
          mask.name ILIKE :keyword
          OR EXISTS (
            SELECT 1
            FROM pharmacy_mask pm
            INNER JOIN pharmacy p ON p.id = pm.pharmacy_id
            WHERE pm.mask_id = mask.id
              AND p.name ILIKE :keyword
          )
        )
      `;
      condition['keyword'] = `%${keyword}%`;
    }

    return { condition, querySQL };
  }

  static override buildTransformedFilters(query: any): Record<string, string | number | object> {
    const { querySQL, condition } = MaskService.buildCondition(query);

    const transformedFilters: Record<string, string | number | object> = {
      [querySQL]: condition,
    };

    return transformedFilters;
  }

  static async getList(paginationQuery: PaginationQueryInterface): Promise<PaginatedResponseInterface<Mask>> {
    logger.debug({ msg: 'In MaskService.getList', paginationQuery });

    const maskQueryBuilderRepository = maskRepository.createQueryBuilder('mask');

    const query = await maskQueryBuilderRepository

    const paginatedResult = await paginateAndSortAndFilter<Mask>(query, paginationQuery);

    return paginatedResult;
  }
}