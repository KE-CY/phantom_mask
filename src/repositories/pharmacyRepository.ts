import { AppDataSource } from '../config/typeorm-config';
import { Pharmacy } from '../entities/Pharmacy';
import { Repository } from 'typeorm';

export class PharmacyRepository extends Repository<Pharmacy> {
  constructor() {
    super(Pharmacy, AppDataSource.manager);
  }
}

export const pharmacyRepository =
  AppDataSource.getRepository(Pharmacy).extend(PharmacyRepository);