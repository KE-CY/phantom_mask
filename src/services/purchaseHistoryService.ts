import { PurchaseHistoryRepository } from "../repositories/purchaseHistoryRepository";
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

    const buyers = await PurchaseHistoryRepository.getTopBuyers({ querySQL, condition }, limit);

    return buyers;
  }

  static async getTransactionSummary(query: any) {
    const { querySQL, condition } = PurchaseHistoryService.buildCondition(query);

    const transactionSummary = await PurchaseHistoryRepository.getTransactionSummary({ querySQL, condition });

    return transactionSummary;
  }
}