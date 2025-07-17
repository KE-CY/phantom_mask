import { Repository } from 'typeorm';
import { AppDataSource } from '../config/typeorm-config';
import { PharmacyMask } from '../entities/PharmacyMask';

export class PharmacyMaskRepository extends Repository<PharmacyMask> {
  constructor() {
    super(PharmacyMask, AppDataSource.manager);
  }

  static async getMasksByPharmacyId(pharmacyId: number, sortBy: string = 'price', sortOrder: 'ASC' | 'DESC' = 'ASC') {
    const pharmacyMaskQueryBuilderRepository = pharmacyMaskRepository.createQueryBuilder('pharmacyMask');

    const query = pharmacyMaskQueryBuilderRepository
      .leftJoinAndSelect('pharmacyMask.mask', 'mask')
      .where('pharmacyMask.pharmacy_id = :pharmacyId', { pharmacyId })
      .select([
        'mask.id AS id',
        'mask.name AS name',
        'pharmacyMask.price AS price',
      ])
      .orderBy(sortBy === 'price' ? 'pharmacyMask.price' : 'mask.name', sortOrder);

    const result = await query.getRawMany();

    return result;

  }
}

export const pharmacyMaskRepository =
  AppDataSource.getRepository(PharmacyMask).extend(PharmacyMaskRepository);