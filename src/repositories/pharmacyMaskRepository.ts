import { Repository } from 'typeorm';
import { AppDataSource } from '../config/typeorm-config';
import { PharmacyMask } from '../entities/PharmacyMask';

export class PharmacyMaskRepository extends Repository<PharmacyMask> {
  constructor() {
    super(PharmacyMask, AppDataSource.manager);
  }
}

export const pharmacyMaskRepository =
  AppDataSource.getRepository(PharmacyMask).extend(PharmacyMaskRepository);