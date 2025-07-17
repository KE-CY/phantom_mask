import { purchaseHistoryRepository } from "../repositories/purchaseHistoryRepository";
import { QueryCondition } from "../types/queryCondition";
import { BasicMethod } from "../utils/basicMethod";

export class PurchaseHistoryService extends BasicMethod {
  static entity = "purchaseHistory";

  static buildCondition(query: any): QueryCondition {
    let { condition, querySQL } = super.buildCondition(query);

    const { id, pharmacyId, transactionStartDate, transactionEndDate } = query;

    if (id) {
      querySQL += ` AND ${this.entity}.id = :id`;
      condition['id'] = id;
    }

    if (pharmacyId) {
      querySQL += ` AND ${this.entity}.pharmacy_id = :pharmacyId`;
      condition['pharmacyId'] = pharmacyId;
    }

    if (transactionStartDate && transactionEndDate) {
      querySQL += ` AND ${this.entity}.transaction_date BETWEEN :transactionStartDate AND :transactionEndDate`;
      condition['transactionStartDate'] = transactionStartDate;
      condition['transactionEndDate'] = transactionEndDate;
    }

    return { condition, querySQL };
  }

  static async getTopBuyers(query: any) {
    const { querySQL, condition } = PurchaseHistoryService.buildCondition(query);
    const limit = parseInt(query.limit) || 10;

    const qb = purchaseHistoryRepository
      .createQueryBuilder('purchaseHistory')
      .select('purchaseHistory.user_id', 'id')
      .addSelect('SUM(purchaseHistory.transaction_amount)', 'totalAmount')
      .innerJoin('purchaseHistory.user', 'user')
      .addSelect('user.name', 'name')
      .where(`1=1 ${querySQL}`, condition)
      .groupBy('purchaseHistory.user_id, user.name')
      .orderBy('SUM(purchaseHistory.transaction_amount)', 'DESC')
      .limit(limit);

    return qb.getRawMany();
  }
}