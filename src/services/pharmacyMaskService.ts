import { PharmacyMaskRepository } from "../repositories/pharmacyMaskRepository";
import { QueryCondition } from "../types/queryCondition";
import { BasicMethod } from "../utils/basicMethod";
import logger from "../utils/logger";

export class PharmacyMaskService extends BasicMethod {
  static entity = "pharmacyMask";

  static buildCondition(query: any): QueryCondition {
    let { condition, querySQL } = super.buildCondition(query);

    const { id, pharmacyId } = query;

    if (id) {
      querySQL += ` AND ${this.entity}.id = :id`;
      condition['id'] = id;
    }

    if (pharmacyId) {
      querySQL += ` AND ${this.entity}.pharmacy_id = :pharmacyId`;
      condition['pharmacyId'] = pharmacyId;
    }

    return { condition, querySQL };
  }

  static override buildTransformedFilters(query: any): Record<string, string | number | object> {
    const { querySQL, condition } = PharmacyMaskService.buildCondition(query);

    const transformedFilters: Record<string, string | number | object> = {
      [querySQL]: condition,
    };

    return transformedFilters;
  }

  static async getMasksByPharmacyId(pharmacyId: number, sortBy: string = 'price', sortOrder: 'ASC' | 'DESC' = 'ASC') {
    logger.info({ msg: 'In PharmacyMaskService.getMasksByPharmacyId', pharmacyId, sortBy, sortOrder });

    const result = await PharmacyMaskRepository.getMasksByPharmacyId(pharmacyId, sortBy, sortOrder);

    return result;
  }
}