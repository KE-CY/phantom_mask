import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { PharmacyMask } from "./PharmacyMask";
import { PharmacyOpeningHour } from "./PharmacyOpeningHour";
import { PurchaseHistory } from "./PurchaseHistory";

@Entity()
export class Pharmacy {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column('numeric', { precision: 10, scale: 2, name: 'cash_balance' })
  cashBalance?: number;

  @OneToMany(() => PharmacyMask, pm => pm.pharmacy)
  pharmacyMasks!: PharmacyMask[];

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date;

  // Ref
  @OneToMany(() => PurchaseHistory, ph => ph.pharmacy)
  purchaseHistories?: PurchaseHistory[];

  @OneToMany(() => PharmacyOpeningHour, poh => poh.pharmacy)
  pharmacyOpeningHours?: PharmacyOpeningHour[]
}