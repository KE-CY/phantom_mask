import { Repository } from 'typeorm';
import { AppDataSource } from '../config/typeorm-config';
import { PurchaseHistory } from '../entities/PurchaseHistory';
import { QueryCondition } from '../types/queryCondition';

export class PurchaseHistoryRepository extends Repository<PurchaseHistory> {
  constructor() {
    super(PurchaseHistory, AppDataSource.manager);
  }

  static getTopBuyers({ querySQL, condition }: QueryCondition, limit: number) {
    const buyers = purchaseHistoryRepository
      .createQueryBuilder('purchaseHistory')
      .select('purchaseHistory.user_id', 'id')
      .addSelect('SUM(purchaseHistory.transaction_amount)', 'totalAmount')
      .innerJoin('purchaseHistory.user', 'user')
      .addSelect('user.name', 'name')
      .where(`1=1 ${querySQL}`, condition)
      .groupBy('purchaseHistory.user_id, user.name')
      .orderBy('SUM(purchaseHistory.transaction_amount)', 'DESC')
      .limit(limit)
      .getRawMany();

    return buyers;
  }

  static async getTransactionSummary({ querySQL, condition }: QueryCondition) {
    const summary = purchaseHistoryRepository.createQueryBuilder('purchaseHistory')
      .select('COUNT(purchaseHistory.mask_id)', 'maskCount')
      .addSelect('SUM(purchaseHistory.transaction_amount)', 'totalAmount')
      .where(`1=1 ${querySQL}`, condition)
      .getRawOne();

    return summary;
  }
}

export const purchaseHistoryRepository =
  AppDataSource.getRepository(PurchaseHistory).extend(PurchaseHistoryRepository);