import { AppDataSource } from '../config/typeorm-config';
import { PurchaseHistory } from '../entities/PurchaseHistory';
import { Repository } from 'typeorm';

export class PurchaseHistoryRepository extends Repository<PurchaseHistory> {
  constructor() {
    super(PurchaseHistory, AppDataSource.manager);
  }
}

export const purchaseHistoryRepository =
  AppDataSource.getRepository(PurchaseHistory).extend(PurchaseHistoryRepository);