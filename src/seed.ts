import fs from 'fs';
import path from 'path';
import { AppDataSource } from './config/typeorm-config';
import { Mask } from './entities/Mask';
import { Pharmacy } from './entities/Pharmacy';
import { PharmacyMask } from './entities/PharmacyMask';
import { PharmacyOpeningHour } from './entities/PharmacyOpeningHour';
import { PurchaseHistory } from './entities/PurchaseHistory';
import { User } from './entities/User';
import logger from './utils/logger';

const pharmacies = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/pharmacies.json'), 'utf-8'));
const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'utf-8'));

export const seed = async () => {
  logger.info({ msg: 'Seeding start' });
  await AppDataSource.initialize();

  await AppDataSource.transaction(async (manager) => {
    const pharmacyRepo = manager.getRepository(Pharmacy);
    const maskRepo = manager.getRepository(Mask);
    const pharmacyMaskRepo = manager.getRepository(PharmacyMask);
    const openingHourRepo = manager.getRepository(PharmacyOpeningHour);
    const userRepo = manager.getRepository(User);
    const purchaseRepo = manager.getRepository(PurchaseHistory);

    // Check if the data has been added
    const existingCount = await userRepo.count();
    if (existingCount > 0) {
      logger.info({ msg: 'Data already exist in the database. Skipping seeding.' });
      return;
    }

    const maskMap = new Map<string, Mask>();
    const pharmacyMap = new Map<string, Pharmacy>();
    logger.debug({ msg: 'Prepare to process pharmacies.json data', pharmacySize: pharmacies.length });

    for (const pharmacy of pharmacies) {
      const { name, cashBalance, openingHours, masks } = pharmacy;

      // Create Pharmacy
      const createdPharmacy = await pharmacyRepo.save(pharmacyRepo.create({
        name,
        cashBalance
      }));
      pharmacyMap.set(name, createdPharmacy);

      // Create Pharmacy Opening Hours
      const parsedHours = parseOpeningHours(openingHours);
      const pharmacyOpeningHours = parsedHours.map(obj => ({
        ...obj,
        pharmacy: createdPharmacy,
      }));
      await openingHourRepo.save(openingHourRepo.create(pharmacyOpeningHours));

      // Create Mask And PharmacyMask
      for (const mask of masks) {
        const { name: maskName, price } = mask;
        let existMask = maskMap.get(maskName);

        let currentMask;
        if (!existMask) {
          currentMask = await maskRepo.save(maskRepo.create({ name: maskName }));
          maskMap.set(maskName, currentMask);
        } else {
          currentMask = existMask;
        }

        await pharmacyMaskRepo.save(pharmacyMaskRepo.create({
          pharmacy: createdPharmacy,
          mask: currentMask,
          price,
        }));
      }
    }

    logger.debug({ msg: 'Process pharmacies.json data done' });

    logger.debug({ msg: 'Prepare to process users.json data', userSize: users.length });
    for (const user of users) {
      const { name, cashBalance, purchaseHistories } = user;

      // Create User
      const createdUser = await userRepo.save(userRepo.create({
        name,
        cashBalance
      }));

      for (const purchaseHistory of purchaseHistories) {
        const { pharmacyName, maskName, transactionAmount, transactionDate } = purchaseHistory;
        const pharmacy = pharmacyMap.get(pharmacyName);
        const mask = maskMap.get(maskName);
        if (!pharmacy || !mask) {
          logger.warn({ msg: 'Not found pharmacy or mask.' });
          continue;
        }

        // Create PurchaseHistory
        await purchaseRepo.insert(purchaseRepo.create({
          user: createdUser,
          pharmacy,
          mask,
          transactionAmount,
          transactionDate: new Date(transactionDate),
        }));
      }
    }
    logger.debug({ msg: 'Process users.json data done' });
  });

  logger.info({ msg: 'Seeding completed' });
  process.exit(0);
};


const dayMap: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thur: 4,
  Fri: 5,
  Sat: 6,
};

function parseOpeningHours(input: string): {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isOvernight: boolean;
}[] {
  const result: any[] = [];

  const parts = input.split('/').map(p => p.trim());

  for (const part of parts) {
    const match = part.match(/^(.+?)\s+(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})$/);
    if (!match) continue;

    const daysStr = match[1].trim();
    const openTime = match[2];
    const closeTime = match[3];

    const openHour = parseInt(openTime.split(':')[0], 10);
    const closeHour = parseInt(closeTime.split(':')[0], 10);
    const isOvernight = closeHour < openHour;

    const dayTokens = daysStr.split(',');
    for (let token of dayTokens) {
      token = token.trim();

      // 處理範圍: e.g. Mon - Fri
      if (token.includes('-')) {
        const [startDay, endDay] = token.split('-').map(d => d.trim());
        const start = dayMap[startDay];
        const end = dayMap[endDay];

        for (let i = start; i !== (end + 1) % 7; i = (i + 1) % 7) {
          result.push({ dayOfWeek: i, openTime, closeTime, isOvernight });
          if (i === end) break;
        }
      } else {
        const day = dayMap[token];
        if (day !== undefined) {
          result.push({ dayOfWeek: day, openTime, closeTime, isOvernight });
        }
      }
    }
  }

  return result;
}

seed();