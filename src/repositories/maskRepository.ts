import { Repository } from 'typeorm';
import { AppDataSource } from '../config/typeorm-config';
import { Mask } from '../entities/Mask';

export class MaskRepository extends Repository<Mask> {
  constructor() {
    super(Mask, AppDataSource.manager);
  }
}

export const maskRepository =
  AppDataSource.getRepository(Mask).extend(MaskRepository);