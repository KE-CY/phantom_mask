import { AppDataSource } from "../config/typeorm-config";
import { PharmacyMask } from "../entities/PharmacyMask";
import { PurchaseHistory } from "../entities/PurchaseHistory";
import { User } from "../entities/User";
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


  static async processPurchase({ userId, items }: {
    userId: number;
    items: { pharmacyId: number; maskId: number; quantity: number }[];
  }) {
    return await AppDataSource.transaction(async manager => {
      const user = await manager.findOne(User, { where: { id: userId } });
      if (!user) throw new Error('User not found');

      const records: PurchaseHistory[] = [];

      for (const item of items) {
        const { pharmacyId, maskId, quantity } = item;

        const pm = await manager
          .getRepository(PharmacyMask)
          .createQueryBuilder('pm')
          .where('pm.pharmacy_id = :pharmacyId AND pm.mask_id = :maskId', { pharmacyId, maskId })
          .getOne();

        if (!pm) throw new Error(`Pharmacy ${pharmacyId} does not sell mask ${maskId}`);

        const totalAmount = Number(pm.price) * quantity;

        const record = manager.create(PurchaseHistory, {
          user: { id: userId },
          pharmacy: { id: pharmacyId },
          mask: { id: maskId },
          transactionAmount: totalAmount,
          transactionDate: new Date()
        });

        records.push(record);
      }

      await manager.insert(PurchaseHistory, records);
      return { success: true, totalRecords: records.length };
    });
  }

}